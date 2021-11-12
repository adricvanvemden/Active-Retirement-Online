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
          :class="{ past: isPast(day) }"
        >
          <div
            v-if="!isToday(day)"
            :class="{ 'outside-month': isOutsideMonth(day) }"
          >
            {{ formatToDay(day) }}
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
      calendar: ''
    }
  },

  computed: {},
  watch: {
    fullDate () {
      this.calendar = calendar.monthDates(this.year, this.month)
    }
  },

  created () {
    this.setCurrentDate()
    this.calendar = calendar.monthDates(this.year, this.month)
  },

  methods: {
    loggie (val) {
      console.log(val)
    },

    formatToDay (date) {
      return moment(date).format('DD')
    },
    formatToDayMonth (date) {
      return moment(date).format('DD MMM')
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
  display: flex;
  width: 100%;
}

.outside-month {
  display: none;
}
</style>
