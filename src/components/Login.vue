<template>
  <div class="content" @keyup.enter="login()">
    <div class="box">
      <h1>华扬咨询后台系统</h1>
      <div class="box2">
        <input type="text" placeholder="账号" v-model="account"/>
        <input type="password" placeholder="密码" v-model="pwd"/><br/><br/>
        <Checkbox v-model="rember">记住密码</Checkbox><br/>
        <Button type="ghost" class="loginBtn" @click="login">登录</Button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { login } from '../interface';

  export default {
    name: 'Login',
    data(){
      return {
        rember: false,
        account: '',
        pwd: '',
      };
    },
    methods: {
      login() {
        if(this.account == '' || this.pwd == '') {
          this.$Message.warning('请输入账号或密码');
          return
        }
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          data: {account: this.account, password: this.pwd},
          url: login(),
        }).then((res) => {
          sessionStorage.setItem('authToken',res.data.authToken);
          sessionStorage.setItem('userInfo',JSON.stringify(res.data));
          this.$router.push('re_index');
        }).catch((error) => {
          let code = error.response.data.errorCode;
          if (code == 3009) {
            this.$Message.error('账户或密码错误');
          }
        });
      },
    },
  };
</script>

<style scoped>
  .content{
    height:100%;
    background: url("../assets/bk.png");
  }
  .box{
    padding: 60px 10px;
    color: #fff;
    width: 500px;
    margin: 0 auto;
    z-index: 2;
    position: relative;
  }
  h1{
    text-align: center;
  }
  .box2{
    margin: 20px auto;
    padding: 50px 30px;
    background-color:rgba(0,0,0,0.06);
    border-radius: 10px;
    overflow: auto;
  }
  input{
    border: #fff;
    margin: 4px;
    height: 30px;
    width: 200px;
    padding: 4px;
    color: #666;
    font-size: 14px;
    border-radius: 4px;
  }
  .loginBtn{
    color: #ffffff;
    font-size: 14px;
    margin-top: 10px;
  }
  .loginBtn:hover{
    border: 1px solid #eee;
  }
</style>
