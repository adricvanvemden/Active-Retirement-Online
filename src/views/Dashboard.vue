<template>
  <div class="Dashboard">
    <Calendar />
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Dashboard',
  components: {
    Calendar
  }
}
</script>
