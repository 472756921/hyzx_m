<template>
    <div>
      <Tabs>
        <TabPane label="个人信息" icon="person">
          <b_info></b_info>
        </TabPane>
      </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import b_info from './b_info.vue';

  export default {
    name: 'b_index',
    components: {b_info},
  };
</script>

<style scoped>

</style>
