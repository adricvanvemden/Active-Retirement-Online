<template>
  <div class="signIn">
    <div>
      <div id="logo">
        <img src="../assets/active-retirement-connect.png" alt="Logo" width="400px;" height="120px;">
      </div>
      <div id="form">
        <form method="post" onsubmit="return validation();">
          <div class="input_wrap">
            <div class="input_field">
              <input type="text" class="input" id="input_text" placeholder="email" v-model="loginData.email">
            </div>
          </div>
          <div class="input_wrap">
            <div class="input_field">
              <input type="password" class="input" id="input_password" placeholder="password" v-model="loginData.password">
            </div>
          </div>
        </form>
        <br>
      <br>
      <button
        class="btn"
        type="submit"
        @click="signInWithEmail()">SIGN IN</button>
      <br>
      <p>Don't have an account, yet?</p>
      <br>
    <button class="btn">SIGN UP</button>
    </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'

export default {
  data () {
    return {
      loginData: {
        email: null,
        password: null
      }
    }
  },
  mounted () {
  },
  methods: {
    signInWithEmail () {
      signInWithEmailAndPassword(auth, this.loginData.email, this.loginData.password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          router.push('/')
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)
          const errorMessage = error.message
          console.log(errorMessage)
        })
    }
  }
}
</script>

<style lang="scss">
body{
  background: #fff;
}

#logo {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
  text-align: center;
}

*{
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  outline: none;
  color: #000000;
}

#form{
  position: relative;
  width: 400px;
  padding: 40px 40px;
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
  padding: 10px;
  width: 100%;
  border: 1px solid lightgrey;
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
  position: relative;
  border: none;
  border-radius: 0;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  background: #204293;
}

p {
  position: relative;
  padding-top: 50px;
}

.signIn {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("../assets/background.jpg");
    background-size: 100%;
    opacity: 0.2;
  }
}

</style>
