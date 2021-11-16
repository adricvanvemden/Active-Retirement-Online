<template>
  <div class="event">
    <div class="header">
      <h1>Hey "username", look at al these <b>food</b> related events!</h1>
    </div>
    <div class="infoBox">
      <div class="eventInfo" v-for="event in events" :key="event.id">
        <div class="nameRegister">
          <div class="eventName">{{ event.eventName }}</div>
          <div class="registerBtn" onclick="location.href='path where you can register'">Register for event</div><!--insert here correct path for register btn-->
        </div>
        <div class="eventDate">{{ event.date }}</div>
        <div class="eventTime">{{ event.endTime }} - {{ event.endTime }} @{{ event.location }}<br></div>
        <div class="eventDescription">{{ event.description }}</div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'
export default {
  data () {
    return {
      characters: ['test1', 'test2', 'test3'],
      events: [],
      monthlyEvents: [],
      timestamp: this.timestamp
    }
  },
  mounted () {
    this.getAllEvents()
  },
  methods: {
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
        actions: ['Action one', 'Action two']
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
          actions: doc.data().actions
        }
        this.events.push(this.event)
        console.log(this.events)
      })
    },
    async getMonthlyEvents () {
      const startdate = new Date('2021-11-01')
      const enddate = new Date('2021-12-01')
      console.log(startdate)
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
          actions: doc.data().actions
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
