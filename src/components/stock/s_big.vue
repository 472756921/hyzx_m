<template>
    <div>
      <Row :gutter="24" class="">
        <Col span="4">
        <Input v-model="name" placeholder="商品名" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="newEm">新增入库</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="getList(1,1)">盘点库存</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="getList(1,2)">入库记录</Button>
        </Col>
        <Col span="2">
          <Button class="hy_btn" @click="getList(1,3)">出库记录</Button>
        </Col>
      </Row>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Page :current="pages" :total="total" simple class="center"  :page-size="30" @on-change="getPage"></Page>

      <Modal  v-model="emac" title="新增入库" @on-ok="saveE">
        <Input v-model="stock.name">
        <span slot="prepend">商品名称</span>
        </Input>
        <br/>
        <Input v-model="stock.actualQuantity">
        <span slot="prepend">商品数量</span>
        </Input>
        <br/>
        <Input v-model="stock.source">
        <span slot="prepend">商品来源</span>
        </Input>
        <br/>
        <span>过期时间：</span>
        <DatePicker type="date" v-model="stock.expiration" placeholder="选择日期" style="width: 200px"></DatePicker>
      </Modal>

      <Modal  v-model="moveF" title="入库小库" @on-ok="movers">
        <Input v-model="m_name" disabled>
        <span slot="prepend">商品名称</span>
        </Input>
        <br/>
        <Input v-model="m_number">
        <span slot="prepend">商品数量</span>
        </Input>
        <br/>
        <div>大库剩余数量：{{p_number}}</div>
        <br/>
      </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
  import { s_List, s_inStock, s_save, s_outStock, s_out } from '../../interface';

    export default {
      name: 's_big',
      data () {
        return {
          pages: 1,
          total: 1,
          type: 1,
          stock: {
            name: '',
            actualQuantity: '',
            source: '',
            expiration: '',
          },
          p_number: '',
          m_id:'',
          m_name:'',
          m_number:'',
          name: '',
          moveF: false,
          emac: false,
          columns: [],
          columnsP: [
            {
              title: '货品名',
              key: 'name',
            },
            {
              title: '实际数量',
              key: 'actualQuantity',
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
                  }, '转入小库'),
                ]);
              }
            },
          ],
          columnsR: [
            {
              title: '货品名',
              key: 'name',
            },
            {
              title: '入库时间',
              key: 'storage',
            },
            {
              title: '过期时间',
              key: 'expiration',
            },
            {
              title: '入库数量',
              key: 'quantity',
            },
            {
              title: '货品来源',
              key: 'source',
            },
          ],
          columnsC: [
            {
              title: '货品名',
              key: 'name',
            },
            {
              title: '出库数量',
              key: 'quantity',
            },
            {
              title: '出库时间',
              key: 'storage',
            },
          ],
          data: [],
        }
      },
      created() {
        this.getList(1,1);
      },
      methods: {
        getList(page, type) {
          this.type = type;
          let url = '';
          if(!/^\d+$/.test(page)) {
            if(type === 1) {
              url = s_List() + '?name='+page;
              this.columns = this.columnsP;
            }
            if(type === 2) {
              url = s_inStock() + '?name='+page;
              this.columns = this.columnsR;
            }
            if(type === 3) {
              url = s_outStock() + '?name='+page;
              this.columns = this.columnsC;
            }
          } else {
            if(type === 1) {
              url = s_List() + '?page='+page+'&pageSize=30';
              this.columns = this.columnsP;
            }
            if(type === 2) {
              url = s_inStock() + '?page='+page+'&pageSize=30';
              this.columns = this.columnsR;
            }
            if(type === 3) {
              url = s_outStock() + '?page='+page+'&pageSize=30';
              this.columns = this.columnsC;
            }
          }
          console.log(url)
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: {},
            contentType: 'application/json;charset=UTF-8',
            url: url ,
          }).then((res) => {
            this.data = res.data.results;
            this.pages = res.data.pages;
            this.total = Math.ceil(res.data.total/30);
          }).catch((error) => {
          });
        },
        newEm() {
          this.emac = true;
          this.stockclear();
        },
        stockclear(){
          this.stock = {
            name: '',
            quantity: '',
            source: '',
            expiration: '',
          };
        },
        move(r) {
          this.moveF = true;
          this.m_name = r.row.name;
          this.m_number = '';
          this.p_number = r.row.actualQuantity;
        },
        movers() {
          if(this.m_number == ''){
            this.$Message.warning('请输入数量');
            return false;
          }
          if(Number(this.p_number) < Number(this.m_number)){
            this.$Message.error('大库商品不足');
            return false;
          }
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: {},
            contentType: 'application/json;charset=UTF-8',
            url: s_out() + '?name='+this.m_name + '&actualQuantity=' + this.m_number + '&type=1',
          }).then((res) => {
            this.$Message.success('操作成功');
          }).catch((error) => {
          });
        },
        saveE() {
          this.stock.expiration = new Date(this.stock.expiration).Format('yyyy-MM-dd')
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            data: this.stock,
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: s_save(),
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getList(1,1);
          }).catch((error) => {
          });
        },
        getPage(current) {   //
          this.getList(current, this.type);
        },
        serc() {    //搜索
          if (this.name == '') {
            this.getList(1, this.type);
          } else {
            this.getList(this.name, this.type);
          }
        },
      },
    };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .title{
    font-size: 18px;
    margin: 14px 0;
    color: #66368C;
  }
  .center{
    margin: 10px auto;
    text-align: center;
  }

</style>
