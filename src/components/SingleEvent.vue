<template>
  <div class="single-event" :class="{ cancelled: cancelled }">
    <div class="event-title">
      <div
        :class="[event.type, { dot: dot }, { cancelled: event.eventCanceled }]"
      ></div>
      {{ event.eventName }}
    </div>
    <div v-if="date" class="event-date">{{ formatDate(event.date) }}</div>
    <div class="event-subtitle">
      {{ event.startTime }} - {{ event.endTime }} @ {{ event.location }} |
      {{ event.onlineOffline }}
      <b-button variant="primary" @click="onGoToEvent(event.id)">
        {{ btnText }}
      </b-button>
    </div>
    <div class="event-desc">{{ event.description }}</div>
  </div>
</template>

<script >
import moment from 'moment'
export default {
  name: 'SingleEvent',
  props: {
    event: Object,
    dot: Boolean,
    btnText: String,
    date: Boolean,
    cancelled: Boolean
  },
  methods: {
    formatDate (date) {
      return moment(date.seconds * 1000).format('DD MMMM, YYYY')
    },
    onGoToEvent (eventID) {
      this.$router.push('/events/' + eventID)
    }
  }
}
</script>

<style lang="scss">
.cancelled {
  text-decoration: line-through;
}
.single-event {
  margin: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px;
  font-size: 22px;
  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .event-title {
    font-weight: 800;
    display: flex;
    align-items: center;
  }

  .event-subtitle {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
  }

  .event-desc {
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
  }

  .event-date {
    display: flex;
    margin-left: 10px;
    font-weight: 600;
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
}
</style>
