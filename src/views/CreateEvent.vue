<template>
  <div>
    <div class="create-event container-grid">
      <div>Name of event:</div>
      <b-input placeholder="Enter name.." v-model="name" />

      <div>Online/Offline:</div>
      <b-form-select
        class="w-100"
        v-model="online.selected"
        :options="online.options"
      ></b-form-select>

      <div>Location:</div>
      <b-input placeholder="Enter location.." v-model="location" />

      <div>Date:</div>
      <b-input type="date" v-model="date" />

      <div>Start time:</div>
      <b-input type="time" v-model="startTime" />

      <div>End time:</div>
      <b-input type="time" v-model="endTime" />

      <div>Attendance limit:</div>
      <b-input
        placeholder="Enter max limit.."
        v-model="attendanceLimit"
        :state="attendanceState"
      />
      <b-form-invalid-feedback> Enter a number. </b-form-invalid-feedback>

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
    <b-button @click="onCreateEvent()">Create Event</b-button>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  computed: {
    attendanceState () {
      if (this.attendanceLimit === null || this.attendanceLimit === '') return
      if (this.attendanceLimit[0] === '-') return false
      return !isNaN(this.attendanceLimit)
    }
  },

  data () {
    return {
      name: null,
      date: null,
      startTime: null,
      endTime: null,
      attendanceLimit: null,
      location: null,
      description: '',
      actions: {
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'radio', text: 'Radio' },
          { value: 'checkbox', text: 'Checkbox' }
        ],
        action1: { selected: null, value: null },
        action2: { selected: null, value: null },
        action3: { selected: null, value: null }
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
      }
    }
  },
  methods: {
    async createEvent () {
      const docRef = await addDoc(collection(db, 'events'), {
        eventName: this.name,
        date: this.date,
        description: this.description,
        deadlineRegistration: this.date,
        limitAttenders: this.attendanceLimit,
        location: this.location,
        startTime: this.startTime,
        endTime: this.endTime,
        participatingCommunities: this.communities.selected,
        eventCanceled: false,
        online: this.online.selected,
        actions: [
          this.actions.action1,
          this.actions.action2,
          this.actions.action3
        ],
        participants: []
      })
      console.log(docRef)
    },
    onCreateEvent () {
      console.log()
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

.add-action-button {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
</style>
