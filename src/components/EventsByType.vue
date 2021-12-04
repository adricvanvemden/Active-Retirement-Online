<template>
  <div>
    <div class="header">
      <h1>
        Hello {{ $store.state.user.firstName }}, look at all these
        <b>{{ type }}</b> related events!
      </h1>
      <b-btn
        class="back-button"
        variant="primary"
        @click="$router.go(-1)"
        squared
        >BACK</b-btn
      >
    </div>
    <div v-if="$store.state.user.userRole === 'admin'" class="create-event">
      <router-link :to="{ name: 'create_event' }">
        <b-button variant="primary"> CREATE EVENT </b-button>
      </router-link>
    </div>
    <div class="infoBox">
      <div class="eventInfo" v-for="event in events" :key="event.id">
        <SingleEvent :event="event" :btn-text="btnText" date />
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
    type: String
  },
  computed: {
    btnText () {
      if (this.$store.state.user.userRole === 'admin') return 'Edit event'
      return 'Register for event'
    }
  },
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
        console.log(this.event)
        console.log(this.$store.state.user)
        if (
          this.event.deadlineRegistration.seconds >=
          new Date().getTime() / 1000
        ) {
          if (
            this.$store.state.user.userRole === 'admin' ||
            this.event.participatingCommunities.includes(
              this.$store.state.user.community
            )
          ) {
            this.events.push(this.event)
          }
        }
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
