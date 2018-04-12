<template>
  <div style="min-height: 300px">
    <DatePicker :value="date" format="yyyy-MM" type="month" placeholder="选择日期"></DatePicker>
    <Button class="hy_btn">查询</Button>
    <br/>
    <br/>
    <h3>报表详情</h3>
    <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
      <Checkbox label="hycz1">会员储值-售前</Checkbox>
      <Checkbox label="hycz2">会员储值-售后</Checkbox>
      <Checkbox label="mr1">美容-现金</Checkbox>
      <Checkbox label="mr2">美容-实操</Checkbox>
      <Checkbox label="mf1">美发-现金</Checkbox>
      <Checkbox label="mf2">美发-卡扣</Checkbox>
      <Checkbox label="yj1">瑜伽-现金</Checkbox>
      <Checkbox label="yj2">瑜伽-卡扣</Checkbox>
      <Checkbox label="cp1">产品-现金</Checkbox>
      <Checkbox label="cp2">产品-卡扣</Checkbox>
      <Checkbox label="gd1">高端-现金</Checkbox>
      <Checkbox label="gd2">高端-卡扣</Checkbox>
      <Checkbox label="kl1">客流</Checkbox>
      <Checkbox label="ddrs">到店人数</Checkbox>
      <Checkbox label="scddrs">首次到店人数</Checkbox>
      <Checkbox label="sccjrs">首次成交人数</Checkbox>
      <Checkbox label="eccjrs">二次成交人数</Checkbox>
      <Checkbox label="scze">实操总额</Checkbox>
      <Checkbox label="kdj">客单价</Checkbox>
      <Checkbox label="qk">欠款</Checkbox>
    </Checkbox-group>
    <Table :data="tableData2" :columns="tableColumns2" border></Table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { re_day } from '../../interface';

  export default {
    name: 'r_employee',
    data () {
      return {
        date: '',
        tableData2: [],
        tableColumns2: [],
        tableColumnsChecked: ['hycz1', 'hycz2','mr1','mr2','mf1','mf2','yj1','yj2','cp1','cp2','gd1','gd2','kl1','ddrs','scddrs','sccjrs','eccjrs','scze','kdj','qk']
      }
    },
    methods: {
      getTable2Columns () {
        const table2ColumnList = {
          date: {
            title: '日期',
            key: 'date',
          },
          hycz1: {
            title: '会员储值-售前',
            key: 'hycz1',
          },
          hycz2: {
            title: '会员储值-售后',
            key: 'hycz2',
          },
          mr1: {
            title: '美容-现金',
            key: 'mr1',
          },
          mr2: {
            title: '美容-实操',
            key: 'mr2',
          },
          mf1: {
            title: '美发-现金',
            key: 'mf1',
          },
          mf2: {
            title: '美发-卡扣',
            key: 'mf2',
          },
          yj1: {
            title: '瑜伽-现金',
            key: 'yj1',
          },
          yj2: {
            title: '瑜伽-卡扣',
            key: 'yj2',
          },
          cp1: {
            title: '产品-现金',
            key: 'cp1',
          },
          cp2: {
            title: '产品-卡扣',
            key: 'cp2',
          },
          gd1: {
            title: '高端-现金',
            key: 'gd1',
          },
          gd2: {
            title: '高端-卡扣',
            key: 'gd2',
          },
          kl1: {
            title: '客流',
            key: 'kl1',
          },
          ddrs: {
            title: '到店人数',
            key: 'ddrs',
          },
          scddrs: {
            title: '首次到店人数',
            key: 'scddrs',
          },
          sccjrs: {
            title: '首次成交人数',
            key: 'sccjrs',
          },
          eccjrs: {
            title: '二次成交人数',
            key: 'eccjrs',
          },
          scze: {
            title: '实操总额',
            key: 'scze',
          },
          kdj: {
            title: '客单价',
            key: 'kdj',
          },
          qk: {
            title: '欠款',
            key: 'qk',
          },
        };
        let data = [table2ColumnList.date];
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
