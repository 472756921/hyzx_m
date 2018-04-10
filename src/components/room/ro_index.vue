<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
      <Input v-model="serser" placeholder="输入房间号" style="margin-top: -1px">
      <span slot="append" class="serc" @click="serc">查找</span>
      </Input>
      </Col>
      <Col span="3">
      <Button v-show="serShow" class="hy_btn" @click="serBack">返回主列表</Button>
      </Col>
      <Col span="2">
      <Button class="hy_btn" @click="newEm">录入房间信息</Button>
      </Col>
    </Row>

    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="isShow" :title="r_title" @on-ok="ok" :mask-closable="false">
      <h3>房间信息</h3>
      <br/>
      <Input v-model="roomInfo.roomNumber" placeholder="输入房间号" ><span slot="prepend">房间号：</span></Input>
      <br>
      <br>
      <Input v-model="roomInfo.roomName" placeholder="输入房间名" ><span slot="prepend">房间名：</span></Input>
      <br>
      <br>
      <span>房间状态：</span>
      <Select v-model="roomInfo.roomStatus" style="width: 280px;">
        <Option value="0">空闲中</Option>
        <Option value="1">使用中</Option>
      </Select>
      <br>
      <br>
    </Modal>
  </div>
</template>

<script>

  import {r_list,r_save,r_edit,r_delete,r_search} from '../../interface';
  export default {
    name: 'ro_index',
    data(){
      return{
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        columns:[
          {
            title: '房间号',
            key: 'roomNumber'
          },
          {
            title: '房间名',
            key: 'roomName',
          },
          {
            title: '房间状态',
            key: 'Status',
            render: (h, params) => {
              if(params.row.roomStatus == "0"){
                return h('span',{
                  style: {
                    color: 'green'
                  }
                },"空闲中");
              }
              if(params.row.roomStatus == "1"){
                return  h('span',{
                  style: {
                    color: 'red'
                  }
                },"使用中");
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
                      this.edit(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.Delete(params.row.id)
                    }
                  }
                }, '删除'),
              ]);
            }
          }

        ],
        roomInfo:{
          roomNumber: '',
          roomName: '',
          roomStatus: '',
          storeId: '',
          storeName:'',
          id:''
        },
        data:[],
        isShow: false,
        serser:'',
        serShow: false,
        r_title:'',

      }
    },
    created(){

      this.getRoomList(1);
    },
    methods:{
      getRoomList(page){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": this.userInfo.authToken
          },
          url: r_list()+'?page='+page+'&pageSize=20',
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });

      },
      serc(){
        if(this.serser == ''){
          this.$Message.error('请输入搜索房间号');
          return;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken,
          },
          url: r_search() +'?id='+this.serser,
        }).then( (res)=>{
          this.data = res.data;
          this.serShow = true;
        }).catch((err)=>{

        })
      },
      serBack(){
        this.getRoomList(1);
        this.serShow = false;
      },
      newEm(){
        this.isShow = true;
        this.r_title = '录入房间信息';
        this.roomInfo={
            roomNumber: '',
            roomName: '',
            roomStatus: 0,
            storeId: this.userInfo.storeId,
            storeName:'',
            id:''
        };
      },
      ok(){
        let URL;
        if(this.r_title=='修改房间信息'){
          URL = r_edit();
        }else {
          URL = r_save();
        }
        if(this.roomInfo.roomNumber == '' || this.roomInfo.roomName == ''){
          this.$Message.warning('请填写完整信息');
          return;
        }
        this.$ajax({
          method: 'POST',
          url: URL,
          data: this.roomInfo,
          headers:{
            "authToken": this.userInfo.authToken,
          },
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
        }).then( (res) =>{
          this.$Message.success('录入成功');
          this.getRoomList(1);
        }).catch((err) =>{
          this.$Message.error('录入失败');
        })

      },
      edit(data){
        this.isShow = true;
        this.r_title = '修改房间信息';
        this.roomInfo = JSON.parse(JSON.stringify(data));
      },
      Delete(id){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers:{
            "authToken": this.userInfo.authToken,
          },
          url: r_delete()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getRoomList(1);
        }).catch( (err)=>{
          this.$Message.error('删除失败');
        })
      }

    }


  }
</script>

<style scoped>

</style>
