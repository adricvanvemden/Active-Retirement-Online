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
        Single<br />
        1. Click on Opponent {Bill (easy), Bill Sr. (medium), Beth (hard)}<br />
        2. Click on chess piece<br />
        3. Click on green checkers field<br />
        4. For Game Rules and Game Instructions scroll down the page<br /><br />
        Multiplayer<br />
        1. Select Opponent {Bill (easy), Bill Sr. (medium), Beth (hard)}<br />
        2. Click on Multiplayer<br />
        3. Enter your name<br />
        4. Click on Opponent<br />
        5. Click on chess piece<br />
        6. Click on green checkers field<br />
        7. For Game Rules and Game Instructions scroll down the page
      </p>
    </div>
    <br /><br />
    <button
      class="btn"
      onclick="location.href='https://cardgames.io/chess/'"
      target="_blank"
      rel="noreferrer noopener"
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
}
.description {
  font-size: 32;
  text-align: center;
  font-weight: bold;
  position: relative;
  border: none;
  border-radius: 0;
  text-decoration: none;
  display: inline-block;
}
</style>
