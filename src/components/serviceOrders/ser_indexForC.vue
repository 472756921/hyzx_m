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
      <Col span="8"  v-for="(item, i) in order" :key="i">
      <div class="order">
        <div>
          <div>
            <span class="orderTitle">
              <div>{{ item.anonymous==false?'服务单':'匿名服务单' }}</div>
              <div class="orderNumber">单号：{{item.serviceOrderNumber}} </div>
              <div class="orderNumber">创建时间：{{item.createTime}}</div>
            </span>
            <span class="orderDate">{{ item.date }}</span>
          </div>
          <Row :gutter="10">
            <Col  span="8">
              <span class="orderLititle">顾客姓名：</span>
              <span class="orderLiCon">{{ item.anonymous==false?item.customer:item.customer[0]+'**' }}</span>
            </Col>
            <Col  span="16">
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
              <span class="orderLititle">服务床位：</span>
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
          <div class="orderLiCon" v-for="(it,i) in item.project" style="background: #f7f7f7;padding-left: 10px">
            {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
          </div>
        </div>
        <div v-if="item.cardProject.length!=0"><span class="orderLititle">卡扣项目：</span>
          <div class="orderLiCon" v-for="(it,i) in item.cardProject" style="background: #f7f7f7;padding-left: 10px">
            {{ it.projectName }} &nbsp;<span class="price">￥{{ it.money }}</span>
          </div>
        </div>
        <div style="font-size: 16px;margin: 10px auto;">储值卡付款合计：<span class="price" style="font-size: 16px">￥{{ item.cashAmount }}</span></div>
        <div>结算方式：</div>
        <RadioGroup v-model="ordert[i]">
          <Radio label="1" size="small"><span class="orderLititle">消耗：</span>
            <span class="orderLiCon">(余111)</span></Radio>
          <Radio label="2" size="small"> <span class="orderLititle">卡扣：</span>
            <span class="orderLiCon">(余111)</span></Radio>
          <Radio label="3" size="small"><span class="orderLititle">现金项：</span>
            <span class="orderLiCon">(余111)</span></Radio>
        </RadioGroup>
        <div  style="width: 100%;margin: 0 auto;text-align:center">
          <Button  :class="{hy_btn:ordert[i]!=''&&ordert[i]!=null}" @click="settlement(item,i)" :disabled="ordert[i]==''||ordert[i]==null">结算</Button>
          <Button type="ghost" @click="edit(item)">编辑</Button>
        </div>
      </div>
      </Col>
    </Row>
    <Page :current="1" :total="pages*10" @on-change="getPage" simple style="margin: 10px auto;text-align: center;"></Page>

    <Modal  v-model="service" :title="serCard" @on-ok="ok" :mask-closable="false">
      <Checkbox v-model="orderINfo.anonymous"  :disabled="serCard=='修改现金单'?true:false">匿名现金单</Checkbox>
      <br/>
      <br/>
      <span>用户选择：</span>
      <Select v-model="orderINfo.customerId" @on-change="getUserDiscount()" filterable :transfer="true" style="width:200px" :disabled="serCard=='修改现金单'?true:false">
        <Option v-for="item in u_list" :value="item.id" :key="item.id">{{ item.realName }} - {{item.phoneNumber}}</Option>
      </Select>
      <div v-show="userDiscountShow" style="margin-top: 10px;">
        <span style="display: inline-block;vertical-align: top;color: orange;">用户卡项信息：</span><span v-if="userCardInfo==''||userCardInfo==null">暂无卡项</span>
        <span style="display: inline-block;">
           <div v-for="item in userCardInfo">卡名：{{item.cardName}}，所剩项目：美容a项目；</div>
        </span>
      </div>
      <br/>
      <br/>
      <span>技师选择：</span>
      <Select v-model="orderINfo.operatorId" filterable :transfer="true" style="width:200px">
        <Option v-for="item in ce_list" :value="item.id" :key="item.id">{{ item.realName }} - {{item.phoneNumber}}</Option>
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
      <span>床位选择：</span>
      <Select v-model="orderINfo.roomId" :transfer="true" style="width:200px">
        <Option v-for="item in r_list" :value="item.id" :disabled="item.roomStatus==1? true: false" :key="item.id">{{ item.roomName }}<span style="float:right;color:#ccc">{{item.roomStatus == 1 ? '已使用':''}}</span></Option>
      </Select>
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
      <br/>
    </Modal>

    <Modal  v-model="settlementF" title="结算" @on-ok="sok" :mask-closable="false">
      <div>您正在结算现金单，点击确认后将打印单据，请保持打印机连接畅通</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_list, ser_save, ser_Over,ser_edit,getRule,getUserCard,getSortList} from '../../interface';

  export default {
    name: 'ser_indexForS',
    created() {
      this.getList(1);
      this.GetData('u_Alllist',this, this.setData);
      this.GetData('e_Alllist',this, this.setData);
      this.GetData('p_Alllist',this, this.setData);
      this.GetData('s_AllList',this, this.setData);
      this.GetData('r_Alllist',this, this.setData);
      this.getRule();

    },
    data() {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        serCard: '创建现金单',
        serser: '',
        service: false,
        settlementF: false,
        orderINfo: {
          anonymous: false, //是否匿名，否
          customerId: '',
          operatorId: '',  //技师
          appoint: '',
          roomId: '',
          orderType: '1',
          project: [],
          // serviceDate: '',
          preSale: '',
        },
        u_list: [],
        e_list: [],
        r_list: [],
        p_list: [],
        pr_list: [],
        order: [],
        userDiscountShow:false,
        pages: '',
        ce_list:[],
        rule:[],
        test1:{id:10,realName:'test1'},
        test2:{id:11,realName:'test2'},
        test3:{id:12,realName:'test3'},
        test4:{id:13,realName:'test4'},
        ordert:[],
        userCardInfo:''
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
          url: ser_list() + '?page='+page+'&pageSize=6&orderType=1',
        }).then((res) => {
          this.order = res.data.results;
          this.pages = res.data.pages;
          this.ordert=[];
        }).catch((error) => {
        });
      },
      getRule(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:getRule()+'?id='+this.userInfo.storeId
        }).then( (res) =>{
          this.rule= res.data.advisorDesignation.split(',');
        }).catch( (err)=>{})
      },
      ok() {
        // this.orderINfo.serviceDate = new Date(this.orderINfo.serviceDate).Format('yyyy-MM-dd')
        if(this.checkNull(this.orderINfo.customerId)||this.checkNull(this.orderINfo.operatorId)||this.checkNull(this.orderINfo.appoint)||this.checkNull(this.orderINfo.roomId)||this.checkNull(this.orderINfo.project)|| this.checkNull(this.orderINfo.preSale)){
          this.$Message.warning('请完整填写现金单');
          return false;
        }
        let data = [];
        for (let it in this.orderINfo.project) {
          data = [...data,{projectId: this.orderINfo.project[it]} ]
        }
        this.orderINfo.project = data;
        let url;
        if(this.serCard=='修改现金单'){
          url =ser_edit();
        }else{
          url = ser_save();
        }
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.orderINfo,
          contentType: 'application/json;charset=UTF-8',
          url: url,
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
          anonymous: false, //匿名
          customerId: '',
          operatorId: '',  //技师
          appoint: '',
          roomId: '',
          orderType: '1',
          project: [],
          serviceDate: '',
          preSale: '',
        };
        this.ce_list = [];

      },
      edit(data) {
       this.serCard = '修改现金单';
       this.service = true;
       // this.serviceDate = item.date;
        this.orderINfo = JSON.parse(JSON.stringify(data));
        let project =[];
        for (let it in this.orderINfo.project) {
          project.push(data.project[it].projectId);
        }
        this.orderINfo.project =[];
        this.orderINfo.project = project;
      },
      settlement(data,i) {
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
        if(this.orderINfo.customerId==''|| this.serCard == '修改服务单'){
          this.userDiscountShow = false;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken":this.userInfo.authToken,
          },
          url:getUserCard()+'?id='+this.orderINfo.customerId
        }).then( (res) =>{
          this.userCardInfo = res.data.results;
        }).catch( (err)=>{ })
        this.ce_list = [];
        this.getCustomerOrder(this.orderINfo.customerId);
      },
      getCustomerOrder(id){
        this.$ajax({
          method:'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken,
          },
          url:getSortList()+'?storeId='+this.userInfo.storeId+'&id='+id,
        }).then((res)=>{
          this.ce_list = res.data.map((item)=>{return item});
          this.ce_list = this.uniqueArray(this.ce_list,'id');
        }).catch( (err)=>{})
      },
      uniqueArray(array,key){
        var result = [array[0]];
        for(var i = 1; i < array.length; i++){
          var item = array[i];
          var repeat = false;
          for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
              repeat = true;
              break;
            }
          }
          if (!repeat) {
            result.push(item);
          }
        }
        return result;
      },
      getPage(current){
        this.getList(current);
      },
      checkNull(data){
        if(data == null || data ==''){
          return true
        }else{
          return false;
        }
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
