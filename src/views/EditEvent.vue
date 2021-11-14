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
        class="col-2"
        v-model="actions.action2.value"
      />
      <b-form-select
        class="w-100"
        v-model="actions.action2.selected"
        :options="actions.options"
      ></b-form-select>

      <b-input
        placeholder="Enter action.."
        class="col-2"
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
      <b-button class="btn-danger" v-b-modal.modal-prevent-closing squared>CANCEL</b-button>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Enter your cancellation reason"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOkCancel"
      >
        <form ref="form" @submit.stop.prevent="handleSubmitCancel">
          <b-form-group
            label="Cancellation Reason"
            label-for="cancel-input"
            invalid-feedback="Cancellation reason is required"
            :state="cancellationReasonState"
          >
            <b-form-textarea
              id="cancel-input"
              v-model="cancellationReason"
              :state="cancellationReasonState"
              rows="3"
              required
            ></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>
      <b-button
        class="btn-primary"
        squared
        v-b-modal.confirm-edit
        :disabled="createButtonDisabled"
      >EDIT EVENT</b-button>
      <b-modal
       id="confirm-edit"
       title="Confirm Edit"
       @ok="onEditEvent()"
      >
        <p class="my-4">Are you sure you want to confirm edit ?</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { updateDoc, collection, getDocs, query, doc } from 'firebase/firestore'
import moment from 'moment'
const eventId = 'KVeQ6OHJYa4fc4R0NMGx'

export default {
  name: 'Home',
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

    createButtonDisabled () {
      if (
        this.name === '' ||
        this.location === '' ||
        this.startTime === '' ||
        this.endTime === '' ||
        this.attendanceLimit === '' ||
        this.date === '' ||
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
      name: '',
      date: '',
      dateObject: '',
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
          { value: 'online', text: 'Online' },
          { value: 'offline', text: 'Offline' },
          { value: 'online/offline', text: 'Online/Offline' }
        ],
        selected: null
      },
      communities: {
        options: [
          { text: 'community1', value: 'cm1' },
          { text: 'community2', value: 'cm2' }
        ],
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
      cancellationReasonState: null,
      cancellationReason: ''
    }
  },
  created () {
    this.getEvent()
  },
  methods: {
    async getEvent () {
      // Better way to make the query
      const q = query(
        collection(db, 'events')
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if (doc.id === eventId) {
          this.name = doc.data().eventName
          // this.date = moment(doc.data().date).format('YYYY-MM-DD')
          this.startTime = doc.data().startTime
          this.endTime = doc.data().endTime
          this.description = doc.data().description
          this.deadlineRegistration = doc.data().deadlineRegistration
          this.attendanceLimit = doc.data().limitAttenders
          this.location = doc.data().location
          this.type.selected = doc.data().type
          this.online.selected = doc.data().onlineOffline
          this.actions.action1.value = doc.data().actions[0].value
          this.actions.action1.selected = doc.data().actions[0].selected
          this.actions.action2.value = doc.data().actions[1].value
          this.actions.action2.selected = doc.data().actions[1].selected
          this.actions.action3.value = doc.data().actions[2].value
          this.actions.action3.selected = doc.data().actions[2].selected
          // this.communities = doc.data().participatingCommunities
        }
      })
    },

    async editEvent () {
      const docRef = doc(db, 'events', eventId)

      await updateDoc(docRef, {
        eventName: this.name,
        date: new Date(this.date),
        description: this.description,
        limitAttenders: this.attendanceLimit,
        location: this.location,
        startTime: this.startTime,
        endTime: this.endTime,
        participatingCommunities: this.communities.selected,
        onlineOffline: this.online.selected,
        actions: [
          this.actions.action1,
          this.actions.action2,
          this.actions.action3
        ],
        participants: [],
        type: this.type.selected
      })
      console.log(docRef)
    },
    onEditEvent () {
      this.editEvent()
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.cancellationReasonState = valid
      return valid
    },
    resetModal () {
      this.cancellationReason = ''
      this.cancellationReasonState = null
    },
    handleOkCancel (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmitCancel()
    },
    async handleSubmitCancel () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      const docRef = doc(db, 'events', eventId)
      await updateDoc(docRef, {
        eventCanceled: true,
        eventCancellationReason: this.cancellationReason
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
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

.col-2 {
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
