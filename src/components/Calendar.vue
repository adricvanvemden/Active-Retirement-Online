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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '@/firebase'
import moment from 'moment'
const Calendar = require('calendar').Calendar
const calendar = new Calendar(1) // 1 to start on Monday

export default {
  name: 'Calendar',
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
      events: []
    }
  },

  computed: {},
  watch: {
    fullDate () {
      this.setCalendar()
    }
  },

  created () {
    this.setCurrentDate()
  },

  methods: {
    loggie (val) {
      console.log(val)
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

    formatToID (date) {
      return moment(date).format('DD-MMM')
    },

    isToday (date) {
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

    appendEvents () {
      for (const event of this.events) {
        const date = new Date(event.date.seconds * 1000)
        const element = document.getElementById(this.formatToID(date))
        const wrapper = document.createElement('div')
        wrapper.classList += 'event'
        const dot = document.createElement('div')
        dot.classList += 'dot ' + event.type
        wrapper.append(dot)

        const eventEl = document.createElement('div')
        eventEl.innerHTML =
          '<b>' +
          event.eventName +
          ':</b>' +
          event.startTime +
          ' - ' +
          event.endTime
        wrapper.append(eventEl)
        element.append(wrapper)
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
          actions: doc.data().actions
        }
        this.events.push(this.monthlyEvent)
        // console.log(this.events)
      })
      this.appendEvents()
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
  border: 1px solid #b8b8b8;
}
.grid-week-days {
  display: grid;
  grid-template-columns: repeat(7, 250px);
  grid-template-rows: 40px;
  justify-items: left;
  font-size: 28px;
}

.grid-week {
  display: grid;
  grid-template-columns: repeat(7, 250px);
  grid-template-rows: 125px;
  border-top: 1px solid #b8b8b8;
  justify-items: left;
  font-size: 20px;
  overflow: hidden;
}

.event {
  display: flex;
  align-items: center;
  max-width: 240px;
  font-size: 18px;
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
}

.past {
  background-color: #e5e5e5;
  width: 100%;
}

.outside-month {
  display: none;
}

.cell {
  .date {
    width: 10px;
  }
  .dot {
    min-height: 10px;
    min-width: 10px;
    background-color: #bbb;
    border-radius: 50%;

    &.food {
      background-color: #00ff37;
    }

    &.webinar {
      background-color: #0184ff;
    }

    &.trips {
      background-color: #fde400;
    }

    &.games {
      background-color: #ff0202;
    }
  }
}

.past {
  .dot {
    background-color: black;
  }
}
</style>
