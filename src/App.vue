<template>
  <div id="app">
    <div id="nav">
      <router-link to="/signIn">Sign In</router-link>
      <router-link to="/">Calendar</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/games">Games</router-link>
      <img class="logo" src="./assets/logo.jpeg" @click="onImg()" />
      <router-link to="/myAccount">My Account</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { db, auth } from './firebase'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, query, updateDoc, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
  data () {
    return {
      events: [],
      eventsByType: [],
      monthlyEvents: []
    }
  },
  mounted () {},
  methods: {
    onImg () {
      this.$router.push('/')
    },
    async createEvent () {
      const docRef = await addDoc(collection(db, 'events'), {
        eventName: 'Bridge',
        date: new Date(2021, 10, 22, 18, 0, 0),
        endTime: new Date(2021, 10, 22, 20, 0, 0),
        description: 'We invite you to join us for a couple rounds of bridge.',
        deadlineRegistration: new Date(2021, 10, 17, 18, 0, 0),
        limitAttenders: 50,
        location: 'Link to Site',
        organizer: 'Liz Chambers',
        participatingCommunities: [
          'Active Retirement Group Parnell',
          'Active Retirement Group Dublin'
        ],
        eventCanceled: false,
        onlineOffline: 'online',
        participants: [
          {
            user: 'Harald Harald',
            actions: ['Action one']
          }
        ],
        actions: [
          'Action one',
          'Action two'
        ],
        type: 'online'
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
    async createCommunity () {
      const docRef = await addDoc(collection(db, 'communities'), {
        name: 'Retirement Group Meath',
        address: 'North-East Circular Road 715',
        phoneNumber: '123 456 789',
        eMailAddress: 'retgroupmeath@gmail.com'
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
        console.log(this.events)
      })
    },

    async getAllEventsByType (type) {
      const querySnapshot = await getDocs(collection(db, 'events'), where('type', '==', type))
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
        this.eventsByType.push(this.event)
        console.log(this.eventsByType)
      })
    },

    async getMonthlyEvents () {
      const startdate = new Date('2021-11-01')
      const enddate = new Date('2021-12-01')
      const q = query(
        collection(db, 'events'),
        where('date', '>=', startdate),
        where('date', '<', enddate)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.monthlyEvent = {
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
        this.monthlyEvents.push(this.monthlyEvent)
        console.log(this.monthlyEvents)
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
    },

    async getUser (userId) {
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
      } else {
        console.log('No such User!')
      }
    },
    async signUp (email, password, firstName, lastName, gender, phoneNumber, ageGroup,
      address, zipCode, county, hobbies, community) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const docRef = setDoc(doc(db, 'users', userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            eMail: email,
            phoneNumber: phoneNumber,
            ageGroup: ageGroup,
            address: address,
            zipCode: zipCode,
            county: county,
            hobbies: hobbies,
            dateOfRegistration: new Date().getTime(),
            community: community,
            userRole: 'registered'
          })
          console.log('Registration successful', docRef)
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)
          const errorMessage = error.message
          console.log(errorMessage)
        })
    },
    async signInWithEmail (email, password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // user which get all the attributes of document with the same id
          const user = doc(db, 'users', userCredential.user.uid)
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)
          const errorMessage = error.message
          console.log(errorMessage)
        })
    },

    async signOutFromApp () {
      await signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.log(error)
      })
    },

    async editEvent (eventId) {
      const eventRef = doc(db, 'events', eventId)
      await updateDoc(eventRef, {
        // replace attribute with frontend attribute
        eventName: 'attribute',
        date: 'attribute',
        startTime: 'attribute',
        endTime: 'attribute',
        description: 'attribute',
        deadlineRegistration: 'attribute',
        limitAttenders: 'attribute',
        location: 'attribute',
        organizer: 'attribute',
        participatingCommunities: 'attribute',
        eventCanceled: false,
        onlineOffline: 'attribute',
        participants: 'attribute',
        actions: 'attribute',
        type: 'attribute'
      })
    }
  },
  async cancelEvent (eventId) {
    const eventRef = doc(db, 'events', eventId)
    await updateDoc(eventRef, {
      // replace attribute with frontend attribute
      eventCanceled: true,
      cancelReason: 'attribute'
    })
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
  body {
    list-style: none;
    float: left;
    margin-right: 40px;
    border: none;
    text-align: center;
    float: center;
    width: auto;
  }
  a {
    color: black;
    text-decoration: none;
    font-size: x-large;
    font-weight: normal;
    font-family: "Montserrat", sans-serif;
    padding: 12px 60px;
    background-color: lightgrey;
    &.router-link-exact-active {
      background-color: darkred;
      color: white;
    }
  }
  .active {
    background-color: darkred;
  }
  a:hover:not(.active) {
    background-color: lightcoral;
  }
  .logo {
    width: 400px;
    height: 120px;
    float: fixedgit;
  }
}
</style>
