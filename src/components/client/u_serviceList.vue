<template>
  <div>
    <Table :columns="service" :data="serviceData"></Table>
    <Page :current="2" :total="50" simple class="center"></Page>
    <Modal v-model="model1" title="服务详情">
      <div>服务项目：<span v-for="(it, i) in order.project"> {{it.projectName}} </span></div>
      <br/>
      <div>服务房间：{{order.serviceRoom}}</div>
      <br/>
      <div>用户：{{order.customer}}</div>
      <br/>
      <div>技师：{{order.operatorName}}</div>
      <br/>
      <div>是否指定技师：{{order.appoint==1?'指定':'非指定'}}</div>
      <br/>
      <div>是否卡扣：{{order.orderType==2?'是':'否'}}</div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ser_Bill } from '../../interface';

  export default {
    name: 'u_serviceList',
    data(){
      return {
        model1: false,
        userID: '',
        order: {
          createTime: '',
          customer: '',
          operatorId: '',
          operatorName: '',
          orderType: '',
          phoneNumber: '',
          project: '',
          serviceOrderNumber: '',
          serviceRoom: '',
          appoint: '',
          preSale: '',
        },
        service: [
          {key: 'billTime', title: '日期'},
          {key: 'serviceOrderListJson.serviceOrderNumber', title: '服务单号'},
          {key: 'operatorName', title: '技师'},
          {key: 'serviceRoom', title: '房间'},
          {
            key: 'appoint', title: '是否指定', render: (h, p)=> {
            if (p.row.appoint == 1) {
              return h('span','指定');
            } else {
              return h('span','非指定');
            }
          }
          },
          {
            key: 'paymentMethod', title: '支付方式', render: (h, p)=> {
              if (p.row.paymentMethod == 2) {
                return h('span','卡扣');
              } else {
                return h('span','现金');
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.datile(params.row)
                  }
                }
              }, '详细'),
              ]);
            }
          },
        ],
        serviceData: [
          {billTime: '2012-12-12', operatorName: '张小泉', zd: 1, paymentMethod: 1, serviceRoom: 203, number: 123123},
        ],
      }
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getList(1,  this.userID);
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
          url: ser_Bill() + '?id=' + uid,
        }).then((res) => {
          // this.serviceData = res.data.results;
        }).catch((error) => {
        });
      },
      datile(row) {
        this.model1 = true;
        this.order = row;
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
