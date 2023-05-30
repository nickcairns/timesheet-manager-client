<template>
  <div style="display: flex; justify-content: center;">
    <form @submit.prevent="login">
      <div style="display: flex; flex-direction: column; margin-bottom: 10px; width: 250px;">
        <label for="username">Email:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div style="display: flex; flex-direction: column; margin-bottom: 10px; width: 250px;">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

// Login.vue

<script>
import { useAuthStore } from '@/store/pinia'
import axios from 'axios'
import { http } from "@/http-common"
import { setUserRoleFromToken } from '../services/AuthStoreService'

export default {
  data() {
    return {
      username: '',
      password: '',
      authToken: '',
      //error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await http.post('/auth/authenticate', {
          email: this.username,
          password: this.password,
        });

        // handle login success
        //console.log(response.data)
        const store = useAuthStore()
        store.setAuthToken(response.data.token)
        store.setRole(response.data.role)
        store.setUserId(response.data.userId)

        //setUserRoleFromToken(this.authToken).then(() => {
        //  this.$router.push("/input")
        //})

        // Redirect the user to the input page
        this.$router.push('/input')
        
      } catch (error) {
        // handle login error
        alert("Please check your credentials and try again.")
        console.log(error)
      }
    },
  },
};
</script>
