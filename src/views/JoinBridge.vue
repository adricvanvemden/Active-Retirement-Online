<template>
  <div class="bridge">
    <div class="header">
      Hey {{ $store.state.user.firstName }}, you are on the BRIDGE game page.<br />
      Here you can find instructions on how to play Bridge online.
    </div>
    <div class="description">
      <p>
        Single <br /><br />
        1. Click on Button “PLAY” <br />
        2. Select Cards on Bidding Table OR Press Button “Double” OR Press
        Button “Pass” <br />
        3. Select Card on Bottom <br />
        4. Select Card on Top <br />
        5. For Bridge Game Description or Online Bridge Strategy scroll down
      </p>
    </div>
    <br /><br /><br />
    <b-btn
      variant="primary"
      class="game-button mb-3"
      onclick=" window.open('https://www.247bridge.com/','_blank')"
    >
      PLAY
    </b-btn>
  </div>
</template>

<style lang="scss" scoped>
.game-button {
  font-size: 48px;
  padding: 10px 20px 10px 20px;
}
.description {
  text-align: left;
  font-weight: bold;
  font-size: x-large;
  position: relative;
  text-decoration: none;
  padding-left: 30px;

  background: lightblue;
  border: 3px solid #d3d3d3;
  border-radius: 18px;

  margin-left: 15%;
  margin-right: 15%;
  margin-top: 50px;

  align-items: center;
  justify-items: center;
}
</style>
