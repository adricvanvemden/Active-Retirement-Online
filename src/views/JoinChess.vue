<template>
  <div class="chess">
    <div class="header">
      <h1>
        Hey {{ $store.state.user.firstName }}, you are on the CHESS game
        page.<br />
        Here you can find instructions on how to play Chess online.
      </h1>
    </div>
    <div class="description">
      <p>
        Single<br /><br />
        1. Click on Opponent {Bill (easy), Bill Sr. (medium), Beth (hard)}<br />
        2. Click on chess piece<br />
        3. Click on green checkers field<br />
        4. For Game Rules and Game Instructions scroll down the page<br /><br />
        Multiplayer<br /><br />
        1. Select Opponent {Bill (easy), Bill Sr. (medium), Beth (hard)}<br />
        2. Click on Multiplayer<br />
        3. Enter your name<br />
        4. Click on Opponent<br />
        5. Click on chess piece<br />
        6. Click on green checkers field<br />
        7. For Game Rules and Game Instructions scroll down the page
      </p>
    </div>
    <br />
    <b-btn
      variant="primary"
      class="game-button"
      onclick=" window.open('https://cardgames.io/chess/','_blank')"
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
