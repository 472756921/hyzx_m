<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  a:link {color: #66368C!important;}		/* 未访问的链接 */
  a:visited {color: #66368C!important;}	/* 已访问的链接 */
  a:hover {color: #66368C!important;}	/* 鼠标移动到链接上 */
  a:active {color: #66368C!important;}
  .prC{
    background-color: #66368C!important;;
  }
  .ivu-input-group-append{
    background-color: #66368C!important;;
    color: #fff!important;;
    border: none!important;;
  }
  .hy_btn{
    background-color: #66368C!important;
    color: #fff!important;;
  }
  .hy_btn:hover {
    border-color: #66368C!important;
    color: #66368C!important;;
    background-color: #fff!important;
  }
  .option{
    padding: 10px 10px 16px!important;;
    border-bottom: 10px solid #F5F7F9!important;;
  }
  #app{
    min-width: 1100px!important;;
  }
</style>
