
<template>
  <div class="reversi">
    <div class="header">
      <h1>
        Hey "username", you are on the REVERSI game page.<br />
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
    <button
      class="btn"
      onclick=" window.open('https://cardgames.io/reversi/','_blank')"
    >
      PLAY
    </button>
  </div>
</template>

<style lang="scss">
.btn {
  position: relative;
  border: none;
  border-radius: 0;
  color: white;
  padding: 20px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  background: #204293;
  margin-bottom: 80px;
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
