<template>
  <div id="nav">
    <div id="left-side">
      <router-link to="/dashboard" v-show="!isAdmin">Calendar</router-link>
      <router-link to="/users" v-show="isAdmin">Users</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/games" v-show="!isAdmin">Games</router-link>
    </div>
    <img
      class="logo"
      src="../assets/active-retirement-connect.png"
      @click="onImg()"
    />
    <div id="right-side">
      <input placeholder="Search" class="searchbar" />
      <router-link to="/myAccount">My Account</router-link>
      <a @click="signOutFromApp()" exact>SIGN OUT</a>
    </div>
  </div>
</template>
<script>
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
export default {
  name: 'Nav',
  computed: {
    isAdmin () {
      return this.$store.state.user.userRole === 'admin'
    }
  },
  methods: {
    onImg () {
      if (this.isAdmin && this.$route.path !== '/users') {
        this.$router.push('/users')
      } else if (!this.isAdmin && this.$route.path !== '/dashboard') {
        this.$router.push('/dashboard')
      }
    },

    async signOutFromApp () {
      this.$root.hideToast('upcomingEvent')
      await signOut(auth)
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
#nav {
  display: flex;
  justify-content: space-between;

  #left-side,
  #right-side {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f3f4f5;
    border-bottom: 1px solid gray;
    height: 75px;
    font-size: 24px;

    a {
      color: black;
      padding: 0px 10px 0px 10px;
      align-self: center;
      text-decoration: none;
      &.router-link-active {
        background-color: #a01d24;
        color: white;
      }
      &:hover {
        background-color: #a01d24;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}

.logo {
  width: 400px;
  height: 100px;
}

.searchbar {
  height: 40px;
}
</style>
