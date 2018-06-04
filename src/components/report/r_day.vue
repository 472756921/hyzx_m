<template>
  <div style="min-height: 300px">
    <DatePicker :value="ddt" format="yyyy-MM-dd" type="date" placeholder="选择日期" @on-change="(date) => this.ddt = date"></DatePicker>
    <Button class="hy_btn" @click="serch">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { dailyDetails } from '../../interface';
  import Format from '../ut/DateFormat';

  export default {
    name: 'r_day',
    data () {
      return {
        ddt: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['userName', 'serviceItems', 'cashPerformance', 'h_project', 'consultant', 'fPAppoint', 'fPNSpecifiedt', 'pEAppoint', 'pENSpecifiedt', 'productCash', 'porject2', 'productSnap', 'claspCourseName', 'claspCourseMoney']
      }
    },
    methods: {
      getTable2Columns () {
        const table2ColumnList = {
          name: {
            title: '员工姓名',
            key: 'name',
          },
          userName: {
            title: '顾客姓名',
            key: 'userName',
          },
          serviceItems: {
            title: '服务项目',
            key: 'serviceItems',
            render: (h, p)=>{
              return p.row.serviceItems
            },
          },
          cashPerformance: {
            title: '现金业绩',
            key: 'cashPerformance'
          },
          h_project: {
            title: '高端项目',
            key: 'h_project',
          },
          consultant: {
            title: '顾问',
            key: 'consultant',
          },
          fPAppoint: {
            title: '面部指定',
            key: 'fPAppoint',
          },
          fPNSpecifiedt: {
            title: '面部非指定',
            key: 'fPNSpecifiedt',
          },
          pEAppoint: {
            title: '身体指定',
            key: 'pEAppoint',
          },
          pENSpecifiedt: {
            title: '身体非指定',
            key: 'pENSpecifiedt',
          },
          productCash: {
            title: '产品现金',
            key: 'productCash',
          },
          porject2: {
            title: '产品超折',
            key: 'porject2',
          },
          productSnap: {
            title: '产品卡扣',
            key: 'productSnap',
          },
          claspCourseName: {
            title: '卡扣疗程-名称',
            key: 'claspCourseName',
            render: (h, p)=>{
              return p.row.claspCourseName
            },
          },
          claspCourseMoney: {
            title: '卡扣疗程-金额',
            key: 'claspCourseMoney',
          },
        };
        let data = [];
        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));
        return data;
      },
      serch() {
        if(this.ddt == '') {
          this.$Message.warning('请选择查询日期');
          return false
        } else {
          this.getData(this.ddt);
        }
      },
      getData (date = new Date().Format('yyyy-MM-dd')) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: dailyDetails() + '?date=' + date,
        }).then((res) => {
          this.tableColumnsChecked = res.data.title;
          this.tableColumns2 = this.getTable2Columns();
          this.tableData2 = res.data.data;
        }).catch((error) => {
        });
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
