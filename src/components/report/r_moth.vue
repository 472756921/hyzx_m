<template>
  <div>
    <DatePicker :value="date" format="yyyy-MM" type="month" placeholder="选择日期" @on-change="getDate"></DatePicker>
    <Button class="hy_btn" @click="getList">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
      <Checkbox label="yj">全店业绩</Checkbox>
      <Checkbox label="kl">全店客流</Checkbox>
      <Checkbox label="sc">全店实操</Checkbox>
      <Checkbox label="ddrs">全店到店人数</Checkbox>
      <Checkbox label="gdxm">高端项目</Checkbox>
      <Checkbox label="kkxm">卡扣项目</Checkbox>
      <Checkbox label="kkcp">卡扣产品</Checkbox>
      <Checkbox label="gryj">是否记录店长个人业绩</Checkbox>
      <Checkbox label="other">备注</Checkbox>
    </Checkbox-group>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { re_mouth } from '../../interface';

  export default {
    name: 'r_moth',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['yj', 'kl', 'sc', 'ddrs', 'gdxm', 'kkxm', 'kkcp', 'gryj', 'other']
      }
    },
    mounted () {
      this.changeTableColumns();
    },
    methods: {
      getDate(date) {
        this.date = date;
      },
      getTable2Columns () {
        const table2ColumnList = {
          date: {
            title: '日期',
            key: 'date',
          },
          yj: {
            title: '全店业绩',
            key: 'yj',
          },
          kl: {
            title: '客流',
            key: 'kl',
          },
          sc: {
            title: '全店实操',
            key: 'sc',
          },
          ddrs: {
            title: '全店到店人数',
            key: 'ddrs',
          },
          gdxm: {
            title: '高端项目',
            key: 'gdxm',
          },
          kkxm: {
            title: '卡扣项目',
            key: 'kkxm',
          },
          kkcp: {
            title: '卡扣产品',
            key: 'kkcp',
          },
          gryj: {
            title: '是否记录店长个人业绩',
            key: 'gryj',
          },
          other: {
            title: '备注',
            key: 'other',
          },
        };
        let data = [table2ColumnList.date];
        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));
        return data;
      },
      changeTableColumns () {
        this.tableColumns2 = this.getTable2Columns();
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
