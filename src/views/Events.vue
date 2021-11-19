<template>
  <div id="events overview">
    <div class="header">
      <h1>
        Hello "username", click on one of these buttons to view all the specific
        events.
      </h1>
    </div>
    <div class="events-wrapper">
      <router-link :to="{ name: 'food_events' }">
        <img class="icon" src="../assets/food.png" />FOOD
      </router-link>

      <router-link :to="{ name: 'trip_events' }">
        <img class="icon" src="../assets/trips.png" />TRIPS
      </router-link>

      <router-link :to="{ name: 'game_events' }">
        <img class="icon" src="../assets/cards.png" />GAMES
      </router-link>

      <router-link :to="{ name: 'webinar_events' }">
        <img class="icon" src="../assets/webinar.png" />WEBINAR
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
    background: #f3f4f5;

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
    grid-template-columns: 500px;
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
