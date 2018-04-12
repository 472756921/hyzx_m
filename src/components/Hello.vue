<template>
  <div class="layout">
    <Row type="flex" style="height: 100%">
      <Col span="3" class="layout-menu-left">
      <Menu :active-name="activename" theme="light" width="auto" :open-names="['1']" @on-select="go">
        <div class="layout-logo-left">华扬咨询</div>
        <MenuItem name="re_index"><i class="iconfont icon-clock"></i>预约管理</MenuItem>
        <MenuItem name="u_index"><i class="iconfont icon-businesscard"></i>用户管理</MenuItem>
        <MenuItem name="ser_index"><i class="iconfont icon-barrage"></i>服务单</MenuItem>
        <MenuItem name="employee"><i class="iconfont icon-addressbook"></i>员工管理</MenuItem>
        <MenuItem name="c_index"><i class="iconfont icon-document"></i>投诉管理</MenuItem>
        <MenuItem name="s_index"><i class="iconfont icon-createtask"></i>库存管理</MenuItem>
        <MenuItem name="p_index"><i class="iconfont icon-manage"></i>项目管理</MenuItem>
        <MenuItem name="r_index"><i class="iconfont icon-dynamic"></i>经营报表</MenuItem>
        <MenuItem name="ro_index"><Icon type="ios-heart-outline"></Icon>床位管理</MenuItem>
      </Menu>
      </Col>
      <Col span="21">
      <div class="layout-header">
        <span class="title">美容院门店系统</span>
        <div class="adminInfo">
          <Avatar :src="userInfo.icon == null ? 'http://k2.jsqq.net/uploads/allimg/1706/7_170629152344_5.jpg': userInfo.icon" size="large" style="vertical-align: middle"/>
          <span class="user" @click="go('b_index')"> &nbsp;&nbsp;{{userInfo.realName}}</span>
          <span> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
          <span class="user" @click="out()">退出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-copy">
        2017-2018 &copy; BENSON
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {logout} from '../interface'
export default {
  name: 'hello',
  data () {
    return {
      userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
      msg: 'Welcome to Your Vue.js App',
      activename: 're_index',
      url:[
        're_index',
        'u_index',
        'ser_index',
        'employee',
        'c_index',
        's_index',
        'p_index',
        'r_index',
        'ro_index',
      ]
    }
  },
  created(){
    this.myBrowser();
    this.checkUrl();
    this.checkLogin();
  },
  methods: {
    go(name) {
      this.$router.push({name: name});
    },
    checkUrl(){
      let test = window.location.href;
      let arr = test.split('/');
      this.activename = arr[arr.length-1];
    },
    checkLogin(){
      if(this.userInfo == '' || this.userInfo==null){
        this.$Message.error('您还未登陆，请登录！');
        this.$router.push({name:'login'});
      }
    },
    myBrowser(){
      const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      const l = userAgent.split(' ');
      if (userAgent.indexOf("Opera") > -1) {
        return "Opera"
      }; //判断是否Opera浏览器
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      } //判断是否Firefox浏览器
      if (userAgent.indexOf("Chrome") > -1){
        return "Chrome";
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } //判断是否Safari浏览器
      if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !userAgent.indexOf("Opera") > -1) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        if (IE55) {
          alert('您的浏览器太老了，我们不再支持');
          window.location.href = 'http://www.goody.com.cn/2014/updatebrowser/';
        }
        if (IE6) {
          alert('您的浏览器太老了，我们不再支持');
          window.location.href = 'http://www.goody.com.cn/2014/updatebrowser/';
        }
        if (IE7) {
          alert('您的浏览器太老了，我们不再支持');
          window.location.href = 'http://www.goody.com.cn/2014/updatebrowser/';
        }
        if (IE8) {
          alert('您的浏览器太老了，我们不再支持');
          window.location.href = 'http://www.goody.com.cn/2014/updatebrowser/';
        }
        if (IE9) {
          alert('您的浏览器太老了，我们不再支持');
          window.location.href = 'http://www.goody.com.cn/2014/updatebrowser/';
        }
      }; //判断是否IE浏览器
    },
    inArray(value,array){
      for(let i = 0; i < array.length; i++){
        if(value === array[i]){
          return true;
        }
      }
      return false;
    },
    out(){
      this.$ajax({
        method: 'POST',
        dataType: 'JSON',
        contentType: 'application/json;charset=UTF-8',
        headers:{
          "authToken": this.userInfo.authToken,
        },
        url:logout(),
        data:{
          authToken: this.userInfo.authToken
        }
      }).then( (res)=>{
      }).catch( (err)=>{})
      this.$Message.success('退出成功！');
      this.$router.push({name: 'login'});
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ivu-menu-item-active:not(.ivu-menu-submenu){
    background-color: #F7EFFE;
    color: #66368C!important;
    font-weight: 600;
    border-right: 2px solid #66368C!important;
  }
  .user:hover{
    cursor: pointer;
    font-weight: 600;
    color: #66368C;
  }
  .title{
    font-weight: 600;
    font-size: 20px;
  }
  .adminInfo{
    float: right;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .layout-content{
    margin: 10px;
    background: #fff;
    border-radius: 4px;
    height: 85%;
    overflow: auto;
  }
  .layout-content-main{
    padding: 10px;
    overflow: hidden;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #fff;
  }
  .layout-header{
    background: #fff;
    padding: 22px 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    border-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #fff;
    background-color: #66368C;
    text-align: center;
  }
</style>
