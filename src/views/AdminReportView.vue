<template>
    <div class="reports">
      <AdminReportRequester/>
    </div>
</template>

<script>
import AdminReportRequester from "@/components/AdminReportRequester.vue"
export default {
    name: "AdminReportsView",
    components: {
        AdminReportRequester,
    }
}
</script>