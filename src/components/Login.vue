<template>
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    label-position="left"
    label-width="0px"
    class="login-container"
  >
    <el-form-item>
      <el-image :src="simgUrl" class="form-img"></el-image>
    </el-form-item>
    <el-form-item>
      <el-image :src="bimgUrl"></el-image>
    </el-form-item>
    <el-form-item prop="account">
      <el-input v-model="loginForm.account" placeholder="账号" clearable></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.checkPass" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="check" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;" label-width="25%">
      <el-button type="primary" @click="login" :loading="loading">登录</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import simgUrl from "@/assets/wise-logo.svg";
import bimgUrl from "@/assets/wisepaas.png";
export default {
  name: "LoginIn",
  data() {
    return {
      simgUrl: simgUrl,
      bimgUrl: bimgUrl,
      loading: false,
      loginForm: {
        account: "",
        checkPass: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      check: true
    };
  },
  mounted: function() {
    let userCookie = this.getCookie("WISEUser");
    if (userCookie != null && userCookie != "" && userCookie != "undefined") {
      let parms = {
        username: userCookie
      };
      this.$ajax
        .post(this.GLOBALVARIABLE.BASE_URL + "/login/role", parms)
        .then(response => {
          this.$router.push({ name: "MainView" });
        })
        .catch(function(re) {
          console.log(re);
        });
    }
  },
  methods: {
    reset() {
      this.$refs.loginForm.resetFields();
    },
    // login in
    login(ev) {
      let _this = this;
      _this.loading = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let parms = {
            username: this.loginForm.account,
            password: this.loginForm.checkPass
          };
          let config = JSON.parse(JSON.stringify(parms));
          this.$ajax
            .post(this.GLOBALVARIABLE.BASE_URL + "/login/user", config)
            .then(response => {
              _this.loading = false;
              let res = JSON.stringify(response.data);
              if (res === "401" || res === "403") {
                _this.$message({
                  type: "warning",
                  message: "username or password is incorrect! please check!"
                });
              } else if (res == "200") {
                this.$router.push({ name: "MainView" });
              } else {
                _this.$message({
                  type: "error",
                  message: "Login failed!"
                });
              }
            })
            .catch(function(re) {
              console.log(re);
              _this.loading = false;
              _this.$message({
                type: "warning",
                message: "Login failed!"
              });
            });
        } else {
          _this.loading = false;
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 330px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 0px solid #fff;
  box-shadow: #fff;
  .form-img {
    width: 100px;
    height: 30px;
  }
  .remember {
    margin: 0px auto 35px 0px;
  }
}
</style>