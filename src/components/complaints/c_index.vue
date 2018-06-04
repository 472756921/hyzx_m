<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="投诉人 / 被投诉人" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建投诉</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>
    <Page :current="1" :total="total" @on-change="getPage" simple style="margin: 10px auto;text-align: center;" :page-size="30"></Page>

    <Modal  v-model="emac" :title="emclass" @on-ok="ok"  >
      <span>用户选择：</span>
      <Select v-model="model1" filterable style="width:200px" :disabled="emclass!='新建投诉'?true:false" @on-change="checkOrder">
        <Option v-for="order in u_list" :value="order.id" :key="order.id">{{ order.realName }} - {{order.phoneNumber}}</Option>
      </Select>
      <br/>
      <br/>
      <span>服务单选择：</span>
      <Select v-model="model2" filterable style="width:200px" :disabled="emclass!='新建投诉'?true:false" @on-change="showOrder">
        <Option v-for="(order, index) in s_list" :value="index" :key="index">{{ order.createTime }}</Option>
      </Select>
      <div v-if="orderF" class="order">
        <div>
          <div>
              <span class="orderTitle">
                <span>{{ order.anonymous?'服务单':'匿名服务单' }}</span>
                <span class="orderNumber">({{order.serviceOrderNumber}})</span>
              </span>
          </div>
          <Row :gutter="10">
            <Col  span="8">
            <span class="orderLititle">顾客姓名：</span>
            <span class="orderLiCon">{{ order.customer }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">顾客电话：</span>
            <span class="orderLiCon">{{ order.phoneNumber }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">顾客等级：</span>
            <span class="orderLiCon">{{ order.level }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">服务技师：</span>
            <span class="orderLiCon">{{ order.operatorName }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">指定：</span>
            <span class="orderLiCon">{{ order.appoint==1?"是":"否" }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">服务房间：</span>
            <span class="orderLiCon">{{ order.serviceRoom }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">售前：</span>
            <span class="orderLiCon">{{ order.preSale==1?"是":"否"  }}</span>
            </Col>
          </Row>
        </div>
        <div v-if="order.project.length!=0">
          <div class="orderLititle">非卡扣项目：</div>
          <div class="orderLiCon" v-for="(it,i) in order.project" style="background: #f7f7f7;padding: 10px">
            {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
          </div>
        </div>
        <div v-if="order.cardProject.length!=0"><span class="orderLititle">卡扣项目：</span>
          <div class="orderLiCon" v-for="(it,i) in order.cardProject" style="background: #f7f7f7;padding: 10px">
            {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <span>投诉内容</span>
      <Input v-model="model3" type="textarea" :autosize="{minRows: 3,maxRows: 6}"  :readonly="emclass!='新建投诉'?true:false" placeholder="请输入投诉内容..."/>
      <br/>
      <br/>
      <span v-if="emclass=='投诉详情'">解决方案</span>
      <Input v-if="emclass!='新建投诉'" v-model="model4" type="textarea" :autosize="{minRows: 3,maxRows: 6}"  :readonly="emclass=='投诉详情'?true:false" placeholder="请输入处理方案..."/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { c_list, c_save, ser_OverByUserID, c_handle } from '../../interface';

  export default {
    name: 'c_index',
    data () {
      return {
        pages: 1,
        total: 1,
        order: {},
        u_name: '',
        emclass: '',
        e_id: '',
        serviceId: '',
        name: '',
        emac: false,
        orderF: false,
        columns: [
          {
            title: '投诉人',
            key: 'customerName',
          },
          {
            title: '被投诉人',
            key: 'btsrName'
          },
          {
            title: '投诉问题',
            key: 'complaintsReason',
            width: 300,
          },
          {
            title: '投诉时间',
            key: 'complaintsTime'
          },
          {
            title: '状态',
            key: 'tsStatus',
            render: (h, params) => {
              if(params.row.tsStatus == 2){
                return h("span","已处理");
              }
              if(params.row.tsStatus == 1){
                return h("span","未处理");
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              if(params.row.tsStatus == 1){
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.option(params.index)
                      }
                    }
                  }, '处理'),
                ]);
              } else {
                return h('div',[
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
                        this.edit(params.index)
                      }
                    }
                  }, '详情'),
                ])
              }
            }
          }
        ],
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        data: [],
        u_list: [],
        s_list: [],
      }
    },
    created() {
      this.getList(1)
      this.GetData('u_Alllist',this, this.setData);
    },
    methods: {
      getPage(current){
        this.getList(current);
      },
      checkOrder() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          contentType: 'application/json;charset=UTF-8',
          url: ser_OverByUserID() + '?id=' + this.model1,
        }).then((res) => {
          this.s_list = res.data;
        }).catch((error) => {
        });
      },
      setData(data, type) {
        if(type == 'u_Alllist'){
          this.u_list = data;
        }
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: {},
          contentType: 'application/json;charset=UTF-8',
          url: c_list() + '?page='+page+'&pageSize=30',
        }).then((res) => {
          this.data = res.data.results;
          this.pages = res.data.pages;
          this.total = Math.ceil(res.data.total/30);
        }).catch((error) => {
        });
      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户或技师名字');
        }
      },
      showOrder(){
        if(this.emclass == '新建投诉') {
          this.order = this.s_list[this.model2];
          this.e_id =  this.s_list[this.model2].operatorId;
          this.serviceId = this.s_list[this.model2].id;
          this.orderF=true;
        }
      },
      newEm() {
        this.emclass = '新建投诉';
        this.orderF=false;
        this.emac = true;
        this.model1 = '';
        this.model2 = '';
        this.model3 = '';
      },
      edit(index) {
        this.emac = true;
        this.model1 = this.data[index].customerId;
        this.model2 = this.data[index].id;
        this.model3 = this.data[index].complaintsReason;
        this.model4 = this.data[index].treatmentMethods;
        this.emclass = '投诉详情';
      },
      option (index) {
        this.emac = true;
        this.model1 = this.data[index].customerId;
        this.model2 = this.data[index].id;
        this.e_id = this.data[index].btsrId;
        this.model3 = this.data[index].complaintsReason;
        this.model4 = '';
        this.emclass = '投诉处理';
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      ok() {
        if( this.emclass == '新建投诉' ) {
          if(this.model3 == ''){
            this.$Message.warning('请填写完整信息！');
            return;
          }
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: {
              customerId: this.model1,
              btsrId: this.e_id,
              serviceId: this.serviceId,
              complaintsReason: this.model3,
            },
            contentType: 'application/json;charset=UTF-8',
            url: c_save(),
          }).then((res) => {
            this.s_list = res.data;
          }).catch((error) => {
          });
        }
        if(this.emclass == '投诉处理'){
          if(this.model4 == ''){
            this.$Message.warning('请填写完整信息！');
            return;
          }
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            data: {
              id: this.model2,
              treatmentMethods: this.model4,
            },
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: c_handle(),
          }).then((res) => {
            this.$Message.success('操作成功')
          }).catch((error) => {
          });
        }
      },
    }
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .order{
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 20px 20px!important;
  }
  .orderLititle{
    color: #66368C;
  }
</style>
