<template>
  <div>
    <div class="create-event container-grid">
      <div>Name of event:</div>
      <b-input placeholder="Enter name.." v-model="name" />

      <div>Type:</div>
      <b-form-select
        class="w-100"
        v-model="type.selected"
        :options="type.options"
      ></b-form-select>

      <div>Location:</div>
      <b-input placeholder="Enter location.." v-model="location" />

      <div>Online/Offline:</div>
      <b-form-select
        class="w-100"
        v-model="online.selected"
        :options="online.options"
      ></b-form-select>

      <div>Attendance limit:</div>
      <div class="w-100">
        <b-input
          placeholder="Enter limit.."
          v-model="attendanceLimit"
          :state="attendanceState"
        />
        <b-form-invalid-feedback> Enter a number. </b-form-invalid-feedback>
      </div>

      <div>Date:</div>
      <b-input type="date" v-model="date" :min="datePickerDate" />

      <div>Start time:</div>

      <div class="w-100">
        <b-input type="time" v-model="startTime" :state="startTimeState" />
        <b-form-invalid-feedback>
          Start time has to be before end time
        </b-form-invalid-feedback>
      </div>

      <div>End time:</div>
      <div class="w-100">
        <b-input type="time" v-model="endTime" :state="endTimeState" />
        <b-form-invalid-feedback>
          End time has to be after start time
        </b-form-invalid-feedback>
      </div>

      <div class="row-5">Description:</div>
      <b-form-textarea
        id="textarea"
        v-model="description"
        class="description-box"
        placeholder="Enter description.."
        rows="3"
        max-rows="6"
      ></b-form-textarea>

      <div class="row-6">Actions:</div>

      <b-input placeholder="Enter action.." v-model="actions.action1.value" />
      <b-form-select
        class="w-100"
        v-model="actions.action1.selected"
        :options="actions.options"
      ></b-form-select>

      <b-input
        placeholder="Enter action.."
        class="e-col-2"
        v-model="actions.action2.value"
      />
      <b-form-select
        class="w-100"
        v-model="actions.action2.selected"
        :options="actions.options"
      ></b-form-select>

      <b-input
        placeholder="Enter action.."
        class="e-col-2"
        v-model="actions.action3.value"
      />
      <b-form-select
        class="w-100"
        v-model="actions.action3.selected"
        :options="actions.options"
      ></b-form-select>

      <div class="row-9">Communities:</div>
      <b-form-group v-slot="{ ariaDescribedby }" class="communities row-9">
        <b-form-checkbox-group
          id="checkbox-communities"
          v-model="communities.selected"
          :options="communities.options"
          :aria-describedby="ariaDescribedby"
        ></b-form-checkbox-group>
      </b-form-group>
    </div>

    <div class="buttons-wrapper">
      <b-button
        v-if="!create"
        class="btn-danger"
        squared
        v-b-modal.modal-cancel-event
        >CANCEL</b-button
      >
      <b-button
        class="btn-primary"
        squared
        :disabled="buttonDisabled"
        @click="onPrimary()"
        >{{ btnText }}</b-button
      >
    </div>

    <!-- modals -->
    <b-modal
      id="modal-confirm-edit-event"
      title="Confirm Edit"
      hide-header-close
      @ok="editEvent(eventId)"
      ok-title="Confirm"
      cancel-variant="danger"
    >
      <b>Are you sure you want to save these changes?</b>
    </b-modal>

    <b-modal
      id="modal-cancel-event"
      hide-header-close
      title="Reason of cancellation"
      ok-title="Confirm"
      :ok-disabled="cancelConfirmButton"
      @ok="cancelEvent(eventId)"
      cancel-variant="danger"
    >
      <b-form-textarea
        id="cancel-input"
        v-model="cancellationReason"
        rows="3"
        required
      ></b-form-textarea>
    </b-modal>
  </div>
</template>

<script>
import { db } from '@/firebase'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore'
import moment from 'moment'

export default {
  name: 'EventAdmin',
  props: {
    btnText: String,
    create: Boolean,
    edit: Boolean
  },
  created () {
    this.getAllCommunities()
    this.eventId = this.$route.params.eventId
    if (this.edit) {
      this.getEvent(this.eventId)
    }
  },
  computed: {
    datePickerDate () {
      return moment().format('YYYY-MM-DD')
    },
    attendanceState () {
      if (this.attendanceLimit === '') return
      if (this.attendanceLimit[0] === '-') return false
      return !isNaN(this.attendanceLimit)
    },

    endTimeState () {
      if (this.endTime === '') return
      return this.endTime > this.startTime
    },

    startTimeState () {
      if (this.startTime === '') return
      return this.startTime < this.endTime
    },

    cancelConfirmButton () {
      return this.cancellationReason === ''
    },

    buttonDisabled () {
      if (
        this.name === '' ||
        this.location === '' ||
        this.startTime === '' ||
        this.endTime === '' ||
        this.attendanceLimit === '' ||
        this.description === ''
      ) {
        return true
      }
      if (
        this.online.selected === null ||
        this.type.selected === null ||
        this.communities.selected.length === 0
      ) {
        return true
      }
      if (!this.attendanceState || !this.endTimeState || !this.startTimeState) {
        return true
      }

      if (
        this.actions.action1.value !== '' &&
        this.actions.action1.selected === null
      ) {
        return true
      }

      if (
        this.actions.action2.value !== '' &&
        this.actions.action2.selected === null
      ) {
        return true
      }

      if (
        this.actions.action3.value !== '' &&
        this.actions.action3.selected === null
      ) {
        return true
      }

      return false
    }
  },

  data () {
    return {
      eventId: '',
      name: '',
      date: '',
      startTime: '',
      endTime: '',
      attendanceLimit: '',
      location: '',
      description: '',
      actions: {
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'radio', text: 'Radio' },
          { value: 'checkbox', text: 'Checkbox' }
        ],
        action1: { selected: null, value: '' },
        action2: { selected: null, value: '' },
        action3: { selected: null, value: '' }
      },
      online: {
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'Online', text: 'Online' },
          { value: 'Offline', text: 'Offline' },
          { value: 'Online/Offline', text: 'Online/Offline' }
        ],
        selected: null
      },
      communities: {
        options: [],
        selected: []
      },
      type: {
        options: [
          { value: null, text: 'Please select an option' },
          { text: 'Food', value: 'food' },
          { text: 'Webinar', value: 'webinar' },
          { text: 'Trips', value: 'trip' },
          { text: 'Games', value: 'game' }
        ],
        selected: null
      },
      cancellationReason: '',
      cancellationReasonState: null
    }
  },
  methods: {
    async createEvent () {
      const docRef = await addDoc(collection(db, 'events'), {
        eventName: this.name,
        date: new Date(this.date),
        description: this.description,
        deadlineRegistration: new Date(this.date),
        limitAttenders: this.attendanceLimit,
        location: this.location,
        startTime: this.startTime,
        endTime: this.endTime,
        participatingCommunities: this.communities.selected,
        eventCanceled: false,
        onlineOffline: this.online.selected,
        actions: [
          this.actions.action1,
          this.actions.action2,
          this.actions.action3
        ],
        participants: [],
        type: this.type.selected
      }).catch(
        this.$root.makeToast(
          'error-create-event',
          'danger',
          'Something went wrong!',
          'The event might not have been created. Please check and try again.',
          false,
          5000
        )
      )
      console.log(docRef)
      this.clearFields()

      this.$root.makeToast(
        'success-create-event',
        'success',
        'Success!',
        'The event is created',
        false,
        5000
      )
    },

    async getAllCommunities () {
      const querySnapshot = await getDocs(collection(db, 'communities')).catch(
        this.$root.makeToast(
          'error-get-communities',
          'danger',
          'Something went wrong!',
          'Could not retrieve all communties, please try again. If the problem keeps happening contact an admin',
          false,
          5000
        )
      )
      querySnapshot.forEach((doc) => {
        this.community = {
          id: doc.id,
          name: doc.data().name,
          address: doc.data().address,
          phoneNumber: doc.data().phoneNumber,
          eMailAddress: doc.data().eMailAddress
        }
        this.communities.options.push({
          text: this.community.name,
          value: this.community.id
        })
      })
    },

    async getEvent (eventId) {
      const docRef = doc(db, 'events', eventId)
      const docSnap = await getDoc(docRef).catch(
        this.$root.makeToast(
          'error-get-event',
          'danger',
          'Something went wrong!',
          'Could not load the event, please try again. if the problem keeps happening contact an admin',
          false,
          5000
        )
      )
      if (docSnap.exists()) {
        this.name = docSnap.data().eventName
        this.date = moment(docSnap.data().date.seconds * 1000).format(
          'YYYY-MM-DD'
        )
        this.startTime = docSnap.data().startTime
        this.endTime = docSnap.data().endTime
        this.description = docSnap.data().description
        this.deadlineRegistration = docSnap.data().deadlineRegistration
        this.attendanceLimit = docSnap.data().limitAttenders
        this.location = docSnap.data().location
        this.type.selected = docSnap.data().type
        this.online.selected = docSnap.data().onlineOffline
        this.actions.action1.value = docSnap.data().actions[0].value
        this.actions.action1.selected = docSnap.data().actions[0].selected
        this.actions.action2.value = docSnap.data().actions[1].value
        this.actions.action2.selected = docSnap.data().actions[1].selected
        this.actions.action3.value = docSnap.data().actions[2].value
        this.actions.action3.selected = docSnap.data().actions[2].selected
        this.communities.selected = docSnap.data().participatingCommunities
      } else {
        console.log('No such event!')
      }
    },

    async editEvent (eventId) {
      const eventRef = doc(db, 'events', eventId)
      await updateDoc(eventRef, {
        eventName: this.name,
        date: new Date(this.date),
        startTime: this.startTime,
        endTime: this.endTime,
        description: this.description,
        deadlineRegistration: new Date(this.date),
        limitAttenders: this.attendanceLimit,
        location: this.location,
        participatingCommunities: this.communities.selected,
        eventCanceled: false,
        onlineOffline: this.online.selected,
        actions: [
          this.actions.action1,
          this.actions.action2,
          this.actions.action3
        ],
        type: this.type.selected
      }).catch(
        this.$root.makeToast(
          'error-edit',
          'danger',
          'Something went wrong!',
          'The event might not have been updated. Please check and try again. If the problem keeps happening contact an admin',
          false,
          5000
        )
      )

      this.$root.makeToast(
        'success-edit',
        'success',
        'Success!',
        'The event is updated',
        false,
        5000
      )
    },

    async cancelEvent (eventId) {
      const eventRef = doc(db, 'events', eventId)
      await updateDoc(eventRef, {
        eventCanceled: true,
        cancelReason: this.cancellationReason
      }).catch(
        this.$root.makeToast(
          'error-cancel',
          'danger',
          'Something went wrong!',
          'The event might not have been cancelled. Please check and try again.',
          false,
          5000
        )
      )

      this.$root.makeToast(
        'success-cancel',
        'success',
        'Success!',
        'The event is cancelled',
        false,
        5000
      )
    },

    clearFields () {
      this.name = ''
      this.date = ''
      this.startTime = ''
      this.endTime = ''
      this.attendanceLimit = ''
      this.location = ''
      this.description = ''
      this.actions.action1 = { selected: null, value: '' }
      this.actions.action2 = { selected: null, value: '' }
      this.actions.action3 = { selected: null, value: '' }
      this.online.selected = null
      this.communities.selected = []
      this.type.selected = null
    },

    onPrimary () {
      if (this.create) {
        this.createEvent()
      }
      if (this.edit) {
        this.$bvModal.show('modal-confirm-edit-event')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.create-event {
  font-weight: 600;
}

.container-grid {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  column-gap: 10px;
  row-gap: 15px;
  justify-items: right;
}

.communities {
  justify-self: left;
}

.description-box {
  grid-column: span 3;
  height: 175px;
}

.e-col-2 {
  grid-column: 2;
}
.row-5 {
  grid-row: 5;
}
.row-6 {
  grid-row: 6;
}
.row-9 {
  grid-row: 9;
}

.row-10 {
  grid-row: 10;
}

.buttons-wrapper {
  margin-left: 200px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 410px;

  .btn {
    width: 200px;
    height: 50px;
  }
}
</style>
