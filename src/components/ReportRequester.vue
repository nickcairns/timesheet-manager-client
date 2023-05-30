<template>
      <h2>Generate Report</h2>
      <form @submit.prevent="submitForm">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="dateRange.startDate" required />
  
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="dateRange.endDate" required />
  
        <button type="submit">Generate Report</button>
      </form>
      <div v-if="submitted">
        <button @click="toggleSortOrder">Toggle Sort Order</button>
        <p>Hours worked for period: {{ totalHours }}</p>
        <div class="table-container">
          <table>
            <thead>
              <tr v-if="timeRecords.length === 0">
                <th colspan="3">No records found</th>
              </tr>
              <tr v-else>
                <th class="narrow-column">Date</th>
                <th>Client</th>
                <th class="narrow-column">Start</th>
                <th class="narrow-column">Finish</th>
                <th class="narrow-column">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in sortedRecords" :key="record.id">
                <td>{{ record.date }}</td>
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
</style>

<style scoped>
.narrow-column {
  width: 75px;
}
</style>


  
  <script>
  import { ref, reactive, computed } from 'vue';
  import RecordsDataService from '@/services/RecordsDataService';
  import { useAuthStore } from '@/store/pinia';
  
  export default {
    setup() {
      const authStore = useAuthStore();
      const dateRange = reactive({ startDate: '', endDate: '' });
      const timeRecords = ref([]);
      const submitted = ref(false);
      const sortOrder = ref(true); //true = ascending, false = descending
  
      async function submitForm() {
        try {
          const response = await RecordsDataService.getMatchingDatesAndUser(
            dateRange.startDate,
            dateRange.endDate,
            authStore.getUserId
          );
          timeRecords.value = response.data;
          submitted.value = true;
        } catch (error) {
          console.error('An error occurred:', error.message);
        }
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

      const totalHours = computed(() => {
        if (Array.isArray(timeRecords.value)) {
          return timeRecords.value.reduce((sum, record) => sum + record.duration, 0).toFixed(2);
        } else {
          return 0;
        }
      });
  
      return { dateRange, submitForm, timeRecords, submitted, toggleSortOrder, sortedRecords, formatTime, totalHours };
    },
  };
  </script>
  