<template>
  <div>
    <EventAdmin btn-text="CREATE EVENT" create />
  </div>
</template>

<script>
import EventAdmin from '@/components/EventAdmin.vue'

export default {
  name: 'CreateEvent',
  components: {
    EventAdmin
  }
}
</script>

<style lang="scss">
</style>
