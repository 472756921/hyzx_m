<template>
    <div class="content">
      <img :src="imageUrl" size="large" width="100px" height="100px"/>
      <div>
        <label class="fielBtn" for="xFile">修改头像</label>
        <input type="file" id="xFile" class="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleBeforeUpload">
      </div>
      <span style="color: #ed3f14;">(建议尺寸100*100)</span>
      <div>账号：1887003029</div>
      <div>名称：刘德华</div>
      <div>性别：男</div>
      <div>身份证号码：510703********9388 <span class="curs">修改</span></div>
      <div>电话号码：177****7362 <span class="curs">修改</span></div>
      <div>职位：店长</div>
      <div>权限：管理员</div>
      <Button class="hy_btn">修改密码</Button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'b_info',
      data () {
        return {
          visible: false,
          imageUrl: 'http://k2.jsqq.net/uploads/allimg/1706/7_170629152344_5.jpg',
        }
      },
      methods: {
        imgErrorF(file){
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
          });
        },
        imgErrorS(file){
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
          });
        },
        handleBeforeUpload (file) {
          file = file.target.files[0];
          if(file.type.indexOf('image') == -1){
           this.imgErrorF(file);
            return false;
          }
          if(file.size > 1024* 1024 * 2){
            this.imgErrorS(file);
            return false;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (evt) => {
            this.imageUrl = evt.target.result; //这就是base64字符串
          };
        }
      },
    };
</script>

<style scoped>
  .content{
    padding: 0 20px;
    line-height: 30px;
  }
  .curs{
    cursor: pointer;
    color: #2d8cf0;
  }
  .curs:hover{
    color: #66368C;
  }
  .file{
    position: absolute;
    opacity: 0;
  }
  .fielBtn{
    padding: 8px 18px;
    background-color: #66368C;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
  }
  .fielBtn:hover{
    background: #fff;
    color: #66368C;
    border: 1px solid #66368C;
  }
</style>
