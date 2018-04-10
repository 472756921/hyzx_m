<template>
  <div style="padding: 2px">
    <Button type="info" @click="newqu">新增卡</Button>
    <br/>
    <br/>
    <Table :columns="cards" :data="cardsData" :row-class-name="rowClassName"></Table>
    <Modal v-model="newCardF" title="新增卡">
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
      相关卡项
      <br>
      <CheckboxGroup v-model="model1">
        <Checkbox v-for="item in cardList" :label="item.id" :key="item.id" style="margin-right: 20px;">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
    <Modal v-model="opF" title="卡操作">
      <RadioGroup v-model="optortion">
        <Radio label="1">续费</Radio>
        <Radio label="2">其他</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ser_cardList,mer_Card,ext_Card,act_Card,tre_Card,pro_Card} from '../../interface';

  export default {
    name: 'u_cardList',
    data(){
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        newCardF: false,
        opF: false,
        radio: 1,
        optortion: 1,
        cards: [
          {key: 'openTime', title: '购卡日期'},
          {key: 'endTime', title: '过期日期'},
          {key: 'cardName', title: '卡类'},
          {key: 'status', title: '状态', render: (h, p)=>{if(p.row.status == 1){return h('span','正常')}else if(p.row.status == 0){return h('span','禁用')}else if(p.row.status == 2){return h('span','过期')}}},
          {key: 'action', title: '操作',render: (h, params) => {
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
        model1:[],
      }
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getList(1,  this.userID);
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
          url: ser_cardList() + '?id=' + uid +"&page="+page+"&pageSize=50",
        }).then((res) => {
          this.cardsData = res.data.results;
        }).catch((error) => {
        });
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
      },
      newqu() {
        this.newCardF = true;
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
</style>
