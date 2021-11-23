<template>
  <div class="games">
    <div class="header">
      <h1>
        Hey "username", here you can find all the games we offer.<br />
        Click on a game to see more information.
      </h1>
    </div>
    <div class="some-page-wrapper">
      <div class="row">
        <div class="column">
          <div
            class="column-one"
            onclick="location.href='src\views\JoinBridge.vue';"
          >
            <img
              src="../assets/bridge.png"
              style="height: 100px; width: 180px"
            />Bridge
          </div>
          <div
            class="column-one"
            onclick="location.href='src\views\JoinReversi.vue';"
          >
            <img
              src="../assets/reversi.jpg"
              style="height: 100px; width: 150px"
            />Reversi
          </div>
        </div>
        <div class="column">
          <div
            class="column-two"
            onclick="location.href='src\views\JoinChess.vue';"
          >
            <img
              src="../assets/chess.jpg"
              style="height: 100px; width: 150px"
            />Chess
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.some-page-wrapper {
  margin-top: 50px;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
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
</style>
