<template>
  <div style="padding: 2px">
    <Button type="info" @click="newqu">添加问题</Button>
    <br/>
    <br/>
    <Table :columns="question" :data="questionData" style="width: 100%;margin: 0!important;"></Table>
    <Page :current="1" :total="pages*10" @on-change="getPage" simple style="margin: 10px auto;text-align: center;"></Page>

    <Modal v-model="wayf" title="解决方案"  @on-ok="savePlan">
      <RadioGroup v-model="radio">
        <Radio label="1" :disabled="waysF">基础方案</Radio>
        <Radio label="2" :disabled="waysF">推荐方案</Radio>
        <Radio label="3" :disabled="waysF">最优方案</Radio>
      </RadioGroup>
      <br/>
      <div style="margin: 15px 0 10px 0">方案项目：<span v-if="this.pList ==''|| this.pList == null">空</span></div>
      <CheckboxGroup v-model="selectP">
        <Checkbox v-for="item in pList" :label="item.id" :key="item.id" :disabled="waysF">{{item.name}}</Checkbox>
      </CheckboxGroup>
      <div style="margin: 10px 0">治疗结果：</div>
      <Input v-model="complete" type="textarea" disabled :autosize="{minRows: 2,maxRows: 5}"/>
      <div style="margin: 10px 0">治疗完成时间：</div>
    </Modal>

    <Modal v-model="newquestionF" title="新建问题" @on-ok="newQuestion">
      <CheckboxGroup v-model="social">
        <span v-for="(it, i) in questionList">
          <Checkbox :label='it.id'>{{it.problem}}</Checkbox>
        </span>
      </CheckboxGroup>
    </Modal>

    <Modal v-model="operatingF" title="完成疗程">
      <div style="margin: 0 0 10px 0">您确定该用户完成了疗程</div>
      <div>治疗结果：</div>
      <Input v-model="complete" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import imgUp from '../ut/imgUp.vue';
  import { ser_Problem, ser_UserProblem, ser_ProblemSave, ser_findPlan, ser_problemBegin ,problemList , solu_list,getUserCard} from '../../interface';

  export default {
    name: 'u_questionList',
    components: {imgUp},
    data(){
      return {
        userID:'',
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        questionID: '',
        complete: '',
        social: [],
        newquestion: '',
        newquestionF: false,
        operatingF: false,
        wayf: false,
        waysF: true,
        textarea: '',
        radio: '',
        question: [
          {key: 'checkTime', title: '添加日期'},
          {key: 'description', title: '问题描述'},
          {key: 'programme', title: '解决方案',
            render:(h, p)=>{
              if(p.row.programme == 1){
                return h('span','基础方案')
              }else if(p.row.programme == 2 ){
                return h('span','推荐方案')
              } else if(p.row.programme == 3 ) {
                return h('span','最优方案')}
                else if(p.row.programme == 0 ) {
                return h('span','未指定')
              }
            }
          },
          {key: 'proStatus', title: '状态',
            render:(h, p)=>{
            if(p.row.proStatus == 2){
              return h('span',{style:{color:'green'}},'已解决')
            }else if(p.row.proStatus == 1 ){
              return h('span','正在解决')}
            }
          },
          {key: 'action', title: '操作', render: (h, params) => {
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
                    this.way(params.row)
                  }
                }
              }, '解决方案'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if(params.row.status == 1){
                      this.$Message.warning('该疗程已经完成');
                      return false;
                    }
                    this.operating(params.index)
                  }
                }
              }, '完成疗程'),
            ]);
          }},
        ],
        questionData: [],
        questionList: [],
        selectP:[],
        pList:[],
        solutionList:[],
        proids:[],
        userCardInfo:'',
        pages:'',
      }
    },
    watch: {
      radio(n, o){
        if(this.radio == '1'){
          this.pList = this.getBasic(this.proids);
        }else if( this.radio == '2'){
          this.pList = this.getBest(this.proids);
        }else if(this.radio == '3'){
          this.pList = this.getRecommend(this.proids);
        }
      },
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getProList();
      this.getList(1);
      this.getSolution();
      this.findMyCard();
    },
    methods: {
      getPrData (time) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_findPlan()+"?type="+time+"&id="+this.questionID,
        }).then((res) => {
          this.textarea = res.data;
        }).catch((error) => {
        });
      },
      getProList(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          // url: ser_Problem(),
          url: problemList()+'?id='+this.userInfo.storeId,
        }).then((res) => {
          this.questionList = res.data;
        }).catch((error) => {
        });
      },
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_UserProblem()+'?id=' + this.userID+'&page='+page+'&pageSize=10',
        }).then((res) => {
          this.questionData = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      getPage(current){
        this.getList(current);
      },
      getSolution(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url:solu_list()+'?id='+this.userInfo.storeId
        }).then( (res) =>{
          this.solutionList = res.data;
        }).catch( (err) =>{})
      },
      newQuestion() {
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_ProblemSave(),
          data: {customerId: this.userID, proids:this.social },
        }).then((res) => {
          this.questionData = res.data.results;
          this.getList(1);
        }).catch((error) => {
        });
      },
      operating() {
        this.operatingF = true;
      },
      newqu() {
        this.newquestionF = true;
      },
      way(row) {
        if(this.solutionList.length === 0) {
          this.$Message.warning('该门店暂未配置解决方案');
          return '';
        }
        this.questionID = row.id;
        if(row.programme == 0) {
          this.waysF = false;
          this.radio = '1';
          this.pList = this.getBasic(row.proids);
        } else {
          this.radio = row.programme;
          this.waysF = true;
          this.selectP = row.proids;
        }
        this.wayf = true;
        this.proids = row.proids;
      },
      savePlan() {
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_problemBegin(),
          data: {
            id: this.questionID,
            programme: this.radio,
            proids:this.selectP,
          }
        }).then((res) => {
          this.$Message.success('方案保存成功！');
          this.getList(1);
        }).catch((error) => {
        });
      },
      //获取基础方案
      getBasic(data){
        let arr = data;
        let list = [];
        let res1 =[];
        let res2 = [];
        let basicname =[];
        let basicid = [];
        if(this.solutionList.length === 0) {
          return '';
        }
        for(let i in arr){
          for(let j in this.solutionList){
            if(arr[i] == this.solutionList[j].problemId){
              basicname= this.solutionList[j].basicProgramme.split(',');
              basicid = this.solutionList[j].basicProgrammeIds.split(',');
              for(let m in basicid){
                  res1.push(basicid[m])
              }
              for(let n in basicname){
                  res2.push(basicname[n])
              }
            }
          }
        }
        for(let m in res1){
          list.push({
            id: res1[m],
            name: res2[m]
          })
        }
        list = this.uniqueArray(list ,'id');
        return list;

      },
      //获取最优方案
      getBest(data){
        if(this.solutionList.length === 0) {
          return '';
        }
        let arr = data;
        let list = new Array();
        let res1 =[];
        let res2 = [];
        let bestname =[];
        let bestid = [];
        for(let i in arr){
          for(let j in this.solutionList){
            if(arr[i] == this.solutionList[j].problemId){
              bestname= this.solutionList[j].optimalScheme.split(',');
              bestid = this.solutionList[j].optimalSchemeIds.split(',');
              for(let m in bestid){
                  res1.push(bestid[m])
              }
              for(let n in bestname){
                  res2.push(bestname[n])
              }
            }
          }
        }
        for(let m in res1){
          list.push({
            id: res1[m],
            name: res2[m]
          })
        }
        list = this.uniqueArray(list ,'id');
        return list;
      },
      //获取推荐方案
      getRecommend(data){
        if(this.solutionList.length === 0) {
          return '';
        }
        let arr = new Array();
        let list = new Array();
        arr = this.getBest(data);
        for(let i in this.userCardInfo){
          for( let j in this.userCardInfo[i].project){
            arr.push({
              id: this.userCardInfo[i].project[j].projectId,
              name: this.userCardInfo[i].project[j].projectName,
            })
          }

        }
        list = this.uniqueArray(arr,'id');
        return list;
      },
      //去重
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
      findMyCard(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            "authToken":this.userInfo.authToken,
          },
          url:getUserCard()+'?id='+this.userID
        }).then( (res) =>{
          this.userCardInfo = res.data.results;
        }).catch( (err)=>{ })
      }
    },
  };
</script>

<style>
  .ivu-table .redBack td{
    background-color: #fff4f3;
  }
  .center{
    margin: 10px auto;
    text-align: center;
  }
  .pointer{
    cursor: pointer;
  }
  .row{
    background:#ABCDEF;
  }
</style>
