<template>
    <div class="logout" v-if="isNotGuest">
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/pinia'
import { computed } from 'vue'

export default {
    name: "Logout",
    methods: {
        logout() {
            const store = useAuthStore()
            store.setAuthToken(null)
            store.setUserId(null)
            store.setRole('GUEST')
            this.$router.push({ name: "home" })
        }
    },
    setup() {
        const store = useAuthStore()
        const isNotGuest = computed(() => {
            return store.role !== "GUEST";
        });
        return {
            isNotGuest,
        }
    }
}
</script>