<template>
  <div class="games">
    <div class="header">
      <h1>Hello "username", click on one of these buttons to view all the specific events.</h1>
    </div>
    <div class='some-page-wrapper'>
      <div class='row'>
        <div class='column'>
          <div class='column-one' onclick="location.href='/events/food_events'">
            <img class="smlIcons" src="../assets/food.png">FOOD
          </div>
          <div class='column-one' onclick="location.href='/events/trip_events'">
            <img class="smlIcons" src="../assets/trips.png">TRIPS
          </div>
        </div>
        <div class='column'>
          <div class='column-two' onclick="location.href='/events/game_events'">
            <img class="smlIcons" src="../assets/games.png">GAMES
          </div>
          <div class='column-two' onclick="location.href='/events/webinar_events'">
            <img id="webinarIcon" class="smlIcons" src="../assets/webinar.png">WEBINAR
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .smlIcons {
    height: 100px;
    width:110px;
  }
  .some-page-wrapper {
    margin-top: 50px;
  }
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    cursor: pointer;
  }
  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
  }
  .column-one {
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 3px solid #d3d3d3;
    border-radius: 18px;
    margin: 50px 50px 50px 200px;
    font-size: 40px;
    padding-right: 100px;
    background: #f3f4f5;
  }
    .column-two {
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 3px solid #d3d3d3;
    border-radius: 18px;
    margin: 50px 200px 50px 50px;
    padding-right: 100px;
    font-size: 40px;
    background: #f3f4f5;
  }
  @media screen and (max-width: 1320px) {
    .header {
      padding: 20px 20px 0 20px;
    }
    .row {
      margin-left: 0px;
    }
    .column {
    }
    .column-one {
      font-size: 30px;
      margin: 0 0 20px 0;
    }
    .column-two {
      font-size: 30px;
      margin: 0 0 20px 0;
    }
    .smlIcons {
      height: 50px;
      width: 50px;
      margin-left: 80px;
      margin-right: 10px;
    }
    #webinarIcon {
      margin-left: 80px;
    }
  }
</style>
