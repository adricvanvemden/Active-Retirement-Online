<template>
  <div class="signIn">
    <div id="logo">
      <img
        src="../assets/active-retirement-connect.png"
        alt="Logo"
        width="400px;"
        height="120px;"
      />
    </div>
    <div
      v-if="validationErrors.length"
      class="error"
    >
      <b-btn variant="primary" @click="resetError()" class="delete">Close</b-btn>
      <div id="errors">
        Please check your inputs. The following problems were found:
        <ul id="errorMessages">
          <li
            v-for="(error, index) in validationErrors"
            :key="`error-${index}`"
            v-html="error"
          />
        </ul>
      </div>
    </div>
    <div id="form">
      <form method="post">
        <div class="input_wrap">
          <div class="input_field">
            <input
              type="email"
              class="input"
              id="input_text"
              placeholder="email or phone number"
              v-model="loginData.email"
            />
          </div>
        </div>
        <div class="input_wrap">
          <div class="input_field">
            <input
              type="password"
              class="input"
              id="input_password"
              placeholder="password"
              v-model="loginData.password"
            />
          </div>
        </div>
      </form>
      <br />
      <br />
      <b-btn variant="primary" type="submit" @click="validate"
        >SIGN IN</b-btn
      >
      <div id="googleFacebook">
        <img
          src="../assets/google-facebook.png"
          alt="Buttons"
        />
      </div>
      <p id="p1">Don't have an account, yet?</p>
      <br />
      <b-btn variant="primary" type="submit" @click="buttonClicked">SIGN UP</b-btn>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default {
  data () {
    return {
      loginData: {
        email: null,
        password: null,
        phone: null
      },
      validationErrors: []
    }
  },
  mounted () {},
  methods: {
    signInWithEmail () {
      signInWithEmailAndPassword(
        auth,
        this.loginData.email,
        this.loginData.password
      )
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          router.push('/dashboard')
        })
        .catch((error) => {
          const errorCode = error.code
          console.log(errorCode)
          const errorMessage = error.message
          console.log(errorMessage)
          this.validationErrors.push('<strong>Email</strong> or <strong>password</strong> is invalid.')
        })
    },
    async signInWithPhoneNumber () {
      const q = query(collection(db, 'users'), where('phoneNumber', '==', this.loginData.phone))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.loginData.email = doc.data().eMail
      })
    },
    buttonClicked () {
      router.push('/registration')
    },
    resetError () {
      this.validationErrors = []
    },

    validate () {
      this.resetError()

      if (!this.loginData.email) {
        this.validationErrors.push(
          "<strong>Email</strong> can't be empty."
        )
      }
      if (/.+@.+/.test(this.loginData.email) !== true) {
        this.validationErrors.push('<strong>Email</strong> must be valid.')
      }
      if (!this.loginData.password) {
        this.validationErrors.push(
          "<strong>Password</strong> can't be empty."
        )
      }
      if (this.validationErrors.length <= 0) {
        if (/.+@.+/.test(this.loginData.email)) {
          this.signInWithEmail()
        } else {
          this.signInWithPhoneNumber()
        }
      }
    }
  }
}
</script>

<style lang="scss">
#logo {
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
}

.error {
  position: relative;
  background-color: beige;
  width: 700px;
  text-align: center;
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid #cc6363;
  border-radius: 3px;
}

#errors {
  margin-top: 15px;
}

#errorMessages {
  color: #e80000;
}

#form {
  position: relative;
  width: 400px;
  padding: 40px 40px;
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
  font-size: 16px;
  border-radius: 3px;
}

#form .input_wrap .input {
  background: #d9edf6;
  padding-right: 35px;
  border-style: solid;
  border-width: 4px;
  border-color: #000;
}

#form .input_wrap .input_field {
  position: relative;
}

#googleFacebook {
  position: relative;
  margin-top: 40px;
  text-align: center;
}

#p1 {
  position: relative;
  padding-top: 50px;
  font-weight: normal;
  font-size: 20px;
}

.signIn {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("../assets/background.jpg");
    background-size: cover;
    height: 150%;
    opacity: 0.25;
  }
}
</style>
