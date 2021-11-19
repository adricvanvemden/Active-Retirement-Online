<template>
<div class="signUp">
  <div id="logo">
    <img
      src="../assets/active-retirement-connect.png"
      alt="Logo"
      width="400px;"
      height="120px;"
    />
  </div>
  <p>Please fill out the following form to sign up<br>
    <div id="text2">For the email adress and phone number, only one is required.</div>
  <div id="form">
    <form method="post" onsubmit="return validation();">
      <div class="input_wrap">
        <div class="input_field">
          <input
            type="text"
            class="input"
            id="input_firstname"
            placeholder="First name"
            v-model="registerData.firstname"
          />
        </div>
      </div>
      <div class="input_wrap">
        <div class="input_field">
          <input
            type="text"
            class="input"
            id="input_lastname"
            placeholder="Last name"
            v-model="registerData.lastname"
          />
        </div>
      </div>
      <div class="input_wrap">
        <div class="input_field">
          <select id="age">
            <option value="60+">Age: 60+</option>
            <option value="70+">Age: 70+</option>
            <option value="80+">Age: 80+</option>
          </select>
        </div>
      </div>
      <div class="input_wrap">
        <div class="input_field">
          <input
            type="text"
            class="input"
            id="input_text"
            placeholder="email"
            v-model="registerData.email"
          />
        </div>
      </div>
      <div class="input_wrap">
        <div class="input_field">
          <input
            type="text"
            class="input"
            id="input_phone"
            placeholder="Phone number"
            v-model="registerData.phone"
          />
        </div>
      </div>
      <div class="input_wrap">
        <div class="input_field">
          <input
            type="password"
            class="input"
            id="input_password"
            placeholder="Password"
            v-model="registerData.password"
          />
        </div>
      </div>
      <div class="input_wrap">
        <div class="input_field">
          <input
            type="password"
            class="input"
            id="input_repeat"
            placeholder="Confirm Password"
            v-model="registerData.password2"
          />
        </div>
      </div>
    </form>
    <br />
    <br />
    <b-btn variant="primary" type="submit" @click="signUpWithEmailAndPassword()"
    >SIGN UP</b-btn
    >
  </div>
</div>
</template>

<script>
import { auth, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'

export default {
  data () {
    return {
      registerData: {
        firstname: null,
        lastname: null,
        age: null,
        email: null,
        phone: null,
        password: null,
        password2: null
      }
    }
  },
  mounted () {},
  methods: {
    print () {
      console.log(this.registerData)
    },

    signUpWithEmailAndPassword () {
      if (this.registerData.password === this.registerData.password2) {
        createUserWithEmailAndPassword(auth, this.registerData.email, this.registerData.password)
          .then((userCredential) => {
            const docRef = setDoc(doc(db, 'users', userCredential.user.uid), {
              firstname: this.registerData.firstname,
              lastname: this.registerData.lastname,
              age: this.registerData.age,
              phone: this.registerData.phone,
              email: this.registerData.email
            })
            console.log('Registration successful', docRef)
            router.push('/dashboard')
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
}
</script>

<style lang="scss">
#logo {
  position: relative;
  margin-top: 30px;
  margin-bottom: 0;
}

p {
  position: relative;
  font-weight: bold;
  font-size: 32px;
  margin: 0;
}

#text2 {
  font-weight: normal;
  font-size: 20px;
}

#form {
  position: relative;
  width: 400px;
  text-align: center;
  display: inline-block;
}

#form .input_text {
  text-align: left;
  margin-bottom: 20px;
  font-size: 20px;
}

#form .input_wrap {
  margin-bottom: 20px;
  width: 325px;
  position: relative;
}

#form .input_wrap:last-child {
  margin-bottom: 0;
}

#form .input_wrap label {
  display: block;
  margin-bottom: 5px;
}

#form .input_wrap input {
  padding: 10px;
  width: 100%;
  border: 1px solid lightgrey;
  font-size: 16px;
  border-radius: 3px;
}

#form .input_wrap .input {
  background: #e5e5e5;
  padding-right: 35px;
  border-style: solid;
  border-width: 4px;
  border-color: #000;
}

#form .input_wrap .input_field {
  position: relative;
}

#age {
  background: #e5e5e5;
  padding: 10px;
  width: 100%;
  border: 4px solid;
  font-size: 16px;
  border-radius: 3px;
}

.signUp {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("../assets/background.jpg");
    background-size: cover;
    height: 100vh;
    opacity: 0.25;
  }
}
</style>
