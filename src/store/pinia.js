import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    role: 'GUEST',
    authToken: null,
    userId: null
  }),
  actions: {
    setRole(role) {
      this.role = role
    },
    setAuthToken(token) {
      this.authToken = token
    },
    setUserId(userId) {
      this.userId = userId
    }
  },
  getters: {
    getAuthToken: (state) => state.authToken,
    getUserId: (state) => state.userId,
  }
})

console.log('Auth store initialized:', useAuthStore)
