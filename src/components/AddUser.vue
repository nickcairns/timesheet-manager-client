<template>
    <div>
        <input type="text" placeholder="First name" v-model="user.firstName">
        <input type="text" placeholder="Last name" v-model="user.lastName">
        <input type="text" placeholder="Email" v-model="user.email">
        <button type="button" @click="addUser()">
            Add user
        </button>
    </div>
</template>


<script>
    import UserDataService from "../services/UserDataService";
    import { ref } from "vue";

    export default {
        setup() {
            const user = ref({
                firstName: "",
                lastName: "",
                email: "",
            });
            
            async function addUser() {
                try {
                    await UserDataService.create(user.value);
                    console.log("User added successfully");
                } catch (error) {
                    console.error("An error occurred:", error.message);
                }
            }
           
            

            return {
                user,
                addUser
            };
        },
    };
</script>