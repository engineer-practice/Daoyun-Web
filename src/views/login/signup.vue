<template>
  <div class="login-container">
    <!-- <div class="login-form"> -->
    <!-- <el-row> -->
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <img src="../../assets/cloud.png" style="width:250px" />
        <!-- <h3 class="title">注册</h3> -->
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="邮箱注册" name="1"></el-tab-pane>
          <el-tab-pane label="手机号注册" name="2"></el-tab-pane>
        </el-tabs>
      </div>
       <el-form
        v-show="activeName == '1'"
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user-solid"
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="message">
        <el-row>
          <el-col :span="15">
            <el-input
              prefix-icon="el-icon-message"
              name="password"
              v-model="loginForm.message"
              autocomplete="on"
              placeholder="请输入验证码"
            />
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button
              type="primary"
              plain
              :disabled="isDisabled"
              @click="getMessage()"
              id="dyMobileButton"
            >{{butName}}</el-button>
          </el-col>
        </el-row>
       <!-- lgs  ///////////////////////////////////////////////////////////// -->
        <el-row id="yzm">
          <el-col>
            <label v-show="isdisplay==true">{{yzmnum}}</label>
          </el-col>
        </el-row>
      <!-- lgs ////////////////////////////////////////////////////////////////////-->
      </el-form-item>
      <el-form-item prop="pass">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model="loginForm.pass"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          prefix-icon="el-icon-finished"
          type="password"
          v-model="loginForm.checkPass"
          autocomplete="off"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width:100%;margin-bottom:10px;"
        :loading="loading"
        @click="signup"
      >注册</el-button>
      <el-link type="primary" style="float:right" @click="login">已有账号，去登录</el-link>
    </el-form>
    <el-form
        v-show="activeName == '2'"
        autocomplete="on"
        :model="loginForm1"
        :rules="loginRules1"
        ref="loginForm1"
        label-position="left"
      >
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user-solid"
          name="username"
          type="text"
          v-model="loginForm1.username"
          autocomplete="on"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="message">
        <el-row>
          <el-col :span="15">
            <el-input
              prefix-icon="el-icon-message"
              name="password"
              v-model="loginForm1.message"
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
       <!-- lgs  ///////////////////////////////////////////////////////////// -->
        <el-row id="yzm">
          <el-col>
            <label v-show="isdisplay==true">{{yzmnum}}</label>
          </el-col>
        </el-row>
      <!-- lgs ////////////////////////////////////////////////////////////////////-->
      </el-form-item>
      <!-- <el-form-item prop="pass">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model="loginForm1.pass"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          prefix-icon="el-icon-finished"
          type="password"
          v-model="loginForm1.checkPass"
          autocomplete="off"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item> -->
      <el-button
        type="primary"
        style="width:100%;margin-bottom:10px;"
        :loading="loading"
        @click="signup"
      >注册</el-button>
      <el-link type="primary" style="float:right" @click="login">已有账号，去登录</el-link>
      </el-form>
    </el-form>
    <!-- </el-row> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      var pattern=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.loginForm.checkPass !== "") {
        //   this.$refs.loginForm.validateField("checkPass");
        // }
        if(!pattern.exec(value)){
           callback(new Error("6-16位，由数字、英文、符号三种类型构成，至少包含两种类型字符"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm1.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        message: "",
        pass: "",
        checkPass: ""
      },
      loginForm1: {
        username: "",
        message: "",
        pass: "",
        checkPass: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: ["blur", "change"]
          }
        ],
        message: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      loginRules1: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            // type: "email",
            message: "请输入正确的手机号",
            trigger: ["blur", "change"]
          }
        ],
        message: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass3, trigger: "blur" }
        ]
      },
      loading: false,
      activeName: "1",
      butName: "获取验证码",
      isDisabled: false,
      validateCode: "",
      isdisplay:false,//显示验证码
      yzmnum:1234,
    };
  },
  methods: {
    handleClick(tab, event) {},
    getMessage() {//获取邮箱验证码
      var time = 60;
      this.$refs.loginForm.validateField("username", errMsg => {
        if (errMsg) {
        } else {
          var data = {
            email: this.loginForm.username
          };
          this.$http.post("/api/sendCode", null, {
                params: data
              }).then(
            res => {
                if (res.data.respCode == "请输入真实邮箱") {
                this.$alert("请输入真实邮箱!", "失败", {
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
        }
      });
    },
    getPhoneMessage() {//获取手机验证码
      var time = 60;
      this.$refs.loginForm1.validateField("username", errMsg => {
        if (errMsg) {
        } else {
          var data = {
            telephone: this.loginForm1.username
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
        }
      });
    },
    signup() {
      var flag = false;
      var flag1 = false;
       if (this.activeName == "1") {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (localStorage.getItem("validateCode") != this.loginForm.message) {
            this.$alert("验证码错误，请重新输入", "注册失败", {
              confirmButtonText: "确定"
            });
          } else {
            this.loading = true;
            var data = {
              email: this.loginForm.username,
              password: this.loginForm.pass
            };
            this.$http.post("/api/registerByEmail", null, {
                params: data
              }).then(
              res => {
                this.loading = false;
                if (res.data.respCode == "1") {
                  //注册成功  角色默认为教师
                  localStorage.setItem("roleId", "0");
                  // if (res.data.role == "1") {
                  localStorage.setItem("roles", "teacher");
                  // }
                  var date = new Date();
                  localStorage.setItem("loginTime", date.getTime()); //注册时间
                  localStorage.setItem("isLogin", true);
                  localStorage.setItem("Authorization", res.data.token);
                  localStorage.setItem("account", this.loginForm.username);
                  this.$router.push("/home");
                } else {
                  this.loading = false;
                  this.$alert(res.data.respCode, "注册失败", {
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
        } else {
          return false;
        }
      });
      }else{//短信登录
        this.$refs.loginForm1.validate(valid => {
        if (valid) {
          if (localStorage.getItem("validateCode") != this.loginForm1.message) {
            this.$alert("验证码错误，请重新输入", "注册失败", {
              confirmButtonText: "确定"
            });
          } else {
            this.loading = true;
            var data = {
              telephone: this.loginForm1.username,
              // password: this.loginForm1.pass
            };
            this.$http.post("/api/registerByMessage", null, {
                params: data
              }).then(
              res => {
                this.loading = false;
                console.log("res.data (shouji) ="+JSON.stringify(res.data))
                if (res.data.respCode == "1") {
                  //注册成功  角色默认为教师
                  localStorage.setItem("roleId", "0");
                  // if (res.data.role == "1") {
                  localStorage.setItem("roles", "teacher");
                  // }
                  var date = new Date();
                  localStorage.setItem("loginTime", date.getTime()); //注册时间
                  localStorage.setItem("isLogin", true);
                  localStorage.setItem("Authorization", res.data.token);
                  localStorage.setItem("account", this.loginForm1.username);
                  this.$router.push("/home");
                } else {
                  this.loading = false;
                  this.$alert(res.data.respCode, "注册失败", {
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
        } else {
          return false;
        }
      });
      }
    },
    login() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>

.login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    /* background-color: #f8f8f9; */
     background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  /* background-image: url("../../assets/bg.jpg"); */
  /* background-size: cover; */
  background-repeat: no-repeat;
  background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
</style>