<template>
  <div class="container">
    <div class="main">
      <h1 class="title">Welcome to 到云!</h1>
      <el-divider></el-divider>
      <div style="margin-left:20px">
        <h3>产品简介</h3>
        <div
          class="des"
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;到云是一款免费课堂互动教学 App。它基于移动互联环境，实现老师与学生之间的即时互动、签到，完善的激励与评价体系激发学生在移动设备上的自主学习兴趣，完整的学习行为记录实现对学生学习的过程性考核，更能为老师提供高质量的教学研究大数据，并实现个性化教学和助教功能。</div>
        <h3>技术顾问联系方式</h3>
        <el-table :data="tableData" style="width: 100%;" border>
          <el-table-column prop="name" label="成员" min-width="180" align="center"></el-table-column>
          <el-table-column prop="sno" label="学号" min-width="180" align="center"></el-table-column>
          <el-table-column prop="telephone" label="联系方式" min-width="180" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"], // 使用 inject 注入 reload 变量
  data() {
    return {
      tableData: [
        {
          name: "林高升",
          sno: "200327170",
          telephone: "17859918979"
        },
        {
          name: "张先涌",
          sno: "200327155",
          telephone: "18760372609"
        },
        {
          name: "欧阳育斌",
          sno: "200327144",
          telephone: "18987588901"
        },
        {
          name: "杨铭",
          sno: "200327105",
          telephone: "13385989351"
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在当前路由改变，路由参数发生变化，组件被复用时调用
    // 里面写获取刷新数据的方法
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    this.showAuthorityList();
    // this.getMenuList();
    // console.log("menulist = "+localStorage.getItem("menuList"))
    // if(localStorage.getItem("isUpdate")==null||localStorage.getItem("isUpdate")==undefined){
    //   localStorage.setItem("isUpdate",1);
    //   this.reload();
    //   // location.reload();
    // }
  },
  methods: {
    showAuthorityList() {
      var roleId = parseInt(localStorage.getItem("roleId"));
      // localStorage.setItem("roleId", 1);
      console.log("roleId = "+JSON.stringify(roleId))
      this.$http.get("/api/rolePower?role_id=" + roleId).then(res => {
        const value = JSON.stringify(res.data);
        localStorage.setItem("authority", value);
      });
    },
    // getMenuList() {
    //   this.$http.get("/api/menus").then(res => {
    //     console.log(res.data)
    //     localStorage.setItem("menuList", JSON.stringify(res.data));
    //   });
    // }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  min-height: 100vh;
  height: 100%;
}
.main {
  background: #fff;
  padding: 20px;
}
.title {
  text-align: center;
  /* font-size: 32px; */
  color: #616060;
  font-family: -webkit-pictograph;
}
h3 {
  color: #3e91e8;
}
.des {
  border: 1px solid #dcdfe6;
  padding: 20px 10px;
  color: #696767;
}
</style>
