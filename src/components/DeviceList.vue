<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="设备名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDevice">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd" v-if="operation">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="tableData" highlight-current-row style="width:100%" v-loading="queryLoading">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="id" label="id" v-show="true"></el-table-column>
      <el-table-column prop="name" label="设备名" width="360"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="320"></el-table-column>
      <el-table-column label="操作" width="150" v-if="operation">
        <template slot-scope="scope" v-if="operation">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- add form-->
    <el-dialog
      :visible.sync="addFormVisible"
      title="新增"
      :close-on-click-modal="false"
      center
      width="25%"
    >
      <el-form :model="addForm" label-width="80px" ref="addForm">
        <el-form-item label="设备" prop="name">
          <el-input placeholder="请输入设备名" v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input placeholder="请输入设备类型" v-model="addForm.type" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">提 交</el-button>
      </div>
    </el-dialog>

    <!-- edit form-->
    <el-dialog
      :visible.sync="editFormVisible"
      title="编辑"
      :close-on-click-modal="false"
      center
      width="25%"
    >
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="设备" prop="name">
          <el-input placeholder="请输入设备名" v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input placeholder="请输入设备类型" v-model="editForm.type" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
      </div>
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
      queryLoading: false,
      addFormVisible: false,
      editFormVisible: false,
      addLoading: false,
      editLoading: false,
      operation: this.getCookie("role") === "admin" ? true : false,
      tableData: [],

      addForm: {
        name: "",
        type: ""
      },

      editForm: {
        name: "",
        type: ""
      }
    };
  },
  methods: {
    getDevice: function() {
      this.queryLoading = true;
      let para = {
        deviceName: this.filters.name,
        userName: this.getCookie("WISEUser")
      };
      this.$ajax
        .get(this.GLOBALVARIABLE.BASE_URL + "/dev/deviceList", { params: para })
        .then(response => {
          let res = JSON.stringify(response.status);
          this.queryLoading = false;
          if ("200" === res) {
            this.tableData = response.data;
          }
        })
        .catch(function(re) {
          this.queryLoading = false;
          console.log(re);
        });
    },
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        name: "",
        type: ""
      };
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    handleDel: function(index, row) {
      this.$confirm("确认删除吗？", "提示", {}).then(() => {
        this.addLoading = true;
        let para = { id: row.id };
        this.$ajax
          .delete(this.GLOBALVARIABLE.BASE_URL + "/dev/deletion", {
            data: para
          })
          .then(response => {
            this.addLoading = false;
            this.getDevice();
            this.$message({
              type: "warning",
              message: "delete successfully!"
            });
          })
          .catch(response => {
            this.addLoading = false;
            console.log(response);
            this.$message({
              type: "warning",
              message: "delete failed!"
            });
          });
      });
    },
    addSubmit: function() {
      this.$confirm("确认新增吗？", "提示", {}).then(() => {
        this.addLoading = true;
        let para = Object.assign({}, this.addForm);
        this.$ajax
          .post(this.GLOBALVARIABLE.BASE_URL + "/dev/device", para)
          .then(response => {
            this.addLoading = false;
            if (response.data === 1) {
              this.addFormVisible = false;
              this.getDevice();
            } else {
              this.$message({
                type: "warning",
                message: "add failed!"
              });
            }
          })
          .catch(response => {
            this.addLoading = false;
            console.log(response);
            this.$message({
              type: "warning",
              message: "add failed!"
            });
          });
      });
    },
    editSubmit: function() {
      this.$confirm("确认修改吗？", "提示", {}).then(() => {
        this.editLoading = true;
        let para = Object.assign({}, this.editForm);
        this.$ajax
          .put(this.GLOBALVARIABLE.BASE_URL + "/dev/edition", para)
          .then(response => {
            this.editLoading = false;
            this.editFormVisible = false;
            this.getDevice();
            this.$message({
              type: "info",
              message: "edit successfully!"
            });
          })
          .catch(response => {
            this.editLoading = false;
            console.log(response);
            this.$message({
              type: "warning",
              message: "edit failed!"
            });
          });
      });
    }
  },
  mounted() {
    this.getDevice();
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