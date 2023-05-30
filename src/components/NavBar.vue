<template>
    <nav v-if="isAdmin">
        <!-- <router-link to="/">Home</router-link> | -->
        <router-link to="/users">Users</router-link> |
        <router-link to="/input">Input Hours</router-link> |
        <router-link to="/adminreports">Admin Reports</router-link>
    </nav>
    <nav v-if="isUser">
        <!-- <router-link to="/">Home</router-link> | -->
        <router-link to="/input">Input Hours</router-link> |
        <router-link to="/reports">Reports</router-link>
    </nav>
    <router-view />
</template>

<script>
import { useAuthStore } from "@/store/pinia";
import { computed } from "vue";

export default {
    name: "NavBar",

    setup() {
        const store = useAuthStore()

        const isAdmin = computed(() => {
            return store.role === "ADMIN";
        });

        const isUser = computed(() => {
            return store.role === "USER";
        });

        return {
            isAdmin,
            isUser,
        }
    }
    
}
</script>

