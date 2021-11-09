<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Calendar</router-link>
      |
      <router-link to="/events">Events</router-link>
      |
      <router-link to="/games">Games</router-link>
      |
      <router-link to="/myAccount">My Account</router-link>
      |
      <router-link to="/admin/events/create">Create Event</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { db } from './firebase'
import { collection, doc, addDoc, getDoc, getDocs } from 'firebase/firestore'

export default {
  data () {
    return {
      events: []
    }
  },
  mounted () {},
  methods: {
    async createEvent () {
      const docRef = await addDoc(collection(db, 'events'), {
        eventName: 'Specialized Talk Global Warming',
        date: new Date(2021, 11, 5, 18, 0, 0),
        description:
          'Mrs. Fischer will held a talk about global warming. If you are interested in this we would be glad if you could join us',
        deadlineRegistration: new Date(2021, 11, 4, 18, 0, 0),
        limitAttenders: 50,
        location: 'Dublin Hall 7',
        organizer: 'Peter McConnor',
        durationEvent: '2 hours',
        participatingCommunities: ['Active Retirement Group Dublin'],
        eventCanceled: false,
        online: false,
        participants: []
      })
      console.log(docRef)
    },
    async createUser () {
      const docRef = await addDoc(collection(db, 'users'), {
        firstName: 'Sandra',
        lastName: 'Valentine',
        gender: 'female',
        eMail: 'sandrasmith@gmail.com',
        phoneNumber: '+353 664 87654321',
        ageGroup: '20-30 years',
        address: 'Example Street 15',
        zipCode: 'D03 5321',
        county: 'Dublin',
        hobbies: 'climbing, soccer, tennis',
        dateOfRegistration: new Date().getTime(),
        community: 'Active Retirement Group Dublin',
        userRole: 'admin'
      })
      console.log(docRef)
    },
    async getAllEvents () {
      const querySnapshot = await getDocs(collection(db, 'events'))
      querySnapshot.forEach((doc) => {
        this.event = {
          id: doc.id,
          eventName: doc.data().eventName,
          date: doc.data().date,
          description: doc.data().description,
          deadlineRegistration: doc.data().deadlineRegistration,
          limitAttenders: doc.data().limitAttenders,
          location: doc.data().location,
          organizer: doc.data().organizer,
          durationEvent: doc.data().durationEvent,
          participatingCommunities: doc.data().participatingCommunities,
          eventCanceled: doc.data().eventCanceled,
          online: doc.data().online,
          participants: doc.data().participants
        }
        this.events.push(this.event)
        console.log(this.events)
      })
    },
    async getEvent (eventId) {
      const docRef = doc(db, 'events', eventId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
      } else {
        console.log('No such event!')
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
