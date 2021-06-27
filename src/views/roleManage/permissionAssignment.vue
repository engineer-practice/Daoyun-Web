<template>
  <div class="app-container">
    <div class="form-style">
      <div></div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <span>当前正在为</span>
        </el-form-item>
        <el-form-item>
          <el-tag>{{ this.$route.query.username}}</el-tag>
        </el-form-item>
        <el-form-item>
          <span>分配权限</span>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <h5>菜单显示</h5>
      <el-checkbox-group v-model="showList">
        <el-checkbox label="1">首页</el-checkbox>
        <el-checkbox label="2">角色管理</el-checkbox>
        <el-checkbox label="3">用户管理</el-checkbox>
        <el-checkbox label="4">数据字典管理</el-checkbox>
        <el-checkbox label="5">菜单管理</el-checkbox>
        <el-checkbox label="6">系统参数管理</el-checkbox>
        <el-checkbox label="7">学校管理</el-checkbox>
        <el-checkbox label="8">班课管理</el-checkbox>
      </el-checkbox-group>
      <div class = "regular">
          <span>规则：点击对应菜单，为该角色分配相对应的菜单</span>
      </div>
      <el-divider></el-divider>
      <h5>用户管理</h5>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="1">新增用户</el-checkbox>
        <el-checkbox label="2">删除用户</el-checkbox>
        <el-checkbox label="3">编辑用户</el-checkbox>
        <el-checkbox label="4">分配角色</el-checkbox>
        <el-checkbox label="5">恢复角色状态</el-checkbox>
        <el-checkbox label="6">重置密码</el-checkbox>
        <el-checkbox label="7">查询</el-checkbox>
        <el-checkbox label="8">禁用用户</el-checkbox>
      </el-checkbox-group>
      <div class = "regular">
          <span>规则：点击对应功能，为该用户分配相对应的权限</span>
      </div>
      <el-divider></el-divider>
      <h5>菜单管理</h5>
      <el-checkbox-group v-model="menuList">
        <el-checkbox label="1">新增菜单</el-checkbox>
        <el-checkbox label="2">编辑菜单</el-checkbox>
        <el-checkbox label="3">删除菜单</el-checkbox>
        <el-checkbox label="4">查询菜单</el-checkbox>
      </el-checkbox-group>
      <div class = "regular">
          <span>规则：点击对应菜单选项，为该用户分配相对应的权限</span>
      </div>
      <el-divider></el-divider>
      <!--
      <h5>班课管理</h5>
      <el-checkbox-group v-model="classList">
        <el-checkbox label="1">发起签到</el-checkbox>
        <el-checkbox label="2">创建班课</el-checkbox>
        <el-checkbox label="3">创建活动</el-checkbox>
        <el-checkbox label="4">分配小组</el-checkbox>
      </el-checkbox-group>
      -->
      <div class="foot">
        <el-button type="primary" class="but" @click="saveRolePer()">保存</el-button>
        <el-button type="info" plain class="but" @click="reset()">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showList: [],
      checkList: [],
      menuList: [],
      classList: [],
      perList: [],
      saveList: ""
    };
  },
  created() {
    this.showRolePer();
  },
  methods: {
    reset() {
      this.checkList = [];
      this.menuList = [];
      this.classList = [];
      this.showList = [];
    },
    showRolePer() {
      this.perList = [1,2,3,4,10,12];
      var curroles = this.$route.query.username;
      if(curroles == "superadmin"){
        this.showList = ["1","2","3","4","5","6","7","8"];
        // this.showList = ["1","4","5","6","7","8"];
        this.checkList = ["1","2","3","4","5","6","7","8"];
        this.menuList = ["1","2","3","4"];
      }else if(curroles == "admin"){
        this.showList = ["1","4","5","6","7","8"];
        this.checkList = ["1","2","3","6","7","8"];
        this.menuList = ["1","2","3","4"];
      }
      else if(curroles == "teacher"){
        this.showList = ["1","5","6","7","8"];
        this.checkList = ["2","6","7"];
        this.menuList = ["3","4"];
      }
      // if (this.perList == 0) {
      //   this.checkList = [];
      //   this.menuList = [];
      // } else {
      //   for (var i = 0; i < 12; i++) {
      //     if (this.perList[i] != 0 && this.perList[i] <= 8) {
      //       this.checkList.push(this.perList[i]);
      //     }
      //     if (this.perList[i] > 8) {
      //       var menuNum = (this.perList[i] - 8).toString();
      //       this.menuList.push(menuNum);
      //     }
      //   }
      // }
    },
    saveRolePer() {
      // if (this.checkList.length == 0 && this.menuList.length == 0) {
      //   this.saveList = 0;
      // } else {
      //   if (this.menuList.length != 0) {
      //     for (var i = 0; i < this.menuList.length; i++) {
      //       this.menuList[i] = (parseInt(this.menuList[i]) + 8).toString();
      //     }
      //   }
      //   if (this.checkList.length != 0) {
      //     this.saveList = this.checkList[0];
      //     for (var i = 1; i < this.checkList.length; i++) {
      //       this.saveList += ",";
      //       this.saveList += this.checkList[i];
      //     }
      //   }
      //   if (this.menuList.length != 0) {
      //     this.saveList += ",";
      //     this.saveList += this.menuList[0];
      //     for (var i = 1; i < this.menuList.length; i++) {
      //       this.saveList += ",";
      //       this.saveList += this.menuList[i];
      //     }
      //   }
      // }
      var power_id = this.saveList;
      this.$alert("保存成功", "成功", {
              confirmButtonText: "确定"
            });
      // this.$http
      //   .put(
      //     "/api/rolePower?role_id=" +
      //       this.$route.query.id +
      //       "&power_id=" +
      //       power_id
      //   )
      //   .then(res => {
      //     if (res.data.respCode == "1") {
      //       this.$http
      //         .get("/api/rolePower?role_id=" + this.$route.query.id)
      //         .then(res => {
      //           localStorage.setItem("authority", JSON.stringify(res.data));
      //         });
      //       this.$alert("保存成功", "成功", {
      //         confirmButtonText: "确定"
      //       });
      //       this.$router.push("/roleManage");
      //     } else {
      //       this.$alert("保存失败", "失败", {
      //         confirmButtonText: "确定"
      //       });
      //     }
      //   });
    }
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
  min-height: 85vh;
}
.el-form-item {
  margin-bottom: 0px;
}
.foot {
  text-align: center;
  margin-top: 30px;
}
.but {
  width: 180px;
}
.regular {
   font-size: 3px;
}
</style>