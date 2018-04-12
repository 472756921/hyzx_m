<template>
  <div style="min-height: 300px">
    <DatePicker :value="date" format="yyyy-MM" type="month" placeholder="选择日期"></DatePicker>
    <Button class="hy_btn">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
      <Checkbox label="kl">客流</Checkbox>
      <Checkbox label="cath">现金业绩-储值业绩</Checkbox>
      <Checkbox label="cathlc">现金业绩-现金疗程</Checkbox>
      <Checkbox label="h_project_cath">高端项目-现金</Checkbox>
      <Checkbox label="h_project_card">高端项目-卡扣</Checkbox>
      <Checkbox label="face">面部指定</Checkbox>
      <Checkbox label="face2">面部非指定</Checkbox>
      <Checkbox label="body">身体指定</Checkbox>
      <Checkbox label="body2">身体非指定</Checkbox>
      <Checkbox label="porject">产品现金</Checkbox>
      <Checkbox label="porject3">产品卡扣</Checkbox>
      <Checkbox label="card_porject">卡扣疗程业绩</Checkbox>
      <Checkbox label="card_porject2">赠送手工</Checkbox>
      <Checkbox label="consultant">转介绍业绩</Checkbox>
    </Checkbox-group>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { re_day } from '../../interface';

  export default {
    name: 'r_attendance',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['kl', 'cath', 'cathlc', 'h_project_cath', 'h_project_card', 'consultant', 'face', 'face2', 'body', 'body2', 'porject', 'porject3', 'card_porject', 'card_porject2']
      }
    },
    methods: {
      getTable2Columns () {
        const table2ColumnList = {
          kl: {
            title: '客流',
            key: 'kl',
          },
          cath: {
            title: '现金业绩-储值业绩',
            key: 'cath',
          },
          cathlc: {
            title: '现金业绩-现金疗程',
            key: 'cathlc',
          },
          h_project_card: {
            title: '高端项目-卡扣',
            key: 'h_project',
          },
          h_project_cath: {
            title: '高端项目-现金',
            key: 'h_project',
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
          porject3: {
            title: '产品卡扣',
            key: 'porject3',
          },
          card_porject: {
            title: '卡扣疗程业绩',
            key: 'card_porject',
          },
          card_porject2: {
            title: '赠送手工',
            key: 'card_porject2',
          },
          consultant: {
            title: '转介绍业绩',
            key: 'consultant',
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
