<template>
  <div class="calendar">
    <div class="grid-week-days">
      <div v-for="weekDay in weekDays" :key="weekDay">
        {{ weekDay }}
      </div>
    </div>

    <div v-for="week in calendar" :key="week.value" class="grid-week">
      <div v-for="day in week" :key="day.value">
        {{ formatToDay(day) }}
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
      year: 2021,
      month: 10, // jan = 0
      calendar: ''
    }
  },

  computed: {},
  watch: {},

  created () {
    this.calendar = calendar.monthDates(this.year, this.month)
  },

  methods: {
    loggie (val) {
      console.log(val)
    },

    formatToDay (date) {
      return moment(date).format('DD')
    }
  }
}
</script>

<style lang="scss">
.calendar {
  border: 1px solid;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.grid-week-days {
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-template-rows: 50px;
  justify-items: left;
}

.grid-week {
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-template-rows: 100px;
  border-top: 1px solid;
  justify-items: left;
}
</style>
