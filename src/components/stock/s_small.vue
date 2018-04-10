<template>
    <div>
      <Row :gutter="24" class="">
        <Col span="4">
        <Input v-model="name" placeholder="商品名" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
        </Col>
        <Col span="2">
         <Button class="hy_btn" @click="repot">入库记录</Button>
        </Col>
        <Col span="2">
        <Button class="hy_btn" @click="repot">消耗记录</Button>
        </Col>
      </Row>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Page :current="2" :total="50" simple class="center"></Page>
    </div>
</template>

<script type="text/ecmascript-6">
  import { s_outStock } from '../../interface';
    export default {
      name: 's_small',
      data () {
        return {
          name: '',
          columns: [
            {
              title: '货品名',
              key: 'name',
            },
            {
              title: '数量',
              key: 'quantity'
            },
            {
              title: '操作',
              key: 'move',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.move(params)
                      }
                    }
                  }, '耗尽'),
                ]);
              }
            },
          ],
          data: [],
        }
      },
      created() {
        this.getList(1);
      },
      methods: {
        serc() {    //搜索
          if (this.name == '') {
            this.$Message.warning('请输入名称');
          }
        },
        repot() {

        },
        getList(page) {
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            contentType: 'application/json;charset=UTF-8',
            url: s_outStock() + '?page='+page+'&pageSize=30&type=1',
          }).then((res) => {
            this.data = res.data.results;
          }).catch((error) => {
          });
        },
      },
    };
</script>

<style scoped>

  .center{
    margin: 10px auto;
    text-align: center;
  }
</style>
