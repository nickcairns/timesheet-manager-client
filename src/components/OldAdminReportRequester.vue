<template>
    <h2>Generate Report</h2>
    <form @submit.prevent="submitForm">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="dateRange.startDate" required />

        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="dateRange.endDate" required />

        <label for="userSearch">Search Users:</label>
        <input type="text" id="userSearch" v-model="userSearch" />
        <div class="autocomplete">
            <div class="autocomplete-item" v-for="user in matchingUsers" :key="user.id" @click="addUserToSearch(user)">
                {{ user.firstName }} {{ user.lastName }}
            </div>
        </div>
        <div class="selected-users">
            <div class="selected-user" v-for="user in searchUsers" :key="user.id">
                {{ user.firstName }} {{ user.lastName }} (ID: {{ user.id }})
                <button @click="removeUser(user)">Remove</button>
            </div>
        </div>
        
        <button type="submit">Generate Report</button>
    </form>
</template>

<script>
import UserDataService from '@/services/UserDataService';
import { ref, reactive, computed, watch } from 'vue';

export default {
    setup() {
        const dateRange = reactive({ startDate: '', endDate: '' });
        const userSearch = ref('');
        const searchUsers = ref([]);
        const matchingUsers = ref([]);

        watch(userSearch, async (newVal) => {
            await findUsers(newVal);
        });

        const findUsers = async (searchTerm) => {
            if (searchTerm.length >= 3) {
                console.log('Searching for users with first name:', searchTerm)
                try {
                    const response = await UserDataService.findByFirstName(searchTerm);
                    //console.log('Response:', response);
                    matchingUsers.value = response.data;
                } catch (error) {
                    console.error('An error occurred:', error.message);
                }
            } else {
                matchingUsers.value = [];
            }
        }

        const addUserToSearch = (user) => {
            if (!searchUsers.value.some(u => u.id === user.id)) {
                searchUsers.value.push(user);
                // Remove the selected user from matchingUsers
                matchingUsers.value = matchingUsers.value.filter(u => u.id !== user.id);
            }
            userSearch.value = '';
        }

        const removeUser = (user) => {
            searchUsers.value = searchUsers.value.filter(u => u.id !== user.id);
        }

        const submitForm = () => {
            // you can now use the array of selected users (searchUsers.value)
            // for example, you can map it to an array of user IDs:
            const userIds = searchUsers.value.map(user => user.id);
            // then use this userIds array in your search query
        }

        return { dateRange, userSearch, matchingUsers, searchUsers, addUserToSearch, removeUser, submitForm };
    },
};
</script>

<style scoped>
.autocomplete {
    position: relative;
    width: 100%;
}

.autocomplete-item {
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    cursor: pointer;
}

.selected-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
}
</style>
