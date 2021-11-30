<template>
  <div>
    <div class="header">
      <h1>
        Hello {{ $store.state.user.firstName }}, look at al these
        <b>{{ type }}</b> related events!
      </h1>
    </div>
    <div v-if="isAdmin" class="createEvent">
      <router-link :to="{ name: 'create_event' }">
        <b-button variant="primary"> CREATE EVENT </b-button>
      </router-link>
    </div>
    <div class="infoBox">
      <div class="eventInfo" v-for="event in events" :key="event.id">
        <SingleEvent
          :event="event"
          btn-text="Register for event"
          date
          isAdmin
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import SingleEvent from './SingleEvent.vue'

export default {
  components: {
    SingleEvent
  },
  props: {
    type: String,
    isAdmin: Boolean
  },
  computed: {},
  data () {
    return {
      user: [],
      events: []
    }
  },
  mounted () {
    this.getAllEventsByType(this.type)
  },
  methods: {
    async getAllEventsByType (type) {
      const q = query(collection(db, 'events'), where('type', '==', type))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.event = {
          id: doc.id,
          eventName: doc.data().eventName,
          date: doc.data().date,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          description: doc.data().description,
          deadlineRegistration: doc.data().deadlineRegistration,
          limitAttenders: doc.data().limitAttenders,
          location: doc.data().location,
          organizer: doc.data().organizer,
          participatingCommunities: doc.data().participatingCommunities,
          eventCanceled: doc.data().eventCanceled,
          onlineOffline: doc.data().onlineOffline,
          participants: doc.data().participants,
          actions: doc.data().actions,
          type: doc.data().type
        }
        this.events.push(this.event)
      })
    }
  }
}
</script>

<style>
.header {
  padding-bottom: 20px;
}
.infoBox {
  border: 3px solid #d3d3d3;
  margin: 20px;
}
</style>
