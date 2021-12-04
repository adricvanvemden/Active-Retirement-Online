<template>
  <div class="calendar">
    <div class="month-selector">
      <b-icon icon="caret-left-fill" @click="onLeftCaret()" />
      <div class="month" @click="onDate()">{{ monthFull }} {{ year }}</div>
      <b-icon icon="caret-right-fill" @click="onRightCaret()" />
    </div>
    <div class="calendar-border">
      <div class="grid-week-days">
        <div v-for="weekDay in weekDays" :key="weekDay">
          {{ weekDay }}
        </div>
      </div>

      <div v-for="week in calendar" :key="week.value" class="grid-week">
        <div
          @click="onCell(day)"
          v-for="day in week"
          :key="day.value"
          class="cell"
          :class="{ past: isPast(day) }"
          :id="formatToID(day)"
        >
          <div
            v-if="!isToday(day)"
            :class="{ 'outside-month': isOutsideMonth(day) }"
          >
            <div class="date">
              {{ formatToDay(day) }}
            </div>
          </div>
          <div v-else class="today">
            {{ formatToDayMonth(day) }}
          </div>
          <!-- events -->
          <div
            v-for="event in calendarEvents(day)"
            :key="event.id"
            class="event-wrapper event"
          >
            <s v-if="event.eventCanceled" class="event-inner-wrapper">
              <div
                class="dot"
                :class="[event.type, { cancelled: event.eventCanceled }]"
              ></div>
              <div>
                <b>{{ event.eventName }}:</b>
                {{ event.startTime }} - {{ event.endTime }}
              </div>
            </s>
            <div v-else class="event-inner-wrapper">
              <div class="dot" :class="[event.type]"></div>
              <div>
                <b>{{ event.eventName }}:</b>
                {{ event.startTime }} - {{ event.endTime }}
              </div>
            </div>
          </div>
          <!-- -->
        </div>
      </div>
    </div>
    <!-- modals -->
    <b-modal
      ok-only
      ok-title="Close"
      hide-header-close
      id="modal-calendar-event"
      ref="modal"
      :title="formatToDayMonthYear(selectedDate)"
      size="lg"
    >
      <div v-for="event in modalEvents" :key="event.id">
        <SingleEvent
          :event="event"
          btn-text="Go to event"
          dot
          :cancelled="event.eventCanceled"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '@/firebase'
import moment from 'moment'
import SingleEvent from './SingleEvent.vue'
const Calendar = require('calendar').Calendar
const calendar = new Calendar(1) // 1 to start on Monday

export default {
  name: 'Calendar',
  components: {
    SingleEvent
  },
  data () {
    return {
      weekDays: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      currentDate: '',
      fullDate: '',
      year: '',
      month: '', // jan = 0
      monthFull: '',
      calendar: '',
      events: [],
      selectedDate: ''
    }
  },

  computed: {
    modalEvents () {
      const modalEvents = []
      this.events.map((element) => {
        if (
          moment(element.date.seconds * 1000).format() ===
          moment(this.selectedDate).format()
        ) {
          modalEvents.push(element)
        }
      })
      return modalEvents
    }
  },
  watch: {
    fullDate (val) {
      this.events = []
      this.setCalendar()
    }
  },

  created () {
    this.setCurrentDate()
  },

  methods: {
    onGoToEvent (eventID) {
      this.$router.push('/event/' + eventID)
    },

    onCell (date) {
      const element = document.getElementById(this.formatToID(date))
      if (element.lastElementChild.classList.contains('event-wrapper')) {
        this.selectedDate = date
        this.$bvModal.show('modal-calendar-event')
      }
    },

    setCalendar () {
      this.calendar = calendar.monthDates(this.year, this.month)
      this.getMonthlyEvents()
    },

    formatToDay (date) {
      return moment(date).format('DD')
    },
    formatToDayMonth (date) {
      return moment(date).format('DD MMM')
    },
    formatToDayMonthYear (date) {
      return moment(date).format('DD MMMM, YYYY')
    },
    formatToID (date) {
      return moment(date).format('DD-MMM')
    },

    isToday (date) {
      if (this.isOutsideMonth(date)) return
      return (
        moment(this.currentDate).format('YYYY-MM-DD') ===
        moment(date).format('YYYY-MM-DD')
      )
    },

    isPast (date) {
      if (this.isOutsideMonth(date)) return
      return (
        moment(date).format('YYYY-MM-DD') <
        moment(this.currentDate).format('YYYY-MM-DD')
      )
    },

    isOutsideMonth (date) {
      return !(moment(date).month() === this.fullDate.month())
    },

    setCurrentDate () {
      this.currentDate = moment()
      this.fullDate = moment()
      this.year = moment().year()
      this.month = moment().month()
      this.monthFull = moment().month(this.month).format('MMMM')
    },

    onLeftCaret () {
      this.currentDate = moment()
      this.fullDate = moment(this.fullDate).subtract(1, 'months')
      this.month = this.fullDate.month()
      this.monthFull = moment().month(this.month).format('MMMM')
      if (this.month === 11) {
        this.year--
      }
    },

    onRightCaret () {
      this.currentDate = moment()
      this.fullDate = moment(this.fullDate).add(1, 'months')
      this.month = this.fullDate.month()
      this.monthFull = moment().month(this.month).format('MMMM')
      if (this.month === 0) {
        this.year++
      }
    },

    onDate () {
      this.setCurrentDate()
    },

    calendarEvents (date) {
      const calendarEvents = []
      this.events.map((element) => {
        if (
          moment(element.date.seconds * 1000).format() === moment(date).format()
        ) {
          calendarEvents.push(element)
        }
      })
      return calendarEvents
    },

    upcomingEvent () {
      this.$root.hideToast('upcomingEvent')
      for (const event of this.events) {
        if (this.isToday(event.date.seconds * 1000)) {
          this.$root.makeToast(
            'upcomingEvent',
            'primary',
            'You have an event today!',
            `${event.eventName}
            ${event.startTime} - ${event.endTime}`,
            true,
            0,
            `/events/${event.id}`
          )
        }
      }
    },

    // temp function just to populate the calendar
    async getMonthlyEvents () {
      const startDate = new Date(
        moment(this.fullDate).startOf('month').format('YYYY-MM-DD')
      )
      const endDate = new Date(
        moment(this.fullDate).endOf('month').format('YYYY-MM-DD')
      )
      const q = query(
        collection(db, 'events'),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      )
      try {
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
          console.log(this.monthlyEvent)
          for (const participant of this.monthlyEvent.participants) {
            if (participant.userId === this.$store.state.user.id) {
              this.events.push(this.monthlyEvent)
            }
          }
        })

        this.upcomingEvent()
      } catch (e) {
        console.log(e)
        if (this.$store.state.user !== undefined) {
          this.$root.makeToast(
            'error',
            'danger',
            'Something went wrong!',
            'Try again, if the problem keeps happening contact an admin',
            false,
            5000
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">
.calendar {
  width: 1750px;
  margin-left: auto;
  margin-right: auto;
}
.calendar-border {
  border: 1px solid #6d6c6c;
  background-color: rgb(233, 233, 233);
}
.grid-week-days {
  display: grid;
  grid-template-columns: repeat(7, 250px);
  grid-template-rows: 40px;
  justify-items: left;
  font-size: 28px;
  background-color: rgba(151, 151, 151, 0.575);
  font-weight: 600;
}

.grid-week {
  display: grid;
  grid-template-columns: repeat(7, 250px);
  grid-template-rows: 125px;
  border-top: 1px solid #6d6c6c;
  justify-items: left;
  font-size: 20px;
  overflow: hidden;
}

.event {
  display: flex;
  align-items: center;
  max-width: 240px;
  font-size: 18px;
  cursor: pointer;
}

.event-inner-wrapper {
  display: flex;
  align-items: center;
  &,
  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.month-selector {
  font-size: 32px;
  display: flex;
  user-select: none;
  align-items: center;

  .month {
    width: 250px;
    cursor: pointer;
  }
  svg {
    cursor: pointer;
  }
}

.today {
  border-top: 3px solid #204293;
  width: 250px;
  color: #204293;
  display: flex;
  font-weight: 600;
}

.past {
  background-color: #4e4e4e;
  width: 100%;
  color: white;
}

.outside-month {
  display: none;
}

.cell {
  .date {
    width: 10px;
    font-weight: 600;
  }
}

.dot {
  min-height: 10px;
  min-width: 10px;
  max-height: 10px;
  max-width: 10px;
  background-color: #bbb;
  border-radius: 50%;

  &.food {
    background-color: #00ff37;
  }

  &.webinar {
    background-color: #0184ff;
  }

  &.trip {
    background-color: #fde400;
  }

  &.game {
    background-color: #ff0202;
  }

  &.cancelled {
    background-color: black;
  }
}

.past {
  .dot {
    background-color: black;
  }
}

.modal-footer {
  justify-content: center;
}
</style>
