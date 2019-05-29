<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="tableData" highlight-current-row style="width:100%" v-loading="loading">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="id" label="id" width="200"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="320"></el-table-column>
      <el-table-column prop="role" label="角色" min-width="220"></el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="small" @click="handDevice(scope.$index, scope.row)">分配设备</el-button>
          <el-button size="small" @click="viewDevice(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- add form-->
    <el-dialog
      :visible.sync="addFormVisible"
      title="分配设备"
      :close-on-click-modal="false"
      center
      width="40%"
    >
      <el-table
        :data="deviceData"
        highlight-current-row
        style="width:100%"
        v-loading="queryLoading"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column prop="id" label="id" v-show="true"></el-table-column>
        <el-table-column prop="name" label="设备" width="220"></el-table-column>
        <el-table-column prop="type" label="类型" min-width="220"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addDevice">确定</el-button>
      </div>
    </el-dialog>

    <!-- view form-->
    <el-dialog
      :visible.sync="viewFormVisible"
      title="已分配设备"
      :close-on-click-modal="false"
      center
      width="40%"
    >
      <el-table
        :data="deviceViewData"
        highlight-current-row
        style="width:100%"
        v-loading="viewLoading"
      >
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column prop="id" label="id" v-show="true"></el-table-column>
        <el-table-column prop="name" label="设备" width="220"></el-table-column>
        <el-table-column prop="type" label="类型" min-width="220"></el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      userId: "",
      sels: [], // selected device
      loading: false,
      tableData: [],
      deviceData: [],
      deviceViewData: [],
      addFormVisible: false,
      queryLoading: false,
      viewLoading: false,
      viewFormVisible: false
    };
  },
  methods: {
    getUser: function() {
      this.loading = true;
      let para = {
        userName: this.filters.name
      };
      this.$ajax
        .get(this.GLOBALVARIABLE.BASE_URL + "/sys/userList", { params: para })
        .then(response => {
          this.loading = false;
          let res = JSON.stringify(response.status);
          if ("200" === res) {
            this.tableData = response.data;
            this.loading = false;
          }
        })
        .catch(function(re) {
          this.loading = false;
          console.log(re);
        });
    },
    handDevice: function(index, row) {
      this.addFormVisible = true;
      this.getDevice();
      this.userId = row.id;
    },
    getDevice: function() {
      this.queryLoading = true;
      let para = {
        deviceName: "",
        userName: this.getCookie("WISEUser")
      };
      this.$ajax
        .get(this.GLOBALVARIABLE.BASE_URL + "/dev/deviceList", { params: para })
        .then(response => {
          let res = JSON.stringify(response.status);
          this.queryLoading = false;
          if ("200" === res) {
            this.deviceData = response.data;
          }
        })
        .catch(function(re) {
          this.queryLoading = false;
          console.log(re);
        });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    addDevice: function() {
      this.$confirm("确认分配此设备吗？", "提示", {}).then(() => {
        this.queryLoading = true;
        let deviceIds = "";
        for (let sel of this.sels) {
          deviceIds += sel.id + ",";
        }
        let para = {
          userId: this.userId,
          deviceIds: deviceIds
        };
        this.$ajax
          .post(this.GLOBALVARIABLE.BASE_URL + "/auth/distribution", para)
          .then(response => {
            this.queryLoading = false;
            if (response.data >= 1) {
              this.addFormVisible = false;
              this.$message({
                type: "info",
                message: "distribute successfully!"
              });
            } else {
              this.$message({
                type: "warning",
                message: "distribute failed!"
              });
            }
          })
          .catch(response => {
            this.queryLoading = false;
            console.log(response);
            this.$message({
              type: "warning",
              message: "distribute failed!"
            });
          });
      });
    },
    viewDevice: function(index, row) {
      this.viewFormVisible = true;
      this.viewLoading = true;
      let para = {
        deviceName: "",
        userName: row.userName
      };
      this.$ajax
        .get(this.GLOBALVARIABLE.BASE_URL + "/dev/deviceList", { params: para })
        .then(response => {
          let res = JSON.stringify(response.status);
          this.viewLoading = false;
          if ("200" === res) {
            this.deviceViewData = response.data;
          }
        })
        .catch(function(re) {
          this.viewLoading = false;
          console.log(re);
        });
    }
  },
  mounted() {
    this.getUser();
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