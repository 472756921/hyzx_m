<template>
  <div style="padding: 2px">
    <Button type="info" @click="newqu">添加问题</Button>
    <br/>
    <br/>
    <Table :columns="question" :data="questionData" style="width: 100%;margin: 0!important;"></Table>

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
  import { ser_Problem, ser_UserProblem, ser_ProblemSave, ser_findPlan, ser_problemBegin ,problemList , solu_list} from '../../interface';

  export default {
    name: 'u_questionList',
    components: {imgUp},
    data(){
      return {
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
          {key: 'programme', title: '解决方案', render:(h, p)=>{if(p.row.programme == 1){return h('span','基础方案')}else if(p.row.programme == 2 ){return h('span','推荐方案')} else if(p.row.programme == 3 ) {return h('span','最优方案')}else if(p.row.programme == 0 ) {return h('span','未指定')}}},
          {key: 'proStatus', title: '状态', render:(h, p)=>{if(p.row.proStatus == 2){return h('span','已解决')}else if(p.row.proStatus == 1 ){return h('span','正在解决')}}},
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
        description:[]
      }
    },
    watch: {
      radio(n, o){
        if(this.radio == '1'){
          this.pList = this.getBasic(this.description);
        }else if( this.radio == '2'){
          this.pList = this.getBest(this.description);
        }else if(this.radio == '3'){
          this.pList = this.getRecommend(this.description);
        }
      },
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getList();
      this.getSolution();
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
      getList() {
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
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: ser_UserProblem()+'?id=' + this.userID,
        }).then((res) => {
          this.questionData = res.data.results;
        }).catch((error) => {
        });
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
          this.getList();
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
        this.questionID = row.id;
        if(row.programme == 0) {
          this.waysF = false;
          this.radio = '1';
          this.pList = this.getBasic(row.description);
        } else {
          this.radio = row.programme;
          this.waysF = true;
          this.selectP = row.proids;
        }
        this.wayf = true;
        this.description = row.description;

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
          this.getList();
        }).catch((error) => {
        });
      },
      //获取基础方案
      getBasic(data){
        let arr = data.split(',');
        let list = new Array();
        let res1 =[];
        let res2 = [];
        let basicname =[];
        let basicid = [];
        for(let i in arr){
          for(let j in this.solutionList){
            if(arr[i] == this.solutionList[j].problemName){
              basicname= this.solutionList[j].basicProgramme.split(',');
              basicid = this.solutionList[j].basicProgrammeIds.split(',');
              for(let m in basicid){
                if(!res1.includes(basicid[m])){
                  res1.push(basicid[m])
                }
              }
              for(let n in basicname){
                if(!res2.includes(basicname[n])){
                  res2.push(basicname[n])
                }
              }
            }
          }
        }
        for(let m in basicid){
          list.push({
            id: basicid[m],
            name: basicname[m]
          })
        }
        return list;

      },
      //获取最优方案
      getBest(data){
        let arr = data.split(',');
        let list = new Array();
        let res1 =[];
        let res2 = [];
        let bestname =[];
        let bestid = [];
        for(let i in arr){
          for(let j in this.solutionList){
            if(arr[i] == this.solutionList[j].problemName){
              bestname= this.solutionList[j].optimalScheme.split(',');
              bestid = this.solutionList[j].optimalSchemeIds.split(',');
              for(let m in bestid){
                if(!res1.includes(bestid[m])){
                  res1.push(bestid[m])
                }
              }
              for(let n in bestname){
                if(!res2.includes(bestname[n])){
                  res2.push(bestname[n])
                }
              }
            }
          }
        }
        for(let m in bestid){
          list.push({
            id: bestid[m],
            name: bestname[m]
          })
        }
        return list;

      },
      //获取推荐方案
      getRecommend(data){

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
</style>
