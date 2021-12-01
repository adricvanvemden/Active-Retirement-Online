<template>
  <div>
    <b-btn variant="primary" @click="$router.go(-1)" squared>BACK</b-btn>
    <div v-if="event.eventCanceled" class="event-cancelled">
      <b> EVENT CANCELLED! </b>
      <br />
      <p>{{ event.cancelReason }}</p>
    </div>
    <div
      class="container-grid-specific-event"
      :class="{ cancelled: event.eventCanceled }"
    >
      <div style="justify-self: right">Name of event:</div>
      {{ event.eventName }}

      <div style="justify-self: right">Location:</div>
      {{ event.location }}

      <div style="justify-self: right">Online / Offline:</div>
      {{ event.onlineOffline }}

      <div style="justify-self: right">Date:</div>
      {{ formatToDate(event.date.seconds) }}

      <div style="justify-self: right">Time:</div>
      {{ event.startTime }} - {{ event.endTime }}

      <div style="justify-self: right">Description:</div>
      {{ event.description }}
    </div>

    <div
      v-for="(action, index) in event.actions"
      :key="action.id"
      class="actions-wrapper"
      :class="{ cancelled: event.eventCanceled }"
    >
      <input
        :type="action.selected"
        name="action"
        v-model="actionsSelected[index]"
        :value="action"
        :disabled="event.eventCanceled"
      />
      {{ action.value }}
    </div>
    <div class="buttons-wrapper">
      <b-btn variant="primary" size="lg" squared :disabled="event.eventCanceled || this.isRegistered"
        v-b-modal.modal-confirm-register
        >Register for event</b-btn
      >
      <b-modal
        id="modal-confirm-register"
        title="Confirm Register"
        hide-header-close
        @ok="registerForEvent(eventID)"
        ok-title="Confirm"
        cancel-variant="danger"
      >
      <div class="modal-confirm-register-text">
        <strong>Name of event: </strong>{{ event.eventName }}
        <br>
        <strong>Location: </strong>{{ event.location }}
        <br>
        <strong>Date: </strong>{{ formatToDate(event.date.seconds) }}
        <br>
        <strong>Time : </strong>{{ event.startTime }} - {{ event.endTime }}
        <br><br>
        <b>Are you sure you want to register to this event?</b>
      </div>
    </b-modal>
      <b-btn variant="danger" size="lg" squared v-b-modal.modal-cancel-event
        >CANCEL EVENT
      </b-btn>

      <b-modal
        id="modal-cancel-event"
        hide-header-close
        title="Reason of cancellation"
        ok-title="Confirm"
        @ok="cancelEvent(eventID)"
        cancel-variant="danger"
      >
      <b-form-textarea
        id="cancel-input"
        v-model="event.cancellationReason"
        rows="3"
        required
      ></b-form-textarea>
    </b-modal>

      <b-btn variant="primary" size="lg" squared @click="onGoToEditEvent(eventID)">EDIT EVENT</b-btn>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import moment from 'moment'

export default {
  name: 'SpecificEventView',

  beforeMount () {
    this.eventID = this.$route.path.slice(8)
    this.getEvent(this.eventID)
    this.getUser()
  },
  data () {
    return {
      eventID: '',
      event: { date: { seconds: '' } },
      user: '',
      isRegistered: false,
      actionsSelected: []
    }
  },

  methods: {
    formatToDate (date) {
      return moment(date * 1000).format('DD MMMM, YYYY')
    },
    async getEvent (eventId) {
      const docRef = doc(db, 'events', eventId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.event = docSnap.data()
        console.log('Event : ', this.event)
        this.isUserRegistered()
      } else {
        console.log('No such event!')
      }
    },
    getUser () {
      this.user = this.$store.state.user
      console.log('User : ', this.user)
    },
    isUserRegistered () {
      if (this.event.participants.some(e => e.userId === this.user.id)) {
        this.isRegistered = true
      }
      console.log('isUserRegistered ? : ', this.isRegistered)
    },
    onGoToEditEvent (eventID) {
      this.$router.push('/admin/events/edit/' + eventID)
    },
    async cancelEvent (eventId) {
      const eventRef = doc(db, 'events', eventId)
      await updateDoc(eventRef, {
        eventCanceled: true,
        cancelReason: this.cancellationReason
      })
    },
    async registerForEvent (eventId) {
      console.log('actionsSelected : ', this.actionsSelected)
      const actionsSelectedString = []
      for (let i = 0; i < this.actionsSelected.length; i++) {
        if (this.actionsSelected[i] !== false && this.actionsSelected[i] !== undefined) {
          actionsSelectedString.push(this.event.actions[i].value)
        }
      }
      console.log('actionsSelectedString : ', actionsSelectedString)
      const userToRegister = {
        userId: this.user.id,
        actions: actionsSelectedString
      }
      console.log('userToRegister : ', userToRegister)
      if (!this.event.participants.some(e => e.userId === this.user.id)) {
        this.event.participants.push(userToRegister)
        const eventRef = doc(db, 'events', eventId)
        await updateDoc(eventRef, {
          participants: this.event.participants
        }).then(() => {
          this.isRegistered = true
        })
      }
    }
  }
}
</script>

<style lang="scss">
.btn {
  display: flex;
  margin-left: 50px;
  padding: 5px 20px 5px 20px;
}
.cancelled {
  text-decoration: line-through;
}

.event-cancelled {
  font-size: 42px;
  p {
    font-size: 36px;
    margin: 0;
    padding: 0;
  }
}
.container-grid-specific-event {
  margin-top: 20px;
  margin-left: 50px;
  display: grid;
  grid-template-columns: 250px 600px;
  column-gap: 20px;
  row-gap: 15px;
  justify-items: left;

  font-size: 32px;
  margin-bottom: 50px;

  div {
    font-weight: 600;
  }
}

.actions-wrapper {
  margin-left: 100px;
  align-items: center;
  display: flex;
  font-size: 26px;

  input[type="checkbox"] {
    transform: scale(1.5);
    margin-right: 10px;
  }

  input[type="radio"] {
    transform: scale(1.5);
    margin-right: 10px;
  }
}

.buttons-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-right: 100px;
}
.modal-confirm-register-text {
  font-weight: 600;
  font-size: 22px;
}
</style>
