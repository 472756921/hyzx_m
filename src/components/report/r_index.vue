<template>
  <div>

    <Tabs value="name1">
      <TabPane label="店日报" name="name1"><r_day/></TabPane>
      <TabPane label="店月报" name="name2"><r_moth/></TabPane>
      <TabPane label="顾问报表" name="name3"><r_employee/></TabPane>
      <TabPane label="考勤表" name="name6"><r_attendance/></TabPane>
    </Tabs>

  </div>
</template>

<script type="text/ecmascript-6">
  import r_day from './r_day.vue';
  import r_moth from './r_moth.vue';
  import r_employee from './r_employee.vue';
  import r_attendance from './r_attendance.vue';

  export default {
    name: 'r_index',
    components: { r_day, r_moth, r_employee, r_attendance },

  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .title{
    font-size: 18px;
    margin: 14px 0;
    color: #66368C;
  }
</style>
