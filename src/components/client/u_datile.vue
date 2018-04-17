<template>
  <div>
    <h3>用户信息</h3>
    <br/>
    <div>用户名：{{user.realName}}，年龄：{{user.age}}，电话：{{user.phoneNumber}}，身份证：{{user.idCardNumber}}，等级：{{user.level}}</div>
    <br/>
    <Tabs value="name1">
      <TabPane label="服务记录" name="name1"><serviceList/></TabPane>
      <TabPane label="消费记录(现金)" name="name2"><shopList/></TabPane>
      <TabPane label="指定技师" name="name6"><technicianList/></TabPane>
      <TabPane label="问题分析" name="name3"><questionList/></TabPane>
      <TabPane label="现有卡情况" name="name4"><cardList/></TabPane>
      <TabPane label="计划图" name="name5"><uplan/></TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import serviceList from './u_serviceList.vue';
  import shopList from './u_shopList.vue';
  import questionList from './u_questionList.vue';
  import cardList from './u_cardList.vue';
  import uplan from './u_plan.vue';
  import technicianList from './u_technician.vue';
  import { ser_findById } from '../../interface';

  export default {
    name: 'u_datile',
    components: { serviceList, shopList, questionList, cardList, uplan,technicianList},
    created() {
      this.userID = this.$route.params.u_id;
      this.getList(this.userID);
    },
    data(){
      return {
        user: '',
      };
    },
    methods: {
      getList(uid) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_findById() + '?id=' + uid,
        }).then((res) => {
          this.user = res.data;
        }).catch((error) => {
        });
      },
    },
  };
</script>

<style scoped>
</style>
