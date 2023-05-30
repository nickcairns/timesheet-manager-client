<template>
    <div class="reports">
      <h2>This is a page to view reports of work hours submitted.</h2>
      <ReportRequester/>
    </div>
</template>

<script>
import ReportRequester from "@/components/ReportRequester.vue"
export default {
    name: "ReportsView",
    components: {
        ReportRequester,
    }
}
</script>
  