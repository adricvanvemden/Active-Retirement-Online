<template>
  <div>
    <EventsByType :type="type" isAdmin />
  </div>
</template>

<script>
// @ is an alias to /src
import EventsByType from '@/components/EventsByType.vue'

export default {
  name: 'EventsFiltered',
  components: {
    EventsByType
  },
  data () {
    return {
      type: ''
    }
  },
  beforeMount () {
    if (this.$route.path.includes('food')) this.type = 'food'
    else if (this.$route.path.includes('webinar')) this.type = 'webinar'
    else if (this.$route.path.includes('trips')) this.type = 'trip'
    else if (this.$route.path.includes('games')) this.type = 'game'
  }
}
</script>
