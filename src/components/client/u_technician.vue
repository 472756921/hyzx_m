<template>
  <div style="padding: 2px">
    <Button type="info" @click="newte">指定技师</Button>
    <br/>
    <br/>
    <Table :columns="technician" :data="technicianData" style="width: 100%;margin: 0!important;"></Table>
    <Modal v-model="onTe" title="指定技师" :mask-closable="false" @on-ok="ok()">
      选择技师：
      <Select v-model="teData" style="width:200px">
        <Option v-for="item in e_list" :value="item.id" :key="item.id">{{item.realName}}</Option>
      </Select>
      <br>
    </Modal>
  </div>
</template>

<script>
  import {e_Alllist,saveTech,getTech} from '../../interface'
  export default{
    name: 'u_technician',
    data(){
      return{
        userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
        userID:'',
        technician:[
          {key:'realName',title:'技师姓名'},
          {key:'gender',title:'性别'},
          {key:'roleName',title:'员工类型'},
          {key:'serviceIntroduction',title:'服务介绍'}
        ],
        technicianData:[],
        e_list:[],
        teData:[],
        onTe:false,
      }
    },
    created(){
      this.userID = this.$route.params.u_id;
      this.GetData('e_Alllist',this, this.setData);
      this.getList();
    },
    methods:{
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
      newte(){
        this.onTe = true;
        this.teData  = [];
      },
      ok(){
        if(this.teData == ''|| this.teData ==null){
          this.$Message.error('请选择！');
          return;
        }
        this.$ajax({
          method: 'POST',
          dataType:'JSON',
          contentType:'application/json;charset=UTF-8',
          headers:{
            'authToken': this.userInfo.authToken
          },
          url:saveTech(),
          data:{
            customerId:this.userID,
            staffId:this.teData,
            storeId:this.userInfo.storeId,
            type:0
          }
        }).then((res)=>{
          this.$Message.success('指定成功!');
          this.technicianData = [];
          this. getList();
        }).catch((err)=>{
          this.$Message.error('失败!');
        })
      },
      getList(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers:{
            'authToken': this.userInfo.authToken,
          },
          url:getTech()+'?userId='+this.userID+'&storedId='+this.userInfo.storeId+'&type=0',
        }).then( (res) =>{
          this.technicianData.push(res.data);
        }).catch( (err)=>{})
      }
    }
  }
</script>
