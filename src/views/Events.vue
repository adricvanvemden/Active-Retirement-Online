<template>
  <div id="events overview">
    <div class="header">
      Hello {{ $store.state.user.firstName }}, click on one of these buttons to
      view all the specific events.
    </div>
    <div class="events-wrapper">
      <router-link :to="{ name: 'food_events' }">
        <b-icon-egg-fried class="icon" />FOOD
      </router-link>

      <router-link :to="{ name: 'trip_events' }">
        <b-icon-signpost-2-fill class="icon" />TRIPS
      </router-link>

      <router-link :to="{ name: 'game_events' }">
        <b-icon-dice-5-fill class="icon" />GAMES
      </router-link>

      <router-link :to="{ name: 'webinar_events' }">
        <b-icon-camera-video-fill class="icon" />WEBINAR
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Events'
}
</script>

<style lang="scss">
.icon {
  height: 100px;
  width: 100px;
  margin-left: 30px;
}
.events-wrapper {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 500px);
  column-gap: 40px;
  row-gap: 40px;
  margin-top: 50px;

  a {
    height: 180px;
    width: 100%;
    display: grid;
    grid-template-columns: 150px 350px;
    align-items: center;
    justify-items: left;
    color: black;
    text-decoration: none;

    border: 3px solid #d3d3d3;
    border-radius: 18px;

    font-size: 64px;
    font-weight: 600;
    padding-right: 100px;
    background: lightblue;

    &:hover {
      color: black;
      background: #d3d3d3;
    }
  }
}

@media screen and (max-width: 1320px) {
  .header {
    padding: 20px 20px 0 20px;
  }
  .events-wrapper {
    grid-template-columns: 400px 400px;

    a {
      height: 150px;
      font-size: 50px;
    }
  }
}

@media screen and (max-width: 700px) {
  .header {
    padding: 20px 20px 0 20px;
  }
  .events-wrapper {
    grid-template-columns: repeat(1, 350px);
    a {
      height: 90px;
      font-size: 32px;
      grid-template-columns: 100px 250px;
    }
  }

  .icon {
    height: 50px;
    width: 50px;
  }
}
</style>
