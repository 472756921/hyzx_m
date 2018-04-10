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
      <br/>
      <Input v-model="textarea" type="textarea" :disabled="waysF" :autosize="{minRows: 2,maxRows: 5}"/>
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
  import { ser_Problem, ser_UserProblem, ser_ProblemSave, ser_findPlan, ser_problemBegin ,problemList} from '../../interface';

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
          {key: 'proStatus', title: '状态', render:(h, p)=>{if(p.row.proStatus == 0){return h('span','已解决')}else if(p.row.proStatus == 1 ){return h('span','正在解决')}}},
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
      }
    },
    watch: {
      radio(n, o){
        this.getPrData(this.radio)
      },
    },
    created() {
      this.userID = this.$route.params.u_id;
      this.getList();
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
        } else {
          this.radio = row.programme;
          this.waysF = true;
        }
        this.wayf = true;
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
          data: {id: this.questionID, programme: this.radio}
        }).then((res) => {
          this.$Message.success('方案保存成功！');
          this.getList();
        }).catch((error) => {
        });
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
