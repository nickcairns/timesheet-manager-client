<template>
  <div class="users">
    <h2>This is a page showing all the users.</h2>
    <UserList/>
    <AddUser/>
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue"
import AddUser from "@/components/AddUser.vue";

export default {
  components: {
    UserList,
    AddUser
}
}

</script>
