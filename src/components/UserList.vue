<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by first name"
            v-model="firstName"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchFirstName">
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>User List</h4>
        <ul class="list-group">
            <li class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(user, index) in users"
                :key="index"
                @click="setActiveUser(user, index)"
            >
                {{ user.firstName }} {{ user.lastName }}
            </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentUser">
          <h4>User</h4>
          <div>
            <label><strong>Name:</strong></label> {{ currentUser.name }}
          </div>
          <div>
            <label><strong>Email:</strong></label> {{ currentUser.email }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentUser.active ? "Active" : "Inactive" }}
          </div>
  
          <router-link :to="'/users/' + currentUser.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a user...</p>
        </div>
      </div>
    </div>
</template>
  
  <script>
  import UserDataService from '@/services/UserDataService';
  
  export default {
    name: "UserList",
    data() {
      return {
        users: [],
        currentUser: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveUsers() {
        UserDataService.getAll()
          .then(response => {
            this.users = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveUsers();
        this.currentUser = null;
        this.currentIndex = -1;
      },
  
      setActiveUser(user, index) {
        this.currentUser = user;
        this.currentIndex = user ? index : -1;
      },
      
      searchFirstName() {
        UserDataService.findByFirstName(this.firstName)
          .then(response => {
            this.users = response.data;
            this.setActiveUser(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveUsers();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>