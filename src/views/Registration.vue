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
      <br/>
      <br/>
      <b-btn variant="primary" type="submit" @click="validate"
      >SIGN UP
      </b-btn
      >
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import router from '@/router'

export default {
  data () {
    return {
      registerData: {
        firstname: null,
        lastname: null,
        age: null,
        eMail: null,
        phone: null,
        password: null,
        password2: null
      },
      validationErrors: [],
      queriedEmail: ''
    }
  },
  mounted () {
  },
  methods: {
    print () {
      console.log(this.registerData)
    },

    signUp () {
      if (this.registerData.email.length <= 0) {
        const generatedEmail = (Math.random() + 1).toString(36).substring(0) + '@gmail.com'
        createUserWithEmailAndPassword(auth, generatedEmail, this.registerData.password)
          .then((userCredential) => {
            const docRef = setDoc(doc(db, 'users', userCredential.user.uid), {
              firstname: this.registerData.firstname,
              lastname: this.registerData.lastname,
              age: this.registerData.age,
              phone: this.registerData.phone,
              eMail: generatedEmail
            })
            console.log('Registration successful', docRef)
            router.push('/dashboard')
          })
          .catch((error) => {
            const errorCode = error.code
            console.log(errorCode)
            const errorMessage = error.message
            console.log(errorMessage)
            this.validationErrors.push('Inputs invalid.')
          })
      } else {
        createUserWithEmailAndPassword(auth, this.registerData.email, this.registerData.password)
          .then((userCredential) => {
            const docRef = setDoc(doc(db, 'users', userCredential.user.uid), {
              firstname: this.registerData.firstname,
              lastname: this.registerData.lastname,
              age: this.registerData.age,
              phone: this.registerData.phone,
              eMail: this.registerData.email
            })
            console.log('Registration successful', docRef)
            router.push('/dashboard')
          })
          .catch((error) => {
            const errorCode = error.code
            console.log(errorCode)
            const errorMessage = error.message
            console.log(errorMessage)
            this.validationErrors.push('Inputs invalid.')
          })
      }
    },
    resetError () {
      this.validationErrors = []
    },
    validate () {
      this.getUserEmail()
      this.resetError()

      if (this.queriedEmail.length > 0) {
        this.validationErrors.push('<strong>Email</strong> already taken.')
      }
      if (!this.registerData.firstname) {
        this.validationErrors.push('Please fill in your <strong>first name</strong>')
      }
      if (!this.registerData.lastname) {
        this.validationErrors.push('Please fill in your <strong>last name</strong>')
      }
      if (!this.registerData.email && !this.registerData.phone) {
        this.validationErrors.push('Must fill out <strong>email</strong> or <strong>phone number</strong>.')
      }
      if (this.registerData.phone && /^\d+$/.test(this.registerData.phone) !== true) {
        this.validationErrors.push('<strong>Phone number</strong> can only contain numbers.')
      }
      if (this.registerData.email && /.+@.+/.test(this.registerData.email) !== true) {
        this.validationErrors.push('<strong>Email</strong> must be valid.')
      }
      if (!this.registerData.password || !this.registerData.password2) {
        this.validationErrors.push('<strong>Password</strong> can not be empty.')
      }
      if (this.registerData.password && /.{6,}/.test(this.registerData.password) !== true) {
        this.validationErrors.push('<strong>Password</strong> has to have at least 6 characters.')
      }
      if (this.registerData.password !== this.registerData.password2) {
        this.validationErrors.push('The <strong>passwords</strong> have to match.')
      }
      if (this.validationErrors.length <= 0) {
        this.signUp()
      }
    },
    async getUserEmail () {
      const userRef = collection(db, 'users')
      const q = query(userRef, where('eMail', '==', this.registerData.email))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          this.queriedEmail = doc.data().eMail
        }
      })
    }

  }
}
</script>

<style lang="scss">
#logo {
  position: relative;
  margin-top: 30px;
  margin-bottom: 20px;
}

.error {
  position: relative;
  background-color: beige;
  width: 700px;
  text-align: center;
  padding: 15px;
  margin-top: 20px;
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

#age {
  background: #d9edf6;
  padding: 12px;
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
    height: 150%;
    opacity: 0.25;
  }
}
</style>
