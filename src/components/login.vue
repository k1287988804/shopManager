<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="./../images/360.png" alt />
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"  prefix-icon="icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prop="password"
            prefix-icon="icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 13, message: "长度在 5 到 13 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate(async valid=>{
        if(!valid) return;
        var {data:res} = await this.$http.post('login',this.loginForm)
        if(res.meta.status !== 200) return this.$message.error("登录失败")
        this.$message.success("登录成功") 
        window.sessionStorage.setItem('token',res.data.token);
        this.$router.push("/home")
      })
    }
  }
};
</script>

<style lang='less' scoped>
.login_container {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      padding: 5px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      img {
        height: 130px;
        width: 130px;
        border-radius: 50%;
      }
    }
    .login_form {
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      position: absolute;
      bottom: 0;
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>