<template>
  <div>
    <div class="app-container">
      <div class="form-style1">
        <span>数据字典</span>
        <el-divider></el-divider>
        <el-form
          :model="dictionaryForm"
          :rules="dictionaryRules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="dictionaryForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关键字" prop="code">
                <el-input v-model="dictionaryForm.code" :disabled="isEdit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="说明">
            <el-input type="textarea" v-model="dictionaryForm.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-style1" style="margin-top:20px">
        <span>数据项</span>
        <el-divider></el-divider>
        <el-table
          :data="list"
          v-loading="listLoading"
          element-loading-text="Loading"
          fit
          highlight-current-row
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column label="序号" type="index" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index}}</span>
            </template>
          </el-table-column>
          <el-table-column label="值" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="文本" min-width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="默认值" min-width="100" align="center">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="filterState(scope.row.isDefault)"></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150" align="center">
            <template slot-scope="scope">
              <div>
                <i class="el-icon-edit" @click="editItem(scope.row)"></i>
                <i
                  class="el-icon-delete"
                  @click="deleteItem(scope.row)"
                  style="color:red;margin-left:20px"
                ></i>
                <button class="change-order-button" @click="onDataDictItemUp(scope.row)" >
                  ↑
                </button>
                <button class="change-order-button" @click="onDataDictItemDown(scope.row)" >
                  ↓
                </button>
              </div>
              <!-- <div style="display: flex; flex-direction: column; font-size: .1rem; margin-left: 10px">
                <button class="change-order-button" @click="onDataDictItemUp(row,$index)" :disabled="$index === 0">
                  ↑
                </button>
                <button class="change-order-button" @click="onDataDictItemDown(row,$index)" :disabled="$index === dataDictItemList.length - 1">
                  ↓
                </button>
              </div> -->
            </template>
          </el-table-column>
        </el-table>
        <el-button icon="el-icon-plus" class="add_btn" size="small" @click="addItem()">新增</el-button>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form
          :model="itemForm"
          :rules="itemFormRules"
          ref="itemForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="值" prop="value">
            <el-input
              v-model.number="itemForm.value"
              placeholder="请输入值"
              :disabled="title=='修改数据项'&&isEdit==true"
            ></el-input>
          </el-form-item>
          <el-form-item label="文本" prop="name">
            <el-input v-model="itemForm.name" placeholder="请输入文本"></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <el-radio v-model="itemForm.isDefault" label="1">是</el-radio>
            <el-radio v-model="itemForm.isDefault" label="0">否</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;margin-bottom:10px">
          <el-button type="primary" @click="submitForm('itemForm')" style="width:180px">保存</el-button>
          <el-button @click="resetForm('itemForm')" style="width:180px">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div
      slot="footer" 
      style="text-align: right;color: #5d5b5b;font-size:14px;margin:10px;background: #fff;"
    >
      <el-button type="primary" class = "submit" style="width:180px" size="small" @click="submit('ruleForm')">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dictionaryForm: {
        code: "",
        name: "",
        description: ""
      },
      dictionaryRules: {
        code: [{ required: true, message: "名称为必填项", trigger: "blur" }],
        name: [{ required: true, message: "关键字为必填项", trigger: "blur" }]
      },
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      itemForm: {
        value: "",
        name: "",
        isDefault: "0"
      },
      value: "",
      title: "新增数据项",
      itemFormRules: {
        value: [
          { required: true, message: "请输入值", trigger: "blur" },
          { type: "number", message: "值必须为数字值" }
        ],
        name: [{ required: true, message: "请输入文本", trigger: "blur" }]
      },
      isEdit: false,
      dic: [],
      index: 0,
      row: []
    };
  },
  created() {
    console.log("this.$route.query.code??????????????? = "+this.$route.query.code)
    if (this.$route.query.code != undefined) {
      this.isEdit = true;
      this.getDetails(this.$route.query.code);
    }
  },
  methods: {
    getDetails(code) {
      this.listLoading = true;
      console.log("code???????????????? = "+code)
      this.$http.get("/api/dictionaries?code=" + code).then(
        res => {
          this.listLoading = false;
          this.dictionaryForm = res.data.dict[0];
          this.dic = res.data.dict[0];
          this.list = res.data.detail;
        },
        res => {
          this.$router.push({
            path: "/" + res
          });
        }
      );
    },

    filterState(state) {
      if (state == "1") {
        return true;
      } else {
        return false;
      }
    },
    deleteItem(row) {
      //删除数据项
      this.row = row;
      for (var i in this.list) {
        if (
          (this.list[i].index == this.row.index &&
            this.list[i].index != null &&
            this.list[i].index != undefined &&
            this.row.index != null &&
            this.row.index != undefined) ||
          (this.list[i].id == this.row.id &&
            this.list[i].id != null &&
            this.list[i].id != undefined &&
            this.row.id != null &&
            this.row.id != undefined)
        ) {
          this.list.splice(i, 1);
          break;
        }
      }

      if (row.id != null && row.id != undefined) {
        var data = [];
        console.log(row);
        data.push(row.id);
        this.$http.delete("/api/dictionaries?del_list=" + data).then(
          res => {
            if (res.data.respCode == "1") {
              this.$alert("数据项删除成功", "成功", {
                confirmButtonText: "确定"
              });
            } else {
              this.$alert(res.data.respCode, "失败", {
                confirmButtonText: "确定"
              });
            }
          },
          res => {
            this.$router.push({
              path: "/" + res
            });
          }
        );
      }
    },
    editItem(row) {
      //修改数据项
      this.row = row;
      this.itemForm.value = parseInt(row.value);
      this.itemForm.name = row.name;
      this.itemForm.isDefault = row.isDefault.toString();
      this.dialogFormVisible = true;
      this.index = row.index;
      this.title = "修改数据项";
    },
    addItem() {
      //新增数据项
      this.itemForm.value = "";
      this.itemForm.name = "";
      this.itemForm.isDefault = "0";
      this.dialogFormVisible = true;
      this.title = "新增数据项";
    },
    onDataDictItemUp(row,) {
      console.log("this.list = "+JSON.stringify(this.list));
      console.log("this.row = "+JSON.stringify(row));

      let index = parseInt(row.code);
      const tempListItem = this.list[(index+this.list.length)%this.list.length];
      this.list[(index+this.list.length)%this.list.length] = this.list[(index-1+this.list.length)%this.list.length];
      this.list[(index-1+this.list.length)%this.list.length] = tempListItem;
       const tempcode = this.list[(index+this.list.length)%this.list.length].code;
      this.list[(index+this.list.length)%this.list.length].code = this.list[(index-1+this.list.length)%this.list.length].code;
      this.list[(index-1+this.list.length)%this.list.length].code = tempcode;
      console.log("typeof = = "+typeof(index));
      console.log("index = "+index);
      console.log("this.list = //////////////"+JSON.stringify(this.list));
      console.log("this.row = ///////////////////"+JSON.stringify(row));
      // console.log("this.list[row.code] = "+JSON.stringify(this.list[row.code]));
      // const tempDataDictItem = this.dataDictItemList[index]
      // this.dataDictItemList[index] = this.dataDictItemList[index - 1]
      // this.dataDictItemList[index - 1] = tempDataDictItem
      // this.dataDictItemTableKey = Math.random()
    },
    onDataDictItemDown(row) {
      console.log("this.list = "+JSON.stringify(this.list));
      console.log("this.row = "+JSON.stringify(row));

      let index = parseInt(row.code);
      const tempListItem = this.list[(index+this.list.length)%this.list.length];
      this.list[(index+this.list.length)%this.list.length] = this.list[(index+1+this.list.length)%this.list.length];
      this.list[(index+1+this.list.length)%this.list.length] = tempListItem;
       const tempcode = this.list[(index+this.list.length)%this.list.length].code;
      this.list[(index+this.list.length)%this.list.length].code = this.list[(index+1+this.list.length)%this.list.length].code;
      this.list[(index+1+this.list.length)%this.list.length].code = tempcode;
      console.log("typeof = = "+typeof(index));
      console.log("index = "+index);
      console.log("this.list = //////////////"+JSON.stringify(this.list));
      console.log("this.row = ///////////////////"+JSON.stringify(row));
    },
    submitForm(formName) {
      //提交数据项
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.title == "新增数据项") {
            this.list.push({
              value: this.itemForm.value,
              name: this.itemForm.name,
              isDefault: this.itemForm.isDefault,
              index: this.list.length
            });
            console.log(this.list);
          } else {
            console.log("this.list = "+JSON.stringify(this.list));
            console.log("this.row = "+JSON.stringify(this.row));
            console.log("this.itemForm.isDefault"+this.itemForm.isDefault)
           
            if(this.itemForm.isDefault){
               for (var i in this.list) {
                  this.list[i].isDefault = 0;
               }
            }
            for (var i in this.list) {
              if (
                (this.list[i].index == this.row.index &&
                  this.list[i].index != null &&
                  this.list[i].index != undefined &&
                  this.row.index != null &&
                  this.row.index != undefined) ||
                (this.list[i].id == this.row.id &&
                  this.list[i].id != null &&
                  this.list[i].id != undefined &&
                  this.row.id != null &&
                  this.row.id != undefined)
              ) {
                this.list[i].name = this.itemForm.name;
                this.list[i].isDefault = this.itemForm.isDefault;
                break;
              }
            }
          }
          this.dialogFormVisible = false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 提交数据字典
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit == false) {
            //添加数据字典
            var details = [];
            for (var i in this.list) {
              details.push({
                value: this.list[i].value,
                name: this.list[i].name,
                is_default: this.list[i].isDefault,
                dict_order: "0",
                code: this.list[i].value
              });
            }
            var data = {
              code: this.dictionaryForm.code,
              name: this.dictionaryForm.name,
              description: this.dictionaryForm.description,
              detail: details
            };
            console.log("data ===== "+JSON.stringify(data))
            this.$http.post("/api/dictionaries", data).then(
              res => {
                console.log("res.data.respCode = "+res.data.respCode)
                if (res.data.respCode == "1") {
                // if (res.data.respCode != "1") {
                  this.$alert("数据字典添加成功", "成功", {
                    confirmButtonText: "确定"
                  });
                } else {
                  this.$alert(res.data.respCode, "失败", {
                    confirmButtonText: "确定"
                  });
                }
                this.$router.push({path: "/dataDictionary"})
              },
              // res => {
              //   this.$router.push({
              //     path: "/" + res
              //   });
              // }
            );
          } else {
            //修改数据字典
            var details = [];
            for (var i in this.list) {
              console.log("this.list[i].id = "+this.list[i].id+"      this.list[i].code = "+this.list[i].code)
              details.push({
                id: this.list[i].id,
                value: this.list[i].value,
                name: this.list[i].name,
                is_default: this.list[i].isDefault,
                dict_order: "0",
                code: this.list[i].value
              });
            }
            var data = {
              id: this.dictionaryForm.id,
              old_code: this.dic.code,
              new_code: this.dictionaryForm.code,
              old_name: this.dic.name,
              new_name: this.dictionaryForm.name,
              description: this.dictionaryForm.description,
              detail: details
            };
            // console.log("data = "+JSON.stringify(data))
            // // console.log("datadetailIdtypeof = "+typeof(data.detail[0].id));
            // var max =-99999;
            // for(var i in data.detail){
            //   if(max<data.detail[i].id){
            //     max =data.detail[i].id;
            //   }
            // }
            // for(var i in data.detail){
            //   data.detail[i].id = max-data.detail[i].id;
            // }
            console.log("data = "+JSON.stringify(data))
            this.$http.patch("/api/dictionaries", data).then(
              res => {
                console.log("res.data = "+JSON.stringify(res.data));
                // success callback
                if (res.data.respCode == "1") {
                  this.$alert("数据字典修改成功", "成功", {
                    confirmButtonText: "确定"
                  });
                } else {
                  this.$alert(res.data.respCode, "失败", {
                    confirmButtonText: "确定"
                  });
                }
                this.$router.push({path: "/dataDictionary"})
              },
              res => {
                this.$router.push({
                  path: "/" + res
                });
              }
            );
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.form-style1 {
  background: #fff;
  padding: 20px;
  /* min-height: 85vh; */
}
</style>
<style>
.el-table__header {
  width: auto !important;
}
.el-table__body {
  width: auto !important;
}
.app-container {
  background-color: #f0f2f5;
  min-height: 100vh;
  height: 100%;
}
.form-style {
  background: #fff;
  padding: 20px;
  min-height: 85vh;
}
.add_btn {
  width: 100%;
  margin-top: 20px;
}
.submit {
 position: absolute;
  left: 85%;
  top: 87%;
  width: 400px;
  margin: 0px 0px 0px 0px;
  border-radius: 5px;
}
.change-order-button {
  background-color: #319795;
  color: white;
  font-weight: 900;
  border: 0;
  margin: 1px;
  cursor: pointer;
  border-radius: 3px;
}

.change-order-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>