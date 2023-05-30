<template>
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div style="display: flex; flex-direction: column; margin-bottom: 10px; width: 250px;">
          <label for="date">Date:</label>
          <div class="date-input-container">
            <input id="date" v-model="timeRecord.date" type="date" required />
            <div class="date-input-buttons">
              <button type="button" @click="decrementDate()">Day-</button>
              <button type="button" @click="incrementDate()">Day+</button>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: row; margin-left: 10%; justify-content: space-evenly; margin-bottom: 10px; width: 80%;">
          <label for="startTime">Start Time:</label>
          <input class="timebox" id="startTime" v-model="timeRecord.startTime" type="time" required />
        </div>
        <div style="display: flex; flex-direction: row; margin-left: 10%; justify-content: space-evenly; margin-bottom: 10px; width: 80%;">
          <label for="endTime" style="width: 77.6667px;">End Time:</label>
          <input class="timebox" id="endTime" v-model="timeRecord.endTime" type="time" required />
        </div>
        <div style="display: flex; flex-direction: column; margin-bottom: 10px; width: 250px;">
          <label for="client">Client:</label>
          <input id="client" v-model="timeRecord.client" type="text" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <!-- Add a section that shows TimeRecords submitted in the current session -->
    <div class="submitted-records" v-if="submittedRecords.length > 0">
      <h3>Records just submitted:</h3>
        <div v-for="(record, index) in submittedRecords" :key="index">
        {{ record.date }} // {{ record.startTime }} - {{ record.endTime }} // Job: {{ record.client }}
        </div>
    </div>
  </template>
  
<script>
import { ref, reactive } from "vue";
import { setAuthTokenHeader } from "@/http-common";
import RecordsDataService from "../services/RecordsDataService";
import { useAuthStore } from "@/store/pinia";

export default {
  setup() {
    const authStore = useAuthStore();
    const authToken = authStore.getAuthToken;
    const userId = authStore.getUserId;
    const submittedRecords = reactive([]);
    console.log("Auth Token:", authToken);
    setAuthTokenHeader(authToken);
    console.log("User ID:", userId)
    const timeRecord = ref(createNewTimeRecord());

    function createNewTimeRecord() {
      return {
        date: new Date().toISOString().substr(0, 10),
        startTime: "",
        endTime: "",
        client: "",
        userId: userId
      };
    }

    async function submitForm() {
      try {
        await RecordsDataService.create(timeRecord.value);
        console.log("Time record submitted successfully");
        submittedRecords.push(JSON.parse(JSON.stringify(timeRecord.value)));
        //timeRecord.value = createNewTimeRecord();
      } catch (error) {
        //console.log("Authstore Auth Token: " + authToken);
        alert("An error occurred: " + error.message);
      }
    }

    function incrementDate() {
      const date = new Date(timeRecord.value.date);
      date.setDate(date.getDate() + 1);
      timeRecord.value.date = date.toISOString().substr(0, 10);
    }

    function decrementDate() {
      const date = new Date(timeRecord.value.date);
      date.setDate(date.getDate() - 1);
      timeRecord.value.date = date.toISOString().substr(0, 10);
    }

    return {
      timeRecord,
      submitForm,
      incrementDate,
      decrementDate,
      submittedRecords,
    };
  },
};
</script>

  
<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
  }


  .submitted-records {
  /* margin-top: 20px;
  width: 50%; */
  display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
  