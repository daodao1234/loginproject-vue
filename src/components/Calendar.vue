<template>
  <el-calendar v-model="calendarValue"></el-calendar>
</template>

<script>
export default {
  data() {
    return {
      calendarValue: new Date()
    };
  }
};
</script>