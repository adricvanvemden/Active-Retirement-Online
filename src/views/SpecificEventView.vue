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
      v-for="action in event.actions"
      :key="action.id"
      class="actions-wrapper"
      :class="{ cancelled: event.eventCanceled }"
    >
      <input
        :type="action.selected"
        name="drone"
        :disabled="event.eventCanceled"
      />
      {{ action.value }}
    </div>
    <div class="buttons-wrapper">
      <b-btn variant="primary" size="lg" squared :disabled="event.eventCanceled"
        >Register for event</b-btn
      >
      <b-btn variant="danger" size="lg" squared>CANCEL EVENT</b-btn>
      <b-btn variant="primary" size="lg" squared>EDIT EVENT</b-btn>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import moment from 'moment'
export default {
  name: 'SpecificEventView',

  beforeMount () {
    this.eventID = this.$route.path.slice(8)
    this.getEvent(this.eventID)
  },

  data () {
    return {
      eventID: '',
      event: { date: { seconds: '' } }
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
      } else {
        console.log('No such event!')
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
</style>
