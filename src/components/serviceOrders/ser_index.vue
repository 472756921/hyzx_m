<template>
  <div>
    <Tabs value="name1">
      <TabPane label="服务单" name="name1"><ser_indexForS/></TabPane>
      <TabPane label="现金单" name="name2"><ser_indexForC/></TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import ser_indexForS from './ser_indexForS.vue';
  import ser_indexForC from './ser_indexForC.vue';

  export default {
    name: 'ser_index',
    components: {ser_indexForS, ser_indexForC},
  };
</script>

<style scoped>

</style>
