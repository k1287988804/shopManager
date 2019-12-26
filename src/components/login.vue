<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="./../images/360.png" alt="">
      </div>
      <el-form ref="form" :model="loginForm" label-width="0px" class='login_form'>
        <!-- 用户名 -->
        <el-form-item>
          <el-input v-model="loginForm.username" prefix-icon="icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input v-model="loginForm.password" prefix-icon="icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class='btns'>
           <el-button type="primary">登录</el-button>
           <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      loginForm:{
        username:'',
        password:''
      }
    }
  }
};
</script>

<style lang='less' scoped>
.login_container {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
  .login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position:absolute;
    left: 50%;
    top:50%;
    transform:translate(-50%,-50%);
    .avatar_box{
      height: 130px;
      width: 130px;
      border:1px solid #eee;
      border-radius: 50%;
      box-shadow:0 0 10px #ddd;
      padding: 5px;
      background-color: #fff;
      position:absolute;
      left: 50%;
      transform:translateX(-50%) translateY(-50%);
      img{
        height: 130px;
        width: 130px;
        border-radius: 50%;
      }
    }
    .login_form{
      width: 100%;
      box-sizing: border-box;
      padding:0 20px;
      position:absolute;
      bottom:0;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
  }
}
</style>