<template>
  <div>
    <DatePicker :value="date" format="yyyy-MM" type="month" placeholder="选择日期" @on-change="getDate"></DatePicker>
    <Button class="hy_btn" @click="getList">查询</Button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { re_mouth } from '../../interface';

  export default {
    name: 'r_moth',
    data () {
      return {
        date: '',
      }
    },
    created() {
    },
    methods: {
      getDate(date) {
        this.date = date;
      },
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: re_mouth() +"?reportTime=" + this.date,
        }).then((res) => {
//          this.questionList = res.data;
        }).catch((error) => {
        });
      }
    }
  };
</script>

<style scoped>
  .center{
    margin-top: 10px;
    text-align: center;
  }
</style>
