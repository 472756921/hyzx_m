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
  import { findStoreMonthDetails } from '../../interface';

  export default {
    name: 'r_attendance',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['passenger', 'storagePerformance', 'cashCourse', 'projectCash', 'projectSnap', 'introducePerformance', 'facialPracticeAppoint', 'facialPracticeNonSpecifiedt', 'physicalExerciseAppoint', 'physicalExerciseNonSpecifiedt', 'productCash', 'productSnap', 'cardPerformance', 'giveHandToHand']
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
      getData (date = new Date().Format('yyyy-MM')) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findStoreMonthDetails() + '?date=' + date,
        }).then((res) => {
          this.tableColumnsChecked = res.data.title;
          this.tableColumns2 = this.getTable2Columns();
          this.tableData2 = res.data.data;
        }).catch((error) => {
        });
      },
      getTable2Columns () {
        const table2ColumnList = {
          passenger: {
            title: '客流',
            key: 'passenger',
          },
          storagePerformance: {
            title: '现金业绩-储值业绩',
            key: 'storagePerformance',
          },
          cashCourse: {
            title: '现金业绩-现金疗程',
            key: 'cashCourse',
          },
          projectSnap: {
            title: '高端项目-卡扣',
            key: 'projectSnap',
          },
          projectCash: {
            title: '高端项目-现金',
            key: 'projectCash',
          },
          facialPracticeAppoint: {
            title: '面部指定',
            key: 'facialPracticeAppoint',
          },
          facialPracticeNonSpecifiedt: {
            title: '面部非指定',
            key: 'facialPracticeNonSpecifiedt',
          },
          physicalExerciseAppoint: {
            title: '身体指定',
            key: 'physicalExerciseAppoint',
          },
          physicalExerciseNonSpecifiedt: {
            title: '身体非指定',
            key: 'physicalExerciseNonSpecifiedt',
          },
          productCash: {
            title: '产品现金',
            key: 'productCash',
          },
          productSnap: {
            title: '产品卡扣',
            key: 'productSnap',
          },
          cardPerformance: {
            title: '卡扣疗程业绩',
            key: 'cardPerformance',
          },
          giveHandToHand: {
            title: '赠送手工',
            key: 'giveHandToHand',
          },
          introducePerformance: {
            title: '转介绍业绩',
            key: 'introducePerformance',
          },
        };
        let data = [];
        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));
        return data;
      },
      changeTableColumns () {
        this.tableColumns2 = this.getTable2Columns();
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
