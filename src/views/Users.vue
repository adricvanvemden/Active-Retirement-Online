<template>
  <div id="user-table">
    <b-table
      hover
      :items="users"
      :fields="fields"
      class="align-left"
      @row-clicked="onRow"
      :current-page="currentPage"
      :per-page="perPage"
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      size="m"
    ></b-pagination>
  </div>
</template>

<script>
import { db } from '../firebase'
import { getDocs, query, collection } from 'firebase/firestore'
export default {
  name: 'Users',

  data () {
    return {
      fields: [
        'role',
        'firstName',
        'lastName',
        'emailAdress',
        'age',
        'phoneNumber',
        'community'
      ],
      users: [],
      currentPage: 1,
      perPage: 25,
      totalRows: 1
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    onRow (record) {
      this.$router.push(`/users/${record.id}`)
    },
    async getAllUsers () {
      const q = query(collection(db, 'users'))
      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          this.user = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            emailAdress: doc.data().eMail,
            age: doc.data().ageGroup,
            phoneNumber: doc.data().phoneNumber,
            community: doc.data().community,
            role: doc.data().userRole
          }
          this.users.push(this.user)
        })
        this.totalRows = this.users.length
      } catch {
        this.$root.makeToast(
          'error',
          'danger',
          'Something went wrong!',
          'Could not retrieve all users, if the problem keeps happening contact an admin',
          false,
          5000
        )
      }
    }
  }
}
</script>
<style lang="scss">
#user-table {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
}
thead {
  text-align: left;
}
tbody {
  text-align: left;
  tr:nth-child(odd) {
    background-color: lighten(#204293, 60%);
  }
  tr:hover {
    cursor: pointer;
  }
}
</style>
