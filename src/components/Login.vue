<template>
  <div class="content" @keyup.enter="login()">
    <div class="box">
      <h1>华扬咨询门店信息系统</h1>
      <div class="box2">
        <input type="text" placeholder="账号" v-model="account"/>
        <input type="password" placeholder="密码" v-model="pwd"/><br/><br/>
        <span><a style="color: #4da6ff!important;" href="http://116.62.201.135/gl/#/register">注册门店</a></span>
        <Checkbox v-model="rember" style="float: right">记住密码</Checkbox>
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
        account: 'hdq0005',
        pwd: '123456',
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
    background: -webkit-linear-gradient(left top, #FAD7A1 , #66368C); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left top, #FAD7A1, #66368C); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left top, #FAD7A1, #66368C); /* Firefox 3.6 - 15 */
    background: linear-gradient(to left top, #FAD7A1 , #66368C); /* 标准的语法 */
  }
  .box{
    color: #fff;
    width: 500px;
    margin: auto;
    height: 500px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    position: absolute;
  }
  h1{
    text-align: center;
  }
  .box2{
    margin: 20px auto;
    padding: 40px;
    background-color:rgba(0,0,0,0.1);
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
    margin: 10px auto;
    display: block;
  }
  .loginBtn:hover{
    border: 1px solid #eee;
  }
</style>
