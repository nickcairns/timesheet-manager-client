<template>
  <h2>Mizen Landscapes Timesheet Manager</h2>
  <Logout/>
  <NavBar/>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import Logout from "./components/Logout.vue"
//(probably not needed) import { authStore } from "./store/pinia" 

export default {
  name: "App",
  components: {
    Logout,
    NavBar,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>