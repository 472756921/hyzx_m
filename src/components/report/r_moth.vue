<template>
  <div>
    <DatePicker :value="date" @on-change="(date) => this.date = date" format="yyyy-MM" type="month" placeholder="选择日期"></DatePicker>
    <Button class="hy_btn" @click="serch">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findMonthDetails } from '../../interface';

  export default {
    name: 'r_moth',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['cashPerformance', 'shopPassenger', 'fullShopPractice', 'fullStoreNumber', 'highEndProject', 'buckleProject', 'product', 'recordTheStoreManager', 'remarks']
      }
    },
    mounted () {
      this.getData();
    },
    methods: {
      serch() {
        if(this.date == '') {
          this.$Message.warning('请选择查询日期');
          return false
        } else {
          this.getData(this.date);
        }
      },
      getDate(date) {
        this.date = date;
      },
      getTable2Columns () {
        const table2ColumnList = {
          cashPerformance: {
            title: '全店业绩',
            key: 'cashPerformance',
          },
          shopPassenger: {
            title: '客流',
            key: 'shopPassenger',
          },
          fullShopPractice: {
            title: '全店实操',
            key: 'fullShopPractice',
          },
          fullStoreNumber: {
            title: '全店到店人数',
            key: 'fullStoreNumber',
          },
          highEndProject: {
            title: '高端项目',
            key: 'highEndProject',
          },
          buckleProject: {
            title: '卡扣项目',
            key: 'buckleProject',
          },
          product: {
            title: '卡扣产品',
            key: 'product',
          },
          recordTheStoreManager: {
            title: '是否记录店长个人业绩',
            key: 'recordTheStoreManager',
          },
          remarks: {
            title: '备注',
            key: 'remarks',
          },
        };
        let data = [];
        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));
        return data;
      },
      getData (date = new Date().Format('yyyy-MM')) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findMonthDetails() + '?date=' + date,
        }).then((res) => {
          this.tableColumnsChecked = res.data.title;
          this.tableColumns2 = this.getTable2Columns();
          this.tableData2 = res.data.data;
        }).catch((error) => {
        });
      },
    }
  };
</script>

<style scoped>
  .center{
    margin-top: 10px;
    text-align: center;
  }
</style>
