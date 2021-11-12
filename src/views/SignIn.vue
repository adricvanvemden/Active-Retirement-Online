<template>
  <div>
      <div id="logo">
        <img src="src/assets/logo.png" alt="Logo">
      </div>
      <div id="form">
        <form method="post" onsubmit="return validation();">
          <div class="input_wrap">
            <label for="input_text" class="input_text">Email or phone number</label>
            <div class="input_field">
              <input type="text" class="input" id="input_text">
            </div>
          </div>
          <div class="input_wrap">
            <label for="input_password" class="input_text">Password</label>
            <div class="input_field">
              <input type="password" class="input" id="input_password">
            </div>
          </div>
        </form>
        <br>
      <br>
      <button class="btn">SIGN IN</button>
      <br>
      <p>Don't have an account, yet?</p>
      <br>
    <button class="btn">SIGN UP</button>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
body{
  background: #fff;
}

#logo {
  margin: 30px;
  padding: 20px;
}

*{
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  outline: none;
  color: #000000;
}

#form{
  width: 400px;
  padding: 35px 50px;
  text-align: center;
  display: inline-block;
}

#form .input_text{
  text-align: left;
  margin-bottom: 20px;
  font-size: 20px;
}

#form .input_wrap{
  margin-bottom: 20px;
  width: 325px;
  position: relative;
}

#form .input_wrap:last-child{
  margin-bottom: 0;
}

#form .input_wrap label{
  display: block;
  margin-bottom: 5px;
}

#form .input_wrap input{
  padding: 15px;
  width: 100%;
  border: 1px solid transparent;
  font-size: 16px;
  border-radius: 3px;
}

#form .input_wrap .input{
  background: #E5E5E5;
  padding-right: 35px;
  border-style: solid;
  border-width: 4px;
  border-color: #000;
}

#form .input_wrap .input_field{
  position: relative;
}

.btn {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  background: #204293;
}

p {
  padding-top: 50px;
}

</style>
