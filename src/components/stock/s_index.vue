<template>
  <div>
    <Tabs value="name1">
      <TabPane label="大库" name="name1"><bigS/></TabPane>
      <TabPane label="小库" name="name2"><smallS/></TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import bigS from './s_big.vue';
  import smallS from './s_small.vue';

  export default {
    name: 's_index',
    components: { bigS, smallS },
    data () {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  };
</script>

<style scoped>
</style>
