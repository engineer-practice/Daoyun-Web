<template>
<div class ="all">
  <div>
    <div class = "logo">
      
    </div>
    <h1 class ="headcolor">帮助</h1>
  </div>
  <div class="forget-wrap">
        <div class="ms-forget">
            <div class="ms-title">设置您的密码</div>
    <!-- <el-form :model="Check" ref="forgetform" class="forgetform"> -->
    <el-form  ref="forgetform" class="forgetform">
        
        <el-form-item label="账号验证" prop="zhanghao">
            <el-input  v-model="ruleForm.zhanghao" placeholder="请输入您的账号"></el-input>
        </el-form-item>
        <el-form-item prop="message">
        <el-row>
          <el-col :span="15">
            <el-input
              prefix-icon="el-icon-message"
              name="password"
              v-model="ruleForm.message"
              autocomplete="on"
              placeholder="请输入验证码"
            />
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button
              type="primary"
              plain
              :disabled="isDisabled"
              @click="getPhoneMessage()"
              id="dyMobileButton"
            >{{butName}}</el-button>
          </el-col>
        </el-row>
    </el-form-item>
        <el-form-item label="新密码" prop="newPsd">
            <el-input type="password" v-model="ruleForm.newPsd" placeholder="请输入新密码"></el-input>
        </el-form-item>
        
        <el-form-item label="确认新密码" prop="checkNewPsd">
            <el-input type="password" v-model="ruleForm.checkNewPsd" placeholder="请再次输入新密码"></el-input>
        </el-form-item>

        <el-form-item>
            <div class="passwordreset-btn">
            <el-button type="primary" @click="changeConfirm">确定修改</el-button>
            </div>
        </el-form-item>
    </el-form>
        </div>
</div>
<div>
    <h1 class ="tailcolor">为了获得最佳浏览效果，建议在分辨率大于或等于 1024*768 的屏幕下浏览网站<br>
2020 - 2021 福州大学数学与计算机学院工程训练2_209<br>
地址：福建省福州市闽侯县上街镇福州大学数计学院2号楼     联系电话：13774763228
</h1>
  </div>
</div>

</template>

<script>
export default {
  // components: {
  // },
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkNewPsd !== "") {
    //       this.$refs.ruleForm.validateField("checkNewPsd");
    //     }
    //     callback();
    //   }
    // };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
       isDisabled: false,
       butName: "获取验证码",
      ruleForm: {},
      userData: {},
      rules: {
        zhanghao: [
          { required: true, message: "请输入您的账号", trigger: "blur" },
        ],
        message: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        newPsd: [{  trigger: "blur" }],
        checkNewPsd: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    changeConfirm() {
      var data = {
              telephone: this.ruleForm.zhanghao,
              newpassword: this.ruleForm.newPsd,
            };
            console.log("this.ruleForm = "+JSON.stringify(this.ruleForm))
            console.log("忘记密码data = "+JSON.stringify(data))
            this.$http.post("/api/user/forgetPassword",  null, {
                params: data
              }).then(res => {
              if (res.data.respCode == "1") {
                this.$alert("密码修改成功，跳转到登录页重新登录", "成功", {
                  confirmButtonText: "确定"
                });
                 this.loading = false;
                this.$router.push("/login");
              } else {
                this.$alert(res.data.respCode, "失败", {
                  confirmButtonText: "确定"
                });
              }
             
            });
      this.$router.push({ path: "/login", query: {} });
    },
    getPhoneMessage() {//获取手机验证码
      var time = 60;
    //   this.$refs.ruleForm.validateField("username", errMsg => {
        // if (errMsg) {
        // } else {
          var data = {
            telephone: this.ruleForm.zhanghao
          };
          this.$http.post("/api/sendMessage", null, {
                params: data
              }).then(
            res => {
                console.log("短信验证码为 ： "+ res.data.respCode)
                if (res.data.respCode == "请输入真实手机号") {
                this.$alert("请输入真实手机号!", "失败", {
                  confirmButtonText: "确定"
                });
              } else {
              localStorage.setItem("validateCode", res.data.respCode);
              }
            },
            res => {
                this.$router.push({
                  path: "/" + res
                });
              }
            
          );

          //倒计时
          let timer = setInterval(() => {
            if (time == 0) {
              clearInterval(timer);
              this.isDisabled = false;
              this.butName = "获取验证码";
            } else {
              this.butName = time + "秒后重试";
              this.isDisabled = true;
              time--;
            }
          }, 1000);
        // }
    //   });
    },
  },
};
</script>
<style scoped>
.forget-wrap {
 position: relative;
  left: 0;
  right: 0;
  width: 100%;
  height: 80%;

  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.all {
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  /* background-image: url(../../assets/img/login-bg.jpg); */
  background-size: 100%;
}
.logo {
  position: absolute;
  left: 330px;
  right: 0;
  width: 200px;
  height: 200px;
  margin:-10px 100px 100px 0px;
  background-image: url(../../assets/img/logo.png);
  background-size: 100%;
  /* border-bottom: 1px solid #ddd; */
  /* margin: 10px auto; */
}
.headcolor {
  width: 100%;
  line-height: 50px;
  /* text-align: right; */
  /* left :50%; */
  padding: 0px 0px 0px 1200px;
  font-size: 10px;
  color: rgb(114, 116, 116);
  /* border-bottom: 1px solid #ddd; */
  /* margin: 10px auto; */
}
.tailcolor {
  width: 100%;
  line-height: 20px;
  text-align: center;
  font-size: 1px;
  color: rgb(114, 116, 116);
  /* border-bottom: 1px solid #ddd; */
  /* margin: 10px auto; */
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: rgb(10, 142, 250);
  border-bottom: 1px solid #ddd;
}
.ms-forget {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 400px;
  margin: -190px 0 0 -330px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7);
  overflow: hidden;
}
.forgetform {
  padding: 30px 30px;
  
  /* color:rgb(10, 142, 250); */
}
.passwordreset-btn {
  text-align: center;
}
.passwordreset-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>