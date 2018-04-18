<template>
  <div style="padding: 2px">
    <Button type="info" @click="newqu">新增卡</Button>
    <br/>
    <br/>
    <Table :columns="cards" :data="cardsData" :row-class-name="rowClassName"></Table>
    <Page :current="1" :total="pages*10" @on-change="getPage" simple style="margin: 10px auto;text-align: center;"></Page>
    <Modal v-model="newCardF" title="新增卡" @on-ok="addok" :mask-closable="false">
      <div>请选择新增类型</div>
      <RadioGroup v-model="radio" @on-change="getCardList(radio)">
        <Radio label="1">会员卡</Radio>
        <Radio label="2">拓客卡</Radio>
        <Radio label="3">活动卡</Radio>
        <Radio label="4">疗程组合卡</Radio>
        <Radio label="5">产品卡</Radio>
      </RadioGroup>
      <br>
      <br>
      相关卡项： <span v-if="cardList==''||cardList==null">空</span>
      <br>
      <RadioGroup v-model="model" @on-change="onc">
        <Radio v-for="(item,index) in cardList" :label="index" :key="item.id" style="margin-right: 20px;">{{item.name}}</Radio>
      </RadioGroup>
      <br>
      <br>
      卡相关信息： <span v-if="cardList==''||cardList==null">空</span>
      <div class="card" v-if="model1.type==1">
        会员卡级别名称：{{model1.info.membershipName}}<br>
        会员价格：{{model1.info.membershipMoney}}<br>
        单次折扣：{{model1.info.projectDiscount}}<br>
        产品折扣：{{model1.info.productDiscount}}<br>
        有效期：{{model1.info.membershipValidity}}个月<br>
        会员尊享：尊享项目{{model1.info.enjoy[0].projectName}}{{model1.info.enjoy[0].enjoyNumber}}次，有效期{{model1.info.enjoy[0].enjoyValidity}}月<br>
        会员日：每月{{model1.info.memberDay}} 日或第{{model1.info.memberDayNtoStore}}次到店第{{model1.info.memberDayNProject}}个项目，折扣{{model1.info.memberDayDiscount}}<br>
        会员返现：第{{model1.info.memberReturnNtoStore}} 次到店第{{model1.info.memberReturnNProject}} 个项目，返现{{model1.info.returnAmount}} 元 ，有效期{{model1.info.returnValidity}} 个月<br>
        注意事项：
      </div>
      <div class="card" v-if="model1.type == 2">
        名称：{{model1.info.extensionName}}<br>
        卡扣价格：{{model1.info.bucklePrice}}<br>
        现金价格：{{model1.info.cashPrice}}<br>
        有效期：{{model1.info.extensionValidity}}天<br>
        是否计算业绩：{{model1.info.performance == '1'?'是':'否'}}<br>
        是否计算实操：{{model1.info.actualOperation == '1'?'是':'否'}}<br>
        是否计算手工：{{model1.info.manualFee == '1'?'是':'否'}}<br>
        拓客项目：<span v-for="item in model1.info.project">{{item.projectName}} - {{item.extensionNumber}}次 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
      </div>
      <div class="card" v-if="model1.type==3">
        名称：{{model1.info.activityName}}<br>
        卡扣价格：{{model1.info.activityBucklePrice}}<br>
        现金价格：{{model1.info.activityCashPrice}}<br>
        卡有效期：{{model1.info.activityValidity}}个月<br>
        活动开始时间：{{model1.info.beginTime}}<br>
        活动结束时间：{{model1.info.endTime}}<br>
        返现优惠： 适用范围为{{model1.info.returnMode}}，返现{{model1.info.returnAmount}}，有效期{{model1.info.returnValidity}} 个月<br>
        特价秒杀：<span v-for="item in model1.info.apecialSecondKill">项目{{item.projectName}}{{item.specialNumber}}套，秒杀价格{{item.specialMoney}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
        到店赠送：第{{model1.info.memberDayNtoStore}} 次到店赠送项目<span v-for="item in model1.info.toStoreProject">{{item.projectName}}{{item.activityNumber}}次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
        享受尊享：<span v-for="item in model1.info.project ">项目{{item.projectName}}{{item.activityNumber}},有效期{{item.activityValidity}}个月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
        老带新：赠送项目<span v-for="item in model1.info.newCustomerParticipation">{{item.projectName}}{{item.activityNumber}}次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
        产品秒杀：<span v-for="item in model1.info.productSecondKill">产品{{item.projectName}},现金秒杀价格{{item.cashSecondPrice}},卡扣秒杀价格{{item.buckleTheSecondPrice}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
        卡扣优惠：<br>
        隐藏显示：疗程组合卡 <span v-for="item in model1.info.courseOfActivityCard">{{item.treatmentName}}卡，</span><br>
      </div>
      <div class="card" v-if="model1.type==4">
        名称：{{model1.info.treatmentName}}<br>
        卡扣价格：{{model1.info.bucklePrice}} <br>
        现金价格：{{model1.info.cashPrice}}<br>
        有效期：{{model1.info.treatmentCardValidity}}个月 <br>
        是否显示：{{model1.info.displays=='1'?'是':'否'}}<br>
        项目组合：<span v-for="item in model1.info.project">{{item.projectName}}-{{item.extensionNumber}}次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>
      </div>
      <div class="card" v-if="model1.type==5">
        名称：{{model1.info.productCardName}}<br>
        卡扣价格：{{model1.info.bucklePrice}}<br>
        现金价格：{{model1.info.cashPrice}}<br>
        金额：{{model1.info.productCardMoney}}<br>
        有效期：{{model1.info.productCardValidity}}个月 <br>
      </div>
      <br><br>
      备注：
      <Input v-model="beizu" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
    </Modal>
    <Modal v-model="opF" title="卡操作">
      <RadioGroup v-model="optortion">
        <Radio label="1">续费</Radio>
        <Radio label="2">其他</Radio>
      </RadioGroup>
    </Modal>
    <Modal v-model="moreCard" title="卡项详情">
      <div class="cardm">
        卡名称：{{this.cardM.cardName}}<br>
        卡类型：{{this.cardM.cardTypeName}}<br>
        开卡日期：{{this.cardM.openTime}}<br>
        过期日期：{{this.cardM.endTime}}<br>
        所剩项目：<span style="font-size:12px;color:#999;" v-for="item in this.cardM.project" >美容项目1次</span><br>
        备注：{{this.cardM.bz}}<br>

      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_cardList,mer_Card,ext_Card,act_Card,tre_Card,pro_Card,card_save} from '../../interface';

  export default {
    name: 'u_cardList',
    data(){
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        newCardF: false,
        opF: false,
        radio: '1',
        optortion: 1,
        cards: [
          {key: 'cardName',title:'卡名称'},
          {key: 'openTime', title: '购卡日期'},
          {key: 'endTime', title: '过期日期'},
          {key: 'cardTypeName', title: '卡类'},
          {key: 'status', title: '状态', render: (h, p)=>{if(p.row.cardStatus == 1){return h('span','正常')}else if(p.row.cardStatus == 0){return h('span','禁用')}else if(p.row.cardStatus == 2){return h('span','过期')}}},
          {key: 'action',
            title: '操作',
            width:'200px',
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
                    this.cardMore(params.row);
                  }
                }
              }, '详情'),
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
                    if(params.row.times == 0){
                      this.$Message.warning('该卡次数已经用尽，不能退卡');
                      return false;
                    }
                    if(params.row.status == 2){
                      this.$Message.warning('该卡已过期，不能退卡');
                      return false;
                    }
                    this.tuika(params.index)
                  }
                }
              }, '退卡'),
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
                    this.datile(params.index)
                  }
                }
              }, '操作'),
            ]);
          }},
        ],
        cardsData: [
          {date: '2012-12-12', endDate: '2017-12-12', type: '产品卡', times: 21, status: 1, other: '无', money: 200, gift: '美白2次'},
          {date: '2012-12-12', endDate: '2017-12-12', type: '产品卡', times: 0, status: 1, other: '无', money: 200, gift: '耗尽'},
          {date: '2012-12-12', endDate: '2017-12-12', type: '产品卡', times: 12, status: 0, other: '无', money: 200, gift: '美白1次'},
          {date: '2012-12-12', endDate: '2013-12-12', type: '产品卡', times: 12, status: 2, other: '无', money: 20, gift: '耗尽'},
        ],
        cardList:[],
        merCard:[],
        extCard:[],
        actCard:[],
        treCard:[],
        proCard:[],
        model:'',
        model1:[],
        beizu:'',
        moreCard: false,
        cardM:[],
        pages:''
      }
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getList(1,this.userID);
      this.getCards();

    },
    methods: {
      getList(page, uid) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_cardList() + '?id=' + uid +"&page="+page+"&pageSize=10",
        }).then((res) => {
          this.cardsData = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      getPage(current){
        this.getList(current,this.userID);
        },
      getCards(){
        //会员卡
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:mer_Card()+'?storeId='+this.userInfo.storeId,
        }).then( (res) =>{
          for(let i=0;i<res.data.length;i++){
            this.merCard.push({
              id: res.data[i].id,
              name: res.data[i].membershipName,
              type: 1,
              info: res.data[i]
            });
          }
        }).catch( (err) =>{});
        //拓客卡
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:ext_Card()+'?storeId='+this.userInfo.storeId,
        }).then( (res) =>{
          for(let i=0;i<res.data.length;i++){
            this.extCard.push({
              id: res.data[i].id,
              name: res.data[i].extensionName,
              type: 2,
              info: res.data[i]
            });
          }
        }).catch( (err) =>{});

        //活动卡
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:act_Card()+'?storeId='+this.userInfo.storeId,
        }).then( (res) =>{
          for(let i=0;i<res.data.length;i++){
            this.actCard.push({
              id: res.data[i].id,
              name: res.data[i].activityName,
              type: 3,
              info: res.data[i]
            });
          }
        }).catch( (err) =>{});

        //疗程组合卡
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:tre_Card()+'?storeId='+this.userInfo.storeId,
        }).then( (res) =>{
          for(let i=0;i<res.data.length;i++){
            this.treCard.push({
              id: res.data[i].id,
              name: res.data[i].treatmentName,
              type: 4,
              info: res.data[i]

            });
          }
        }).catch( (err) =>{});

        //产品卡
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:pro_Card()+'?storeId='+this.userInfo.storeId,
        }).then( (res) =>{
          for(let i=0;i<res.data.length;i++){
            this.proCard.push({
              id: res.data[i].id,
              name: res.data[i].productCardName,
              type: 5,
              info: res.data[i]
            });
          }
        }).catch( (err) =>{});
      },
      getCardList(type){
        if(type== 1){
          //会员卡
          this.cardList = this.merCard;
        }
        if(type== 2){
          //拓客卡
          this.cardList = this.extCard;
        }
        if(type == 3){
          //活动卡
          this.cardList = this.actCard;
        }
        if(type == 4){
          //疗程组合卡
          this.cardList = this.treCard;
        }
        if(type == 5){
          //产品卡
          this.cardList = this.proCard;
        }
        this.model ='';
        this.model1=[];
      },
      onc(){
        if(this.radio =='1' ){
          this.model1 = this.merCard[this.model];
        }
        if(this.radio == '2'){
          this.model1 = this.extCard[this.model];
        }
        if(this.radio == '3'){
          this.model1 = this.actCard[this.model];
        }
        if(this.radio == '4'){
          this.model1 = this.treCard[this.model];
        }
        if(this.radio == '5'){
          this.model1 = this.proCard[this.model];
        }
      },
      newqu() {
        this.newCardF = true;
        this.radio = '1';
        this.getCardList(this.radio);
      },
      addok(){
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken
          },
          url:card_save(),
          data:{
            bz: this.beizu,
            cardId: this.model1.id,
            type: this.model1.type,
            userId: this.userID,
            cardName:this.model1.name

          }
        }).then( (res)=>{
          this.$Message.success('新增卡成功');
          this.getList(1,this.userID);
        }).catch((err)=>{
          this.$Message.error('失败');
        })
      },
      datile() {
        this.opF = true;
      },
      tuika() {
        var r=confirm("您确定退卡？")
        if(r) {
          this.$Message.success('退卡成功');
        }
      },
      rowClassName(r) {
        if(r.times <= 0) {
          return 'timesOver';
        }
        if(r.status == 0) {
          return 'noActive';
        }
        if(new Date(Date.parse(r.endDate)) < new Date()) {
          return 'over';
        }
      },
      cardMore(data){
        this.moreCard = true;
        this.cardM = data;
      },
    },
  };
</script>

<style>
  .ivu-table .timesOver td{
    background-color: #fff4f3;
  }
  .ivu-table .noActive td{
    background-color: #f3e8e7;
  }
  .ivu-table .over td{
    background-color: #eee;
  }
  .center{
    margin: 10px auto;
    text-align: center;
  }
  .card{
    line-height: 25px;
    padding-top: 10px;
    padding-left: 20px;
    font-size: 12px;
    color: #888;
  }
  .cardm{
    font-size: 12px;
    line-height: 25px;
  }
</style>
