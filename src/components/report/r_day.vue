<template>
  <div style="min-height: 300px">
    <DatePicker :value="date" format="yyyy-MM-dd" type="date" placeholder="选择日期" @on-change="getDate"></DatePicker>
    <Button class="hy_btn" @click="getList">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
      <Checkbox label="u_name">顾客姓名</Checkbox>
      <Checkbox label="service">服务项目</Checkbox>
      <Checkbox label="cath">现金业绩</Checkbox>
      <Checkbox label="h_project">高端项目</Checkbox>
      <Checkbox label="consultant">顾问</Checkbox>
      <Checkbox label="face">面部指定</Checkbox>
      <Checkbox label="face2">面部非指定</Checkbox>
      <Checkbox label="body">身体指定</Checkbox>
      <Checkbox label="body2">身体非指定</Checkbox>
      <Checkbox label="porject">产品现金</Checkbox>
      <Checkbox label="porject2">产品超折</Checkbox>
      <Checkbox label="porject3">产品卡扣</Checkbox>
      <Checkbox label="card_porject">卡扣疗程-名称</Checkbox>
      <Checkbox label="card_porject2">卡扣疗程-金额</Checkbox>
    </Checkbox-group>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { re_day } from '../../interface';

  export default {
    name: 'r_day',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['u_name', 'service', 'cath', 'h_project', 'consultant', 'face', 'face2', 'body', 'body2', 'porject', 'porject2', 'porject3', 'card_porject', 'card_porject2']
      }
    },
    methods: {
      getTable2Columns () {
        const table2ColumnList = {
          e_name: {
            title: '员工姓名',
            key: 'e_name',
          },
          u_name: {
            title: '顾客姓名',
            key: 'u_name',
          },
          service: {
            title: '服务项目',
            key: 'service',
          },
          cath: {
            title: '现金业绩',
            key: 'cath',
          },
          h_project: {
            title: '高端项目',
            key: 'h_project',
          },
          consultant: {
            title: '顾问',
            key: 'consultant',
          },
          face: {
            title: '面部指定',
            key: 'face',
          },
          face2: {
            title: '面部非指定',
            key: 'face2',
          },
          body: {
            title: '身体指定',
            key: 'body',
          },
          body2: {
            title: '身体非指定',
            key: 'body2',
          },
          porject: {
            title: '产品现金',
            key: 'porject',
          },
          porject2: {
            title: '产品超折',
            key: 'porject2',
          },
          porject3: {
            title: '产品卡扣',
            key: 'porject3',
          },
          card_porject: {
            title: '卡扣疗程-名称',
            key: 'card_porject',
          },
          card_porject2: {
            title: '卡扣疗程-金额',
            key: 'card_porject2',
          },
        };
        let data = [table2ColumnList.e_name];
        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));
        return data;
      },
      changeTableColumns () {
        this.tableColumns2 = this.getTable2Columns();
      },
    },
    mounted () {
      this.changeTableColumns();
    }
  };
</script>

<style scoped>
  .center{
    margin-top: 10px;
    text-align: center;
  }
</style>
