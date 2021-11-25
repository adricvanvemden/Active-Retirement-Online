<template>
  <div class="chess">
    <div class="header">
      <h1>
        Hey "username", you are on the CHESS game page.<br />
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
    <button class="btn" onclick="location.href='https://cardgames.io/chess/'">
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
}
.description {
  text-align: left;
  font-weight: bold;
  font-size: x-large;
  position: relative;
  text-decoration: none;

  background: #f3f4f5;
  border: 3px solid #d3d3d3;
  border-radius: 18px;

  margin-left: 15%;
  margin-right: 15%;
  margin-top: 50px;

  align-items: center;
  justify-items: center;
}
</style>
