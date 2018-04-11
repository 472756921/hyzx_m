<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="name" placeholder="员工姓名" style="margin-top: -1px">
          <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新增员工</Button>
      </Col>
      <Col span="2"  push="16">
        <span class="herf_a" @click="lizhi">离职员工</span>
      </Col>
    </Row>
    <Table :columns="columns" :data="data" :row-class-name="rowClassName"></Table>

    <Modal  v-model="kqF" title="考勤打卡" @on-ok="ok" :mask-closable="false" >
      <div>现在时间：{{date}}</div>
      <br/>
      <RadioGroup v-model="kqClass" type="button">
        <Radio label="1">上班</Radio>
        <Radio label="2">下班</Radio>
        <Radio label="3">上班补卡</Radio>
        <Radio label="4">下班补卡</Radio>
      </RadioGroup>
      <br/>
      <DatePicker v-if="kqClass==3||kqClass==4" type="date" placeholder="选择日期" style="width: 200px;margin-top:20px" :value="bkDate"></DatePicker>
    </Modal>

    <Modal  v-model="eventF" title="事件标记" @on-ok="ok" :mask-closable="false" >
      <div>{{date}}</div>
      <br/>
      <RadioGroup v-model="bjClass" type="button">
        <Radio label="1">事假</Radio>
        <Radio label="2">病假</Radio>
        <Radio label="3">出差</Radio>
        <Radio label="4">调休</Radio>
        <Radio label="5">离职</Radio>
        <Radio label="6">罚金</Radio>
      </RadioGroup>
      <br/>
      <DatePicker v-if="bjClass!=5&&bjClass!=6" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin-top:20px" :value="bjDate"></DatePicker>
      <br/>
      <Input v-model="fjnum" v-if="bjClass==6" placeholder="罚金金额" :maxlength="5" ></Input>
      <br v-if="bjClass==6"/>
      <br v-if="bjClass==6"/>
      <Input v-model="fjres" v-if="bjClass==6" type="textarea" placeholder="罚金原因"></Input>
      <br v-if="bjClass==6"/>
      <br v-if="bjClass==6"/>
      <Input v-model="psd" v-if="bjClass==6" placeholder="操作密码"></Input>
    </Modal>

    <Modal  v-model="emac" :title="emclass" @on-ok="save_e" :mask-closable="false" >
      <h3>基础信息</h3>
      <br/>
      <Input v-model="employee.realName" :disabled="emclass=='修改员工'?true:false" ><span slot="prepend">员工姓名</span></Input>
      <br/>
      <Input v-model="employee.idCardNumber" :disabled="emclass=='修改员工'?true:false"><span slot="prepend">身份证号</span></Input>
      <br/>
      <Input v-model="employee.phoneNumber"><span slot="prepend">电话号码</span></Input>
      <br/>
      <Input v-model="employee.serviceIntroduction"><span slot="prepend">服务介绍</span></Input>
      <br/>
      <h3>岗位选择</h3>
      <br>
      <RadioGroup v-model="employee.roleId" @on-change="getRole" type="button">
        <Radio v-for="item in postList" :label="item.id" :key="item.id">{{item.postName}}</Radio>
      </RadioGroup>
      <br>
      <br>
      <div v-show="roleData!=''&& roleData!=null">
        <span style="color: orange;font-size: 14px;">岗位信息</span>
        <b style="font-size: 18px;">[</b>
        <span>员工类型：{{roleType[roleData.employeeType-1]}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>员工等级：{{roleData.employeeRank == "1" ? '一级': '二级'}}</span>
        <b style="font-size: 18px;">]</b>
      </div>
      <br/>
      <br/>
    </Modal>

    <Modal  v-model="EOutF" title="离职员工列表" width="90%" :mask-closable="false">
      <Table :columns="columns2" :data="data2"></Table>
    </Modal>

  </div>
</template>

<script type="text/ecmascript-6">
  import { e_list, e_list_byID, e_save, e_edit, e_outList, e_out,e_postList } from '../../interface';

  export default {
    name: 'e_index',
    data () {
      return {
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        index: '',
        psd: '',
        fjres: '',
        fjnum: '',
        employee: {
          realName: '',
          idCardNumber: '',
          phoneNumber: '',
          serviceIntroduction: '',
          groupId: '',
          gradeId: '',
          roleId: '',
        },
        emclass: '', //新增、修改员工 modal标题
        bkDate: '',
        bjDate: '',
        name: '',
        emac: false,
        kqF: false,
        eventF: false,
        EOutF: false,
        bjClass: '',
        kqClass: '',
        columns: [
          {
            title: '员工编号',
            key: 'code',
          },
          {
            title: '姓名',
            key: 'realName',
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '类型',
            key: 'roleId',
            render: (h, params) => {
              for(let i in this.postList){
                if(params.row.roleId == this.postList[i].id ){
                  return h('span',this.postList[i].postName);
                }

              }
            }
          },
          {
            title: '性别',
            key: 'gender'
          },
          {
            title: '电话号码',
            key: 'phoneNumber',
            width: 110,
          },
          {
            title: '组别',
            key: 'groupId'
          },
          {
            title: '等级',
            key: 'gradeId',
            render: (h, params) => {
              if(params.row.gradeId == 1){
                return ("一级");
              }
              if(params.row.gradeId == 2){
                return ("二级");
              }
              if(params.row.gradeId == 3){
                return ("三级");
              }
            }
          },
          {
            title: '今日状态',
            key: 'status',
            render: (h, params) => {
              if(params.row.status == 1){
                return h('span',{
                  style: {
                    color: 'green'
                  }
                },"上班中");
              }
              if(params.row.status == 0){
                return h('span',{
                  style: {
                    color: 'blue'
                  }
                },"已下班");
              }
              if(params.row.status == 2){
                return h('span',{
                  style: {
                    color: 'red'
                  }
                },"迟到");
              }
              if(params.row.status == 3){
                return h('span',{
                  style: {
                    color: 'red'
                  }
                },"迟到");
              }
              if(params.row.status == 4){
                return ("");
                return h('span',{
                  style: {
                    color: 'red'
                  }
                },"调休");
              }
              if(params.row.status == 5){
                return h('span',{
                  style: {
                    color: 'red'
                  }
                },"事假");
              }
              if(params.row.status == 6){
                return h('span',{
                  style: {
                    color: 'red'
                  }
                },"病假");
              }
              if(params.row.status == 7){
                return h('span',{
                  style: {
                    color: 'red'
                  }
                },"早退");
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
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
                      this.daka(params.index)
                    }
                  }
                }, '上下班打卡'),
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
                      this.biaoji(params.index)
                    }
                  }
                }, '标记'),
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
                      this.download(params.index)
                    }
                  }
                }, '工资报表下载'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
              ]);
            }
          }
        ],
        data: [],
        columns2: [
          {
            title: '员工编号',
            key: 'code',
          },
          {
            title: '姓名',
            key: 'realName',
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '类型',
            key: 'roleId',
            render: (h, params) => {
              if(params.row.roleId == 1){
                return ("洗脚师");
              }
              if(params.row.roleId == 2){
                return ("按摩师");
              }
              if(params.row.roleId == 3){
                return ("洗头师");
              }
            }
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '身份证号码',
            key: 'idCardNumber'
          },
          {
            title: '电话号码',
            key: 'phoneNumber'
          },
          {
            title: '组别',
            key: 'groupId'
          },
          {
            title: '等级',
            key: 'gradeId',
            render: (h, params) => {
              if(params.row.gradeId == 1){
                return ("一级");
              }
              if(params.row.gradeId == 2){
                return ("二级");
              }
              if(params.row.gradeId == 3){
                return ("三级");
              }
            }
          },
          {
            title: '服务介绍',
            key: 'serviceIntroduction'
          },
          {
            title: '入职时间',
            key: 'entryTime'
          },
          {
            title: '离职时间',
            key: 'e_OutDate'
          },
        ],
        data2: [],
        date: '',
        postList:[],
        post:'',
        roleData:'',
        roleType:['技师','顾问','店长']
      }
    },
    created() {
      setInterval(()=>{
        const nowtime=new Date();
        this.date = nowtime.toLocaleString();
      },1000);
      this.getList(1);
      this.getPostList();
    },
    methods: {
      employeeClear() {
        this.employee = {
          realName: '',
          idCardNumber: '',
          phoneNumber: '',
          serviceIntroduction: '',
          groupId: '',
          gradeId: '',
          roleId: '',
        };
      },
      newEm() {
        this.emclass = '新增员工';
        this.emac = true;
        this.employeeClear();
        this.roleData = '';
      },
      rowClassName(r) {
        if(r.status == 2) {
          return 'cd';
        }
        if(r.status == 3) {
          return 'kg';
        }
        if(r.status == 4) {
          return 'sj';
        }
        if(r.status == 5) {
          return 'sj';
        }
        if(r.status == 6) {
          return 'sj';
        }
        if(r.status == 7) {
          return 'cd';
        }
      },
      edit(index) {
        this.emclass = '修改员工';
        this.emac = true;
        this.employee = JSON.parse(JSON.stringify(this.data[index]));
        this.getRole();
      },
      save_e() {
        let url = e_save();
        if( this.emclass == '修改员工') {
          url = e_edit();
        }
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.employee,
          contentType: 'application/json;charset=UTF-8',
          url: url,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList(1);
        }).catch((error) => {
        });
      },
      daka (index) {
        this.kqF = true;
        this.index = index;
      },
      biaoji (index) {
        this.eventF = true;
        this.employee = this.data[index];
        this.index = index;
      },
      ok() {   //
        if(this.bjClass == 5) {
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: {id: this.employee.id, reason:'', quitTime: '2012-12-12'},
            contentType: 'application/json;charset=UTF-8',
            url: e_out(),
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getList(1);
            this.remove(this.index)
          }).catch((error) => {
          });
        }
        if(this.bjClass == 6) {
          return false
        }
      },
      serc() {    //搜索员工
        if (this.name == '') {
          this.$Message.warning('请输入员工名字');
          return
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          contentType: 'application/json;charset=UTF-8',
          url: e_list() + '?page=1&pageSize=50&name='+this.name,
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      lizhi() {    //离职员工
        this.EOutF = true;
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          contentType: 'application/json;charset=UTF-8',
          url: e_outList() + '?page=1&pageSize=50&name='+this.name,
        }).then((res) => {
          this.data2 = res.data.results;
        }).catch((error) => {
        });
      },
      remove (index) {
        this.data.splice(index, 1);
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          contentType: 'application/json;charset=UTF-8',
          url: e_list() + '?page='+page+'&pageSize=30',
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      download(){
        this.$Message.warning('暂未开发！');
      },
      getPostList(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken,
          },
          url: e_postList()+'?id='+this.userInfo.storeId,
        }).then( (res) =>{
          this.postList = res.data.results;
        }).catch( (err)=>{

        })
      },
      getRole(){
        for( let i in this.postList){
          if(this.postList[i].id == this.employee.roleId){
            this.roleData = this.postList[i];
            return;
          }
        }
      }
    }
  };
</script>

<style>
  .herf_a{
    font-size: 14px;
    line-height: 32px;
    color: #66368C;
    cursor: pointer;
  }
  .serc{
    cursor: pointer;
  }
  .ivu-table .cd td{
    background-color: #eee;
  }
  .ivu-table .kg td{
    background-color: #FFEEE4;
  }
  .ivu-table .sj td{
    background-color: #D8E6E7;
  }
  .ivu-table .tx td{
    background-color: #d9e1e8;
  }
</style>
