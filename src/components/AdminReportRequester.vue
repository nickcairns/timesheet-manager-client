<template>
    <h2>Generate Report</h2>
    <form @submit.prevent="submitForm">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="dateRange.startDate" required />

        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="dateRange.endDate" required />

        <label for="client">Filter By Client:</label>
        <input type="text" id="client" v-model="client">

        <label for="userSearch">Filter By Users:</label>
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
    <div v-if="submitted">
        <button @click="toggleSortOrder">Toggle Sort Order</button>
        <div class="table-container">
          <table>
            <thead>
              <tr v-if="timeRecords.length === 0">
                <th colspan="4">No records found</th>
              </tr>
              <tr v-else>
                <th class="narrow-column">Date</th>
                <th calss="user-column">User</th>
                <th>Client</th>
                <th class="narrow-column">Start</th>
                <th class="narrow-column">Finish</th>
                <th class="narrow-column">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in sortedRecords" :key="record.id">
                <td>{{ record.date }}</td>
                <td class="user-column">{{ record.user }}</td>
                <td>{{ record.client }}</td>
                <td>{{ formatTime(record.startTime) }}</td>
                <td>{{ formatTime(record.endTime) }}</td>
                <td>{{ record.duration }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import RecordsDataService from '@/services/RecordsDataService';
import UserDataService from '@/services/UserDataService';
import { ref, reactive, computed, watch, onMounted } from 'vue';

export default {
    setup() {
        const dateRange = reactive({ startDate: '', endDate: '' });
        const userSearch = ref('');
        const searchUsers = ref([]);
        const matchingUsers = ref([]);
        const allUsers = ref([]);
        const timeRecords = ref([]);
        const submitted = ref(false);
        const sortOrder = ref(true);

        const fetchAllUsers = async () => {
            try {
                const response = await UserDataService.getAll();
                allUsers.value = response.data;
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        };

        onMounted(fetchAllUsers);

        watch(userSearch, (newVal) => {
            findUsers(newVal);
        });

        const findUsers = (searchTerm) => {
            if (searchTerm.length >= 1) {
                console.log('Searching for users with first name:', searchTerm)
                matchingUsers.value = allUsers.value.filter(user => 
                    user.firstName.toLowerCase().startsWith(searchTerm.toLowerCase())
                );
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

        function toggleSortOrder() {
        sortOrder.value = !sortOrder.value;
      }

      const sortedRecords = computed(() => {
        if (Array.isArray(timeRecords.value)) {
          return timeRecords.value.slice().sort((a, b) => {
            if(sortOrder.value) {
              return new Date(a.date) - new Date(b.date);
            } else {
              return new Date(b.date) - new Date(a.date);
            }
          });
        } else {
          return [];
        }
      });

      function formatTime(timeString) {
        const timeParts = timeString.split(':');
        const hours = timeParts[0];
        const minutes = timeParts[1];
        return `${hours}:${minutes}`;
      }

      const submitForm = async () => {
        if (searchUsers.value.length === 0) {
          try {
            const response = await RecordsDataService.getMatchingDates(dateRange.startDate, dateRange.endDate);
            console.log('API Response:', response);
            timeRecords.value = response.data;
            submitted.value = true;
            console.log('sortedRecordds value:', sortedRecords.value);
          } catch (error) {
            console.error('An error occurred:', error.message);
          }
        } else {
          const userIds = searchUsers.value.map(user => user.id);
          const userIdsString = userIds.join(',');

          try {
            const response = await RecordsDataService.getMatchingDatesAndMultipleUsers(dateRange.startDate, dateRange.endDate, userIdsString);
            console.log('API Response:', response);
            timeRecords.value = response.data;
            submitted.value = true;
            console.log('sortedRecordds value:', sortedRecords.value);
          } catch (error) {
            console.error('An error occurred:', error.message);
          }
        }
      }

        return { dateRange, userSearch, matchingUsers, searchUsers, addUserToSearch, removeUser, submitForm, toggleSortOrder, sortedRecords, formatTime, submitted, timeRecords };
    },
};
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  width: 30%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #bababa;
}

.selected-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    white-space: nowrap;
    width: auto;
}

.user-column {
    min-width: 150px;
}

.narrow-column {
  width: 75px;
}

.autocomplete-item {
    padding: 10px;
    background-color: white;
    border: 2px solid #ccc;
    cursor: pointer;
    margin: 2px 0;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

</style>
