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
      <b-button class="btn-danger" squared>CANCEL</b-button>
      <b-button
        class="btn-primary"
        squared
        :disabled="createButtonDisabled"
        @click="onCreateEvent()"
        >CREATE EVENT</b-button
      >
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import moment from 'moment'

export default {
  name: 'Home',
  created () {
    this.getAllCommunities()
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

    createButtonDisabled () {
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
      }
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
      })
      console.log(docRef)
    },

    async getAllCommunities () {
      const querySnapshot = await getDocs(collection(db, 'communities'))
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

    onCreateEvent () {
      this.createEvent()
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
