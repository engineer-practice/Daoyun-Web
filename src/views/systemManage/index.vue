<template>
  <div class="app-container">
    <div class="form-style">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" size="small" @click="addData()" icon="el-icon-plus">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="deleteData()" icon="el-icon-delete">删除</el-button>
        </el-form-item>

      </el-form>

      <el-table
        :data="list"
        v-loading="listLoading"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <!--
        <el-table-column
          v-for="(item,index) in tableList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
        -->
        <el-table-column label="参数名称" min-width="70" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paraName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="关键字" min-width="50" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.keyName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="值" min-width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.keyValue}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="80">
          <template slot-scope="scope">
            <div>
              <el-link type="primary" @click="editData(scope.row)">编辑</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="danger" @click="deleteUser(scope.row)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :total="totalNum"
        v-if="totalNum!=0"
        :page-size="pageSize"
      ></el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form
        :model="menuForm"
        :rules="menus"
        ref="menuForm"
        label-width="150px"
        class="demo-menuForm"
      >
        <el-form-item label="参数名称" prop="paraName">
          <el-input v-model="menuForm.paraName"></el-input>
        </el-form-item>
       <el-form-item label="关键字" prop="keyName">
          <el-input v-model="menuForm.keyName"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="keyValue">
          <el-input v-model="menuForm.keyValue"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('menuForm')">保存</el-button>
        <el-button @click="resetForm('menuForm')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      tableList: [
        {
          label: "参数名称",
          prop: "paraName"
        },
        {
          label: "关键字",
          prop: "keyName"
        },
        {
          label: "值",
          prop: "keyValue"
        },
      ],
      AllData: [],
      listLoading: false,
      multipleSelection: [],
      dialogFormVisible: false,
      parentList: [],
      menuForm: {
        parentId: "",
        paraName: "",
        keyValue: "",
        keyName: ""
      },
      menus: {
        parentId: [
          { required: true, message: "请选择上级菜单", trigger: "change" }
        ],
        paraName: [{ required: true, message: "参数名称必填", trigger: "blur" }],
        keyName: [{ required: true, message: "关键字必填", trigger: "blur" }],
        keyValue: [{ required: true, message: "值必填", trigger: "blur" }],
      },
      totalNum: 0,
      title: "新增用户",
      pageSize: 10,
      page: 1,

      formInline: {
        menus: "",
        state: ""
      }
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {
    this.showMenuData(this.page);
  },
  methods: {
    reset() {
      this.menuForm.parentId = "";
      this.menuForm.paraName = "";
      this.menuForm.keyValue = "";
      this.menuForm.keyName = "";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addData() {
      var auth = 0;
      var authority = JSON.parse(localStorage.getItem("authority"));
      for (var i = 0; i < authority.length; i++) {
        if (authority[i] == "9") {
          auth = 1;
        }
      }
      if (!auth) {
        this.reset();
        this.dialogFormVisible = true;
        this.title = "新增系统参数";
      } else {
        this.$alert("你没有新增菜单权限", {
          confirmButtonText: "确定"
        });
      }
    },
    deleteUser(row) {
      //单个删除
      var auth = 0;
      var authority = JSON.parse(localStorage.getItem("authority"));
      if (authority) {
        for (var i = 0; i < authority.length; i++) {
          if (authority[i] == "11") {
            auth = 1;
          }
        }
      }
      if (!auth) {
        // var del_list = [];
        // del_list.push(row.id);
        console.log("this.del_list = "+ JSON.stringify(row))
        this.$confirm("确定要删除该菜单？", "删除菜单", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.$http.delete("/api/systems?key_name=" + row.keyName).then(res => {
              console.log("res.data.respCode  = "+res.data.respCode)
              if (res.data.respCode == "1") {
                this.$alert("删除成功", "成功", {
                  confirmButtonText: "确定"
                }).then(() => {
                  this.listLoading = true;
                  this.$http.get("/api/menus").then(res => {
                    localStorage.setItem("menuList", JSON.stringify(res.data));
                  });
                  location.reload();
                  this.showMenuData(this.page);
                });
              }
            });
          })
          .catch(() => {});
      } else {
        this.$alert("你没有删除菜单权限", {
          confirmButtonText: "确定"
        });
      }
    },
    deleteData() {
      //批量删除
      var auth = 0;
      var authority = JSON.parse(localStorage.getItem("authority"));
      if (authority) {
        for (var i = 0; i < authority.length; i++) {
          if (authority[i] == "11") {
            auth = 1;
          }
        }
      }
      if (!auth) {
        if (this.multipleSelection.length == 0) {
          this.$alert("请至少选中一条数据", "批量删除", {
            confirmButtonText: "确定"
          });
        } else {
          var del_list = [];
          for (var i in this.multipleSelection) {
            del_list.push(this.multipleSelection[i].id);
          }
          this.$confirm("确定要删除所选择的菜单？", "删除菜单", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          })
            .then(() => {
              this.$http.delete("/api/menus?ids=" + del_list).then(res => {
                if (res.data.respCode == "1") {
                  this.$alert("删除成功", "成功", {
                    confirmButtonText: "确定"
                  }).then(() => {
                    this.listLoading = true;
                    this.$http.get("/api/menus").then(res => {
                      localStorage.setItem(
                        "menuList",
                        JSON.stringify(res.data)
                      );
                    });
                    location.reload();
                    this.showMenuData(this.page);
                  });
                }
              });
            })
            .catch(() => {});
        }
      } else {
        this.$alert("你没有删除菜单权限", {
          confirmButtonText: "确定"
        });
      }
    },
    editData(row) {
      var auth = 0;
      var authority = JSON.parse(localStorage.getItem("authority"));
      if (authority) {
        for (var i = 0; i < authority.length; i++) {
          if (authority[i] == "10") {
            auth = 1;
          }
        }
      }
      if (!auth) {
        this.menuForm = row;
        //  parentId: "",
        // paraName: "",
        // keyValue: "",
        // keyName: ""
        // this.menuForm.parentId = this.menuForm.parentId.toString();
        // this.menuForm.paraName = this.menuForm.paraName.toString();
        // this.menuForm.keyValue = this.menuForm.keyValue.toString();
        // this.menuForm.keyName = this.menuForm.keyName.toString();
        this.title = "编辑菜单";
        this.dialogFormVisible = true;
      } else {
        this.$alert("你没有编辑菜单权限", {
          confirmButtonText: "确定"
        });
      }
    },
    showMenuData(page) {
      //获取数据
      this.list = [];
      this.listLoading = true;
      this.page = page;
      this.$http.get("/api/systems?page=" + this.page).then(
        res => {
          // success callback
          console.log(res);
          this.listLoading = false;
          this.totalNum = res.data.total;
          if (this.totalNum != 0) {
            this.list = res.data.records;
          }
        },
        res => {
          // this.$message.error('请求失败!  '+res);
          this.listLoading = false;
          this.$router.push({
            path: "/" + res
          });
        }
      );
    },
    getParentList() {
      this.$http.get("/api/menus?parent=1").then(res => {
        this.listLoading = false;
        this.parentList = res.data;
        this.parentList.push("无");
      });
    },

    addUser() {
      this.reset();
      this.dialogFormVisible = true;
      this.title = "新增系统参数";
    },
    submitForm(formName) {
      var data = {
        // id: this.menuForm.id,
        key_name: this.menuForm.keyName,
        key_value: this.menuForm.keyValue,
        para_name: this.menuForm.paraName,
      };
      var addData = {
         key_name: this.menuForm.keyName,
        key_value: this.menuForm.keyValue,
        para_name: this.menuForm.paraName,
      };
      // if(thsi.menuForm.keyValue == "distance"){
      //   alert("关键字重复")
      // }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          if (this.title == "新增系统参数") {
            console.log("this.title is right//////////////////////ok")
            // console.log("this.data2222222222222222222 = "+JSON.stringify(data))
            this.showMenuData(data);
            this.$http.post("/api/systems", null, {
                params: addData
              }).then(
              res => {
                
                console.log("res.data == "+JSON.stringify(res.data))
                // // console.log("res.data.respCode = "+res.data.respCode)
                if (res.data.respCode == "1") {
                 this.$alert("系统参数新增成功", "成功", {
                  confirmButtonText: "确定"
                }).then(() => {
                  this.listLoading = true;
                  this.$http.get("/api/menus").then(res => {
                    localStorage.setItem("menuList", JSON.stringify(res.data));
                  });
                  location.reload();
                  this.showMenuData(this.page);
                });
                } else {
                 this.$alert(res.data.respCode, "失败", {
                  confirmButtonText: "确定"
                });
                this.showMenuData(this.page);
                }
                // this.$router.push({path: "/dataDictionary"})
              },
              // res => {
              //   this.$router.push({
              //     path: "/" + res
              //   });
              // }
            );
          } else {
            this.$http.patch("/api/systems", null, {
                params: addData
              }).then(res => {
              if (res.data.respCode == "1") {
                this.$http.get("/api/menus").then(res => {
                  localStorage.setItem("menuList", JSON.stringify(res.data));
                });
                this.$alert("系统参数修改成功", "成功", {
                  confirmButtonText: "确定"
                }).then(() => {
                  this.listLoading = true;
                  location.reload();
                  this.showMenuData(this.page);
                });
              } else {
                this.$alert("系统参数修改失败", "失败", {
                  confirmButtonText: "确定"
                });
                this.showMenuData(this.page);
              }
            });
          }
        }
      });
    },
    
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.reset();
      this.showMenuData(this.page);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.showMenuData(this.page);
    },
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: center !important;
  margin: 20px 0 !important;
}
.app-container {
  background-color: #f0f2f5;
  min-height: 100vh;
  height: 100%;
}
.form-style {
  background: #fff;
  padding: 20px;
}
</style>
<style>
.el-table__header {
  width: auto !important;
}
.el-table__body {
  width: auto !important;
}
</style>
