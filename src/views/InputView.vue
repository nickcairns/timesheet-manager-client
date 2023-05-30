<template>
    <div>
        <h2>Record your hours</h2>
        <RecordHours/>
    </div>
</template>

<script>
import RecordHours from "@/components/RecordHours.vue"
export default {
    name: "InputView",
    components: {
        RecordHours
    }
}
</script>