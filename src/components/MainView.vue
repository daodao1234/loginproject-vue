<template>
  <el-container style="height: 100%; border: 1px solid #eee" border>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-header>
        <el-button type="primary" round @click="loginOut">login out</el-button>
      </el-header>
      <el-menu default-active="$route.path" router>
        <el-menu-item index="/calendar">首页</el-menu-item>
        <el-menu-item index="/userList" v-if="showUser">用户管理</el-menu-item>
        <el-menu-item index="/deviceList">设备管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container style="background-color: rgb(255, 255, 255)">
      <el-header></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      showUser: this.getCookie("role") === "admin" ? true : false
    };
  },
  methods: {
    loginOut: function() {
      this.$confirm("确认退出吗？", "提示", {}).then(() => {
        this.$ajax
          .delete(this.GLOBALVARIABLE.BASE_URL + "/login/out")
          .then(response => {
            this.$router.push({ name: "LoginIn" });
          })
          .catch(function(re) {
            console.log(re);
          });
      });
    }
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
</style>