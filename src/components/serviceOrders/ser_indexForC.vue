<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
      <Input v-model="serser" placeholder="输入单号 / 顾客 / 技师" style="margin-top: -1px">
      <span slot="append" class="serc" @click="serc">查找</span>
      </Input>
      </Col>
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建现金单</Button>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col span="8"  v-for="(item, i) in order" key="i">
      <div class="order">
        <div>
          <div>
              <span class="orderTitle">
                <span>{{ item.anonymous?'现金单':'匿名现金单' }}</span>
                <span class="orderNumber">（单号：{{item.serviceOrderNumber}} 创建时间：{{item.createTime}}）</span>
              </span>
            <span class="orderDate">{{ item.date }}</span>
          </div>
          <Row :gutter="10">
            <Col  span="8">
            <span class="orderLititle">顾客姓名：</span>
            <span class="orderLiCon">{{ item.anonymous?item.customer:item.customer[0]+'**' }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">顾客电话：</span>
            <span class="orderLiCon">{{ item.phoneNumber }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">顾客等级：</span>
            <span class="orderLiCon">{{ item.level}}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">服务技师：</span>
            <span class="orderLiCon">{{ item.operatorName }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">指定：</span>
            <span class="orderLiCon">{{ item.appoint==1?"是":"否" }}</span>
            </Col>
            <Col  span="8">
            <span class="orderLititle">服务房间：</span>
            <span class="orderLiCon">{{ item.serviceRoom }}</span>
            </Col>
            <Col span="8">
            <span class="orderLititle">是否售前：</span>
            <span class="orderLiCon">{{ item.preSale==0? '否':'是' }}</span>
            </Col>
          </Row>
        </div>
        <div v-if="item.project.length!=0">
          <div class="orderLititle">非卡扣项目：</div>
          <div class="orderLiCon" v-for="(it,i) in item.project" style="background: #f7f7f7;padding: 10px">
            {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
          </div>
        </div>
        <div v-if="item.cardProject.length!=0"><span class="orderLititle">卡扣项目：</span>
          <div class="orderLiCon" v-for="(it,i) in item.cardProject" style="background: #f7f7f7;padding: 10px">
            {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
          </div>
        </div>
        <div class="prtotle">储值卡付款合计：<span class="price" style="font-size: 16px">￥{{ item.cashAmount }}</span></div>
        <div  style="width: 25%;margin: 0 auto">
          <Button  class="hy_btn" @click="settlement">结算</Button>
          <Button type="ghost" @click="edit(i)">编辑</Button>
        </div>
      </div>
      </Col>
    </Row>
    <Page :current="1" :total="pages*10" @on-change="getPage" simple style="margin: 10px auto;text-align: center;"></Page>

    <Modal  v-model="service" :title="serCard" @on-ok="ok" :mask-closable="false">
      <Checkbox v-model="orderINfo.isAnonymous"  :disabled="serCard=='修改现金单'?true:false">匿名现金单</Checkbox>
      <br/>
      <br/>
      <span>用户选择：</span>
      <Select v-model="orderINfo.customerId" @on-change="getUserDiscount()" filterable :transfer="true" style="width:200px" :disabled="serCard=='修改现金单'?true:false">
        <Option v-for="item in u_list" :value="item.id" :key="item.id">{{ item.realName }} - {{item.phoneNumber}}</Option>
      </Select>
      <div v-show="userDiscountShow" style="margin-top: 10px;">
        <span style="display: inline-block;vertical-align: top;color: orange;">用户优惠：</span>
        <span style="display: inline-block;">
          <div>会员卡：A卡，所剩项目：美容a项目；</div>
          <div>会员卡：A卡，所剩项目：美容a项目；</div>
          <div>会员卡：A卡，所剩项目：美容a项目；</div>
          <div>会员卡：A卡，所剩项目：美容a项目；</div>
        </span>
      </div>
      <br/>
      <br/>
      <span>技师选择：</span>
      <Select v-model="orderINfo.operatorId" filterable :transfer="true" style="width:200px">
        <Option v-for="item in e_list" :value="item.id" :key="item.id">{{ item.realName }} - {{item.phoneNumber}}</Option>
      </Select>
      <br/>
      <br/>
      <span>是否指定：</span>
      <Select v-model="orderINfo.appoint" :transfer="true" style="width:200px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
      <br/>
      <br/>
      <span>是否售前：</span>
      <Select v-model="orderINfo.preSale" :transfer="true" style="width:200px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
      <br/>
      <br/>
      <span>房间选择：</span>
      <Select v-model="orderINfo.roomId" :transfer="true" style="width:200px">
        <Option v-for="item in r_list" :value="item.id" :disabled="item.roomStatus==1? true: false" :key="item.id">{{ item.roomName }}<span style="float:right;color:#ccc">{{item.roomStatus == 1 ? '已使用':''}}</span></Option>
      </Select>
      <br/>
      <br/>
      <span>服务时间：</span>
      <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" v-model="orderINfo.serviceDate"></DatePicker>
      <br/>
      <br/>
      <span v-if="serCard!='修改现金单'">项目选择：</span>
      <span v-if="serCard=='修改现金单'">增加项目：</span>
      <Select v-model="orderINfo.project" :transfer="true" multiple>
        <Option v-for="item in p_list" :value="item.id" :key="item.id">
          <span>{{ item.projectName }}</span>
          <span style="float:right;color:#ccc">￥{{ item.cashMoney }}</span>
        </Option>
      </Select>
      <br/>
      <br/>
      <div v-if="serCard=='修改现金单'">已选项目：
        <span v-for="item in p_list">{{ item.projectName }} <span class="price" >￥{{ item.money }}</span>&nbsp;&nbsp;</span>
      </div>
      <br/>
    </Modal>

    <Modal  v-model="settlementF" title="结算" @on-ok="sok" :mask-closable="false">
      <div>您正在结算现金单，点击确认后将打印单据，请保持打印机连接畅通</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_list, ser_save, ser_Over} from '../../interface';

  export default {
    name: 'ser_indexForS',
    created() {
      this.getList(1);
      this.GetData('u_Alllist',this, this.setData);
      this.GetData('e_Alllist',this, this.setData);
      this.GetData('p_Alllist',this, this.setData);
      this.GetData('s_AllList',this, this.setData);
      this.GetData('r_Alllist',this, this.setData);
    },
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        serCard: '创建现金单',
        serser: '',
        service: false,
        settlementF: false,
        orderINfo: {
          isAnonymous: false, //匿名
          customerId: '',
          operatorId: '',  //技师
          appoint: '',
          roomId: '',
          orderType: '1',
          project: [],
          serviceDate: '',
          preSale: '',
        },
        u_list: [],
        e_list: [],
        r_list: [],
        p_list: [],
        pr_list: [],
        order: [],
        userDiscountShow:false,
        pages: ''
      }
    },
    methods: {
      setData(data, type) {
        if(type == 'u_Alllist'){
          this.u_list = data;
        }
        if(type == 'e_Alllist'){
          this.e_list = data;
        }
        if(type == 'p_Alllist'){
          this.p_list = data;
        }
        if(type == 's_AllList'){
          this.pr_list = data;
        }
        if(type == 'r_Alllist'){
          this.r_list = data;
        }
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_list() + '?page='+page+'&pageSize=50&orderType=1',
        }).then((res) => {
          this.order = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      ok() {
        this.orderINfo.serviceDate = new Date(this.orderINfo.serviceDate).Format('yyyy-MM-dd')
        for (let variable in this.orderINfo) {
          if (this.orderINfo[variable] === '' || this.orderINfo[variable] === null) {
            this.$Message.warning('请完整填写现金单');
            return false
          }
        }
        let data = [];
        for (let it in this.orderINfo.project) {
          data = [...data,{projectId: this.orderINfo.project[it]} ]
        }
        this.orderINfo.project = data;
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.orderINfo,
          contentType: 'application/json;charset=UTF-8',
          url: ser_save(),
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList(1);
        }).catch((error) => {
        });
      },
      serc() {    //搜索
        if (this.name == '') {
          this.$Message.warning('请输入用户名字');
        }
      },
      newEm() {
        this.serCard = '新建现金单';
        this.userDiscountShow = false;
        this.service = true;
        this.orderINfo= {
          isAnonymous: false, //匿名
          customerId: '',
          operatorId: '',  //技师
          appoint: '',
          roomId: '',
          orderType: '1',
          project: [],
          serviceDate: '',
          preSale: '',
        };

      },
      edit(i) {
//        this.serCard = '修改现金单';
//        this.service = true;
//        this.serviceDate = tem.date;
        this.$Message.warning('暂不提供编辑功能');
      },
      settlement() {
        this.settlementF = true;
      },
      sok() {
        var r=confirm("您确定结算该现金单 ？")
        if(r) {
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: ser_list() + '?page='+page+'&pageSize=50&orderType=1',
          }).then((res) => {
            this.$Message.info({content:'结算完成，请用户签字', duration: 3});
          }).catch((error) => {
          });
        }
      },
      getUserDiscount(){
        this.userDiscountShow = true;
        if(this.orderINfo.customerId==''){
          this.userDiscountShow = false;
        }
      },
      getPage(current){
        this.getList(current);
      }
    },
  };
</script>

<style scoped>
  .orderLititle{
    color: #999;
  }
  .orderNumber{
    font-size: 12px;
    color: #999;
  }
  .orderTitle{
    font-size: 18px;
    color: #66368C;
  }
  .orderDate{
    float: right;
  }
  .serc{
    cursor: pointer;
  }
  .order{
    line-height: 30px;
    margin-top: 10px;
    border: 1px solid #ddd;
    padding: 20px 20px!important;
  }
  .price{
    color: red;
    font-size: 14px;
  }
  .prtotle{
    font-size: 16px;
  }
</style>
