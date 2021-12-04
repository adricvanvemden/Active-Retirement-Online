
<template>
  <div class="reversi">
    <div class="header">
      <h1>
        Hey {{ $store.state.user.firstName }}, you are on the REVERSI game
        page.<br />
        Here you can find instructions on how to play Reversi online.
      </h1>
    </div>
    <div class="description">
      <p>
        Single<br /><br />
        1. Click on highlighted checkers field<br />
        2. For Game Rules and Game Instructions scroll down the page<br /><br />

        Multiplayer<br /><br />
        1. Click on Multiplayer<br />
        2. Enter your name<br />
        3. Click on Opponent<br />
        4. Click on highlighted checkers field<br />
        5. For Game Rules and Game Instructions scroll down the page
      </p>
    </div>
    <br /><br /><br />
    <b-btn
      variant="primary"
      class="game-button"
      onclick=" window.open('https://cardgames.io/reversi/','_blank')"
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
