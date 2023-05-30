<template>
  <div class="home">
    <h2>This is the landing page.</h2>
  </div>
  <div class="login">
    <h3>Please login to continue.</h3>
    <Login/>
  </div>
</template>

<script>
import Login from "@/components/Login.vue"

export default {
  components: {
    Login
}
}

</script>

