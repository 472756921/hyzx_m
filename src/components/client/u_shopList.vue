<template>
  <div>
    <Table :columns="shop" :data="shopData" :row-class-name="rowClassName"></Table>
    <Page :current="2" :total="50" simple class="center"></Page>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ser_Bill } from '../../interface';

  export default {
    name: 'u_shopList',
    data(){
      return {
        shop: [
          {key: 'billTime', title: '日期'},
          {key: 'zfmoney', title: '金额'},
          {key: 'billType', title: '行为', render:(h, p)=>{if(p.row.billType == 0){return '充值'}else if(p.row.billType == 2 ){return '购买产品'} else if(p.row.billType == 1 ) {return '退款'}}},
          {key: 'p_name', title: '产品'},
        ],
        shopData: [],
      }
    },
    created(){
      this.userID = this.$route.params.u_id;
      this.getList(1,  this.userID);
    },
    methods: {
      rowClassName(r) {
        if(r.status == 0){
          return 'redBack';
        }
      },
      getList(page, uid) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_Bill() + '?id=' + uid + '&paymentMethod=1&page='+page+"&pageSize=50" ,
        }).then((res) => {
          this.shopData = res.data.results;
        }).catch((error) => {
        });
      },
    },
  };
</script>

<style>
  .ivu-table .redBack td{
    background-color: #fff4f3;
  }
  .center{
    margin: 10px auto;
    text-align: center;
  }
</style>
