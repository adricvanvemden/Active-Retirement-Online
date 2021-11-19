<template>
  <div class="event">
    <div class="header">
      <h1>Hello "firstname", look at al these <b>games</b> related events!</h1>
    </div>
    <div class="infoBox" >
      <div class="eventInfo" v-for="event in events" :key="event.id">
        <div class="nameRegister" v-if="event.type === 'games'">
          <div class="eventName">
            {{ event.eventName }}
          </div>
          <div class="registerBtn" onclick="location.href='path where you can register'"> <!--insert here correct path for register btn-->
            Register for event
          </div>
        </div>
        <div class="eventDate" v-if="event.type === 'games'">
          {{ event.date }}
        </div>
        <div class="eventTime" v-if="event.type === 'games'">
          {{ event.startTime }} - {{ event.endTime }} @{{ event.location }}<br>
        </div>
        <div class="eventDescription" v-if="event.type === 'games'">
          {{ event.description }}
        </div>
        <hr v-if="event.type === 'games'">
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore'

export default {
  data () {
    return {
      user: [],
      events: []
    }
  },
  mounted () {
    this.getUser()
    this.getAllEvents()
  },
  methods: {
    convertTimestamp (derTimestamp) {
      const theDate = new Date(derTimestamp * 1000)
      return theDate.toLocaleDateString()
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
    async getAllEvents () {
      const querySnapshot = await getDocs(collection(db, 'events'))
      querySnapshot.forEach((doc) => {
        this.event = {
          id: doc.id,
          eventName: doc.data().eventName,
          date: this.convertTimestamp(doc.data().date.seconds),
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
  }
  .event {
    padding: 50px 20px 20px;
  }
  .nameRegister {
    padding: 30px 30px 0px 6%;
    display: flex;
    justify-content: space-between;
  }
  .eventName {
    font-size: 30px;
  }
  .registerBtn {
    background: darkblue;
    padding: 1%;
    margin-right: 2%;
    margin-left: 5%;
    margin-bottom: 2%;
    border: 1px solid black;
    color: white;
  }
  hr {
    height: 5%;
    width: 90%;
    color: black;
    margin-left: 6%;
    margin-right: 2%;
  }
  .eventTime {
    padding-left: 6%;
    margin-bottom: 1%;
    display: flex;
    justify-content:flex-start;
  }
  .eventDescription {
    padding-left: 6%;
    display: flex;
    justify-content:flex-start;
  }
  .eventDate {
    padding-left: 6%;
    display: flex;
    justify-content:flex-start;
  }
</style>
