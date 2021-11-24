<template>
  <div class="bridge">
    <div class="header">
      <h1>
        Hey "username", you are on the BRIDGE game page.<br />
        Here you can find instructions on how to play Bridge online.
      </h1>
    </div>
    <div class="description">
      <p>
        Single <br />
        1. Click on Button “PLAY” <br />
        2. Select Cards on Bidding Table OR Press Button “Double” OR Press
        Button “Pass” <br />
        3. Select Card on Bottom <br />
        4. Select Card on Top <br />
        5. For Bridge Game Description or Online Bridge Strategy scroll down
      </p>
    </div>
    <br /><br /><br />
    <button
      class="btn"
      onclick="location.href='https://www.247bridge.com/'"
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
.p {
  font-size: 24;
  text-align: center;
}
</style>
