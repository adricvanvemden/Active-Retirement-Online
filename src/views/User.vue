<template>
  <div>
    <b-btn
      variant="primary"
      @click="$router.go(-1)"
      class="ml-5 d-flex"
      squared
    >
      BACK
    </b-btn>
    <div class="d-flex mt-5">
      <div class="grid-user-left">
        <label for="firstName">First name:</label>
        <input
          id="firstName"
          :placeholder="user.firstName"
          :disabled="disabled"
          v-model="updateUser.firstName"
        />

        <label for="lastName">Last name:</label>
        <input
          id="lastName"
          :placeholder="user.lastName"
          :disabled="disabled"
          v-model="updateUser.lastName"
        />

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          :placeholder="user.eMail"
          :disabled="disabled"
          v-model="updateUser.email"
        />

        <label for="age">Age:</label>
        <b-form-select
          id="age"
          class="h-100"
          v-model="updateUser.age"
          :options="ageOptions"
          :disabled="disabled"
        ></b-form-select>

        <label for="hobbies">Hobbies:</label>
        <input
          id="hobbies"
          :placeholder="user.hobbies"
          :disabled="disabled"
          v-model="updateUser.hobbies"
        />
      </div>

      <div class="grid-user-right">
        <label for="adress">Address:</label>
        <input
          id="adress"
          :placeholder="user.address"
          :disabled="disabled"
          v-model="updateUser.address"
        />

        <label for="phone">Phone:</label>
        <input
          id="phone"
          :placeholder="user.phoneNumber"
          :disabled="disabled"
          v-model="updateUser.phone"
        />

        <label for="community">Community:</label>
        <b-form-select
          id="community"
          :disabled="disabledCommunity"
          v-model="updateUser.community"
          class="h-100"
          :options="communityOptions"
        ></b-form-select>
      </div>
    </div>
    <b-btn
      v-if="disabled"
      size="lg"
      variant="primary"
      @click="onChange()"
      class="ml-5 d-flex mt-5"
      squared
    >
      Change Information
    </b-btn>
    <div class="d-flex mt-5">
      <b-btn
        v-if="!disabled"
        size="lg"
        variant="danger"
        @click="onCancel()"
        class="ml-5 d-flex"
        squared
      >
        Cancel
      </b-btn>

      <b-btn
        v-if="!disabled"
        size="lg"
        variant="primary"
        @click="onSave()"
        class="ml-5 d-flex"
        squared
      >
        Save Changes
      </b-btn>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import { getDoc, doc, updateDoc, getDocs, collection } from 'firebase/firestore'
export default {
  name: 'User',

  data () {
    return {
      userId: '',
      user: '',
      disabled: true,
      disabledCommunity: true,
      updateUser: {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        hobbies: '',
        address: '',
        phone: '',
        community: ''
      },
      ageOptions: [
        { value: '60+', text: '60+' },
        { value: '70+', text: '70+' },
        { value: '80+', text: '80+' }
      ],
      communityOptions: []
    }
  },
  beforeMount () {
    if (this.isAdmin) {
      this.userId = this.$route.path.slice(5)
    } else {
      this.userId = this.$store.state.user.id
    }
    this.getUserInformation(this.userId)
    this.getAllCommunities()
  },

  computed: {
    isAdmin () {
      return this.$store.state.user.userRole === 'admin'
    }
  },

  methods: {
    onChange () {
      this.disabled = false
      if (this.isAdmin) {
        this.disabledCommunity = false
      } else {
        this.disabledCommunity = true
      }
      this.updateUser = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.eMail,
        age: this.user.ageGroup,
        hobbies: this.user.hobbies,
        address: this.user.address,
        phone: this.user.phoneNumber,
        community: this.user.community
      }
    },

    onCancel () {
      this.disabled = true
      this.disabledCommunity = true
      this.updateUser = {
        firstName: '',
        lastName: '',
        email: '',
        age: this.user.ageGroup,
        hobbies: '',
        address: '',
        phone: '',
        community: this.user.community
      }
    },

    onSave () {
      this.disabled = true
      this.disabledCommunity = true
      this.editUserInformation(this.userId)
    },

    async getUserInformation (userId) {
      const docRef = doc(db, 'users', userId)
      try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          this.user = docSnap.data()
          this.updateUser.age = this.user.ageGroup
          this.updateUser.community = this.user.community
        } else {
        }
      } catch {
        this.$root.makeToast(
          'error',
          'danger',
          'Something went wrong!',
          'Try again, if the problem keeps happening contact an admin',
          false,
          5000
        )
      }
    },
    async editUserInformation (userId) {
      const userRef = doc(db, 'users', userId)
      try {
        await updateDoc(userRef, {
          firstName: this.updateUser.firstName,
          lastName: this.updateUser.lastName,
          eMail: this.updateUser.email,
          phoneNumber: this.updateUser.phone,
          ageGroup: this.updateUser.age,
          address: this.updateUser.address,
          hobbies: this.updateUser.hobbies,
          community: this.updateUser.community
        })

        this.$root.makeToast(
          'success-user',
          'success',
          'Success!',
          'User data is updated',
          false,
          5000
        )
        this.getUserInformation(this.userId)
      } catch {
        this.$root.makeToast(
          'error-user',
          'danger',
          'Something went wrong!',
          'User data might not have been updated. Check and try again, if the problem keeps happening contact an admin',
          false,
          5000
        )
      }
    },

    async getAllCommunities () {
      const querySnapshot = await getDocs(collection(db, 'communities'))
      try {
        querySnapshot.forEach((doc) => {
          this.community = {
            id: doc.id,
            name: doc.data().name,
            address: doc.data().address,
            phoneNumber: doc.data().phoneNumber,
            eMailAddress: doc.data().eMailAddress
          }
          this.communityOptions.push({
            text: this.community.name,
            value: this.community.name
          })
        })
      } catch {
        this.$root.makeToast(
          'error-get-communities',
          'danger',
          'Something went wrong!',
          'Could not retrieve all communties, please try again. If the problem keeps happening contact an admin',
          false,
          5000
        )
      }
    }
  }
}
</script>
<style lang="scss">
.grid-user-left {
  display: grid;
  grid-template-columns: 250px 450px;
  column-gap: 20px;
  row-gap: 10px;
  text-align: right;
  font-size: 28px;
}

.grid-user-right {
  display: grid;
  grid-template-columns: 250px 450px;
  column-gap: 20px;
  row-gap: 10px;
  height: 20px;
  text-align: right;
  font-size: 28px;
}
</style>
