<template>
  <div class="games">
    <div class="header">
      Hey {{ $store.state.user.firstName }}, here you can find all the games we
      offer.<br />
      Click on a game to see more information.
    </div>
    <div class="games-wrapper">
      <router-link :to="{ name: 'bridge' }">
        <img src="../assets/bridge.png" />Bridge
      </router-link>
      <router-link :to="{ name: 'reversi' }">
        <img src="../assets/reversi.png" />Reversi
      </router-link>
      <router-link :to="{ name: 'chess' }">
        <img src="../assets/chess.png" />Chess
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
.games-wrapper {
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
    grid-template-columns: 150px 250px;
    align-items: center;
    justify-items: center;
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
    img {
      width: 100px;
      height: 80px;
    }
  }
}

@media screen and (max-width: 1320px) {
  .header {
    padding: 20px 20px 0 20px;
  }
  .games-wrapper {
    grid-template-columns: 400px 400px;

    a {
      height: 150px;
      font-size: 50px;
    }
  }
}

@media screen and (max-width: 850px) {
  .header {
    padding: 20px 20px 0 20px;
  }
  .games-wrapper {
    grid-template-columns: repeat(1, 350px);
    a {
      height: 90px;
      font-size: 32px;
      grid-template-columns: 100px 250px;
    }
    img {
      width: 70px;
      height: 50px;
    }
  }
}
</style>
