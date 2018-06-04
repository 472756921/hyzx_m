<template>
  <div style="min-height: 300px">
    <DatePicker :value="date" @on-change="(date) => this.date = date" format="yyyy-MM" type="month" placeholder="选择日期"></DatePicker>
    <Button class="hy_btn" @click="serch">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findGuWenMonthDetails } from '../../interface';

  export default {
    name: 'r_employee',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['preSale', 'aftermarket','beautyCash','beautyPractice','hairdressingCash','hairdressingSnap','yogaCash','yogaSnap','productCash','productSnap','projectCash','projectSnap','passenger','storeNumber','firstStoreNumber','firstTransactionNumber','twoTurnover','totalActualExercise','unitPrice','arrears']
      }
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
      getTable2Columns () {
        const table2ColumnList = {
          name: {
            title: '顾问姓名',
            key: 'name',
          },
          preSale: {
            title: '会员储值-售前',
            key: 'preSale',
          },
          aftermarket: {
            title: '会员储值-售后',
            key: 'aftermarket',
          },
          beautyCash: {
            title: '美容-现金',
            key: 'beautyCash',
          },
          beautyPractice: {
            title: '美容-实操',
            key: 'beautyPractice',
          },
          hairdressingCash: {
            title: '美发-现金',
            key: 'hairdressingCash',
          },
          hairdressingSnap: {
            title: '美发-卡扣',
            key: 'hairdressingSnap',
          },
          yogaCash: {
            title: '瑜伽-现金',
            key: 'yogaCash',
          },
          yogaSnap: {
            title: '瑜伽-卡扣',
            key: 'yogaSnap',
          },
          productCash: {
            title: '产品-现金',
            key: 'productCash',
          },
          productSnap: {
            title: '产品-卡扣',
            key: 'productSnap',
          },
          projectCash: {
            title: '高端-现金',
            key: 'projectCash',
          },
          projectSnap: {
            title: '高端-卡扣',
            key: 'projectSnap',
          },
          passenger: {
            title: '客流',
            key: 'passenger',
          },
          storeNumber: {
            title: '到店人数',
            key: 'storeNumber',
          },
          firstStoreNumber: {
            title: '首次到店人数',
            key: 'firstStoreNumber',
          },
          firstTransactionNumber: {
            title: '首次成交人数',
            key: 'firstTransactionNumber',
          },
          twoTurnover: {
            title: '二次成交人数',
            key: 'twoTurnover',
          },
          totalActualExercise: {
            title: '实操总额',
            key: 'totalActualExercise',
          },
          unitPrice: {
            title: '客单价',
            key: 'unitPrice',
          },
          arrears: {
            title: '欠款',
            key: 'arrears',
          },
        };
        let data = [table2ColumnList.name];
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
          url: findGuWenMonthDetails() + '?date=' + date,
        }).then((res) => {
          this.tableColumnsChecked = res.data.title;
          this.tableColumns2 = this.getTable2Columns();
          this.tableData2 = res.data.data;
        }).catch((error) => {
        });
      },
      getDate(date) {
        this.date = date;
      },
    },
    mounted () {
      this.getData();
    }
  };
</script>

<style scoped>
  .center{
    margin-top: 10px;
    text-align: center;
  }
</style>
