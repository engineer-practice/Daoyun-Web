<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="ms-title">到云后台管理系统</div>
      <!-- <div class="login-select"> 
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane  label="密码登录" name="1"></el-tab-pane>
            <el-tab-pane id="yzma" label="验证码登录" name="2"></el-tab-pane>
          </el-tabs>
        </div> -->
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="密码登录" name="1"></el-tab-pane>
<<<<<<< HEAD
          <el-tab-pane label="验证码登录" name="2"></el-tab-pane>
=======
          <el-tab-pane label="手机号登录" name="2"></el-tab-pane>
>>>>>>> Dev
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
            placeholder="请输入邮箱/昵称/手机号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            name="password"
            :type="passwordType"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <i slot="suffix" @click="showPwd">
              <!-- <svg-icon icon-class="eye" /> -->
            </i>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 10px"
          :loading="loading"
          @click="handleLogin"
          >登录</el-button
        >
        <el-link type="primary" style="float: left" @click="signup()"
          >注册</el-link
        >
        <el-link type="primary" style="float: right" @click="forgetPass()"
          >忘记密码</el-link
        >
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
<<<<<<< HEAD
            placeholder="请输入邮箱"
=======
            placeholder="请输入手机号"
>>>>>>> Dev
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
                @click="getMessage()"
                id="dyMobileButton"
                >{{ butName }}</el-button
              >
            </el-col>
          </el-row>
          <el-row id="yzm">
            <el-col>
              <label v-show="isdisplay == true">{{ yzmnum }}</label>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 10px"
          :loading="loading"
          @click="handleLogin"
          >登录</el-button
        >
        <el-link type="primary" style="float: right" @click="signup"
          >注册</el-link
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import {get} from '../../../utils/axios'
export default {
  inject: ["reload"], // 使用 inject 注入 reload 变量
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginForm1: {
        username: "",
        message: "",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      loginRules1: {
        username: [
<<<<<<< HEAD
          { required: true, trigger: "blur", message: "请输入邮箱" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
=======
          { required: true, trigger: "blur", message: "请输入手机号" },
          {
            // type: "email",
            message: "请输入正确的手机号码",
>>>>>>> Dev
            trigger: ["blur", "change"],
          },
        ],
        message: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      passwordType: "password",
      loading: false,
      activeName: "1",
      butName: "获取验证码",
      isDisabled: false,
      isdisplay: false, //显示验证码
      yzmnum: 1234,
    };
  
  },
  created(){
    this.confirmAutoLogin();
  },
  methods: {
    handleClick(tab, event) {},
    loginByThird(){//第三方登录
      this.$http.get("/api/getQQCode").then(
            res => {

              window.open(res.data.url)

            },
            res => {
              this.$router.push({
                path: "/" + res
              });
            })
    },
    confirmAutoLogin() {
      var isLogin = JSON.parse(localStorage.getItem("isLogin")); //获取缓存看是否登录过
      var time = localStorage.getItem("loginTime");
      var nowTime = new Date().getTime();
      let token = localStorage.getItem("Authorization");
      if (
        isLogin === true &&
        nowTime <= time + 2592000000 &&
        token != null &&
        token != ""
      ) {
        //登录过来直接进去，30天内登录不需要重新登录
        this.$router.push("/home");
      }
    },
    getMessage() {
      var time = 60;
      this.$refs.loginForm1.validateField("username", errMsg => {
        if (errMsg) {
        } else {
<<<<<<< HEAD
          var data = {
            email: this.loginForm1.username
          };
          this.$http.post("/api/sendCode", data).then(
            res => {
              if (res.data.respCode == "请输入真实邮箱") {
                this.$alert("请输入真实邮箱!", "失败", {
=======
          console.log("this.loginForm1.username = "+this.loginForm1.username)
          var data = {
            // email: this.loginForm1.username
            telephone: this.loginForm1.username
          };
          this.$http.post("/api/sendMessage", null, {
                params: data
              }).then(
            res => {
              console.log("sendcoderes.data = "+JSON.stringify(res.data))
              if (res.data.respCode == "请输入真实手机号") {
                this.$alert("请输入真实手机号!", "失败", {
>>>>>>> Dev
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
          // this.$axios.post("/api/sendCode", data, this.config).then(res => {
          //   // this.validateCode = res.data;
          //   console.log("http拦截器调用")
          //   console.log("res.data = "+JSON.stringify(res.data))
          //   localStorage.setItem("validateCode", res.data);
          // });

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
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      // console.log(this.config);
      var data = {
            email: this.loginForm1.username
      };
      //////////////////////////////////////////////////////////////////////////
      // this.$axios.post("/api/sendCode", data, this.config).then(res => {
      //       // this.validateCode = res.data;
      //       console.log("登录http拦截器调用")
      //       localStorage.setItem("validateCode", res.data);
      // });
      console.log("准备调用")
      get('/api/sendCode',data).then(res =>{console.log("res ="+JSON.stringify(res))})
      console.log("准备结束")

      /////////////////////////////////////////////////////////////////////////
      if (this.activeName == "1") {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            //密码登录
            var data = {
<<<<<<< HEAD
              email: this.loginForm.username,
              password: this.loginForm.password
            };
            localStorage.setItem("roleEmail", data.email);
            this.$http.post("/api/loginByPassword", data).then(
              res => {
                if (res.data.respCode == "1") {
=======
              account: this.loginForm.username,
              password: this.loginForm.password
            };
            localStorage.setItem("roleEmail", data.email);
            // this.$http.post("/api/loginByPassword", data).then(
              this.$http.post("/api/loginByPassword", null, {
                params: data
              }).then(
              res => {
                console.log("res.data = "+JSON.stringify(res.data));
                if (res.data.result == true) {
>>>>>>> Dev
                  this.loading = false;
                  //登录成功
                  if (res.data.role != "3") {
                    localStorage.setItem("roleId", res.data.role);
                    if (res.data.role == "0") {
                      //登录角色
                      localStorage.setItem("roles", "teacher");
                    } else if (res.data.role == "1") {
                      localStorage.setItem("roles", "admin");
                    } else if (res.data.role == "2") {
                      localStorage.setItem("roles", "superAdmin");
                    }

                    var date = new Date();
                    localStorage.setItem("loginTime", date.getTime()); //登录时间
                    localStorage.setItem("Authorization", res.data.token);
                    localStorage.setItem("account", res.data.email);
                    localStorage.setItem("isLogin", true);
                    this.$http.get("/api/menus").then(res => {
                      localStorage.setItem(
                        "menuList",
                        JSON.stringify(res.data)
                      );
                      // location.reload();
                    });
                    this.$router.push("/home");
                  } else {
                    //学生
                    this.$alert(
                      "该账号为学生账号，没有权限登录后台管理系统，如有疑问请联系管理员！",
                      "提示",
                      {
                        confirmButtonText: "确定"
                      }
                    );
                  }
                } else {
                  this.loading = false;
                  this.$alert(res.data.respCode, "登录失败", {
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
        });
      } else {
        //验证码登录
        this.$refs.loginForm1.validate(valid => {
          if (valid) {
            if (
              localStorage.getItem("validateCode") != this.loginForm1.message
            ) {
              this.$alert("验证码错误，请重新输入", "注册失败", {
                confirmButtonText: "确定"
              });
            } else {
              this.loading = true;
              var data = {
<<<<<<< HEAD
                email: this.loginForm1.username
              };
              this.$http.post("/api/loginByCode", data).then(
                res => {
                  this.loading = false;
                  if (res.data.respCode == "1") {
                    //登录成功
=======
                telephone: this.loginForm1.username
              };
              this.$http.post("/api/loginByMessage", null, {
                params: data
              }).then(
              // this.$http.post("/api/loginByCode", data).then(
                res => {
                  console.log("res.data = "+JSON.stringify(res.data));
                  this.loading = false;
                  if (res.data.result == true) {
                    //登录成功914392
>>>>>>> Dev
                    if (res.data.role != "3") {
                      localStorage.setItem("roleId", res.data.role);
                      if (res.data.role == "0") {
                        //登录角色
                        localStorage.setItem("roles", "teacher");
                      } else if (res.data.role == "1") {
                        localStorage.setItem("roles", "admin");
                      } else if (res.data.role == "2") {
                        localStorage.setItem("roles", "superAdmin");
                      }
                      var date = new Date();
                      localStorage.setItem("loginTime", date.getTime()); //登录时间
                      this.loading = false;
                      localStorage.setItem("Authorization", res.data.token);
                      localStorage.setItem("account", res.data.email);
                      localStorage.setItem("isLogin", true);
                      this.$http.get("/api/menus").then(res => {
                        localStorage.setItem(
                          "menuList",
                          JSON.stringify(res.data)
                        );
                        this.$router.push("/home");
                      });
                    } else {
                      //学生
                      this.$alert(
                        "该账号为学生账号，没有权限登录后台管理系统，如有疑问请联系管理员！",
                        "提示",
                        {
                          confirmButtonText: "确定"
                        }
                      );
                    }
                  } else {
                    this.loading = false;
                    this.$alert(res.data.respCode, "登录失败", {
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
          }
        });
      }
    },
    signup() {
      this.$router.push("/signup");
    },
    forgetPass() {
      this.$router.push("/forgetPassword");
    }
  }
};
</script>

<style scoped>
/* .login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
} */
.login-wrap {
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: rgb(33, 118, 214);
  border-bottom: 1px solid #ddd;
  /* margin: 10px auto; */
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.forget-link {
  position: absolute;
  right: 30px;
}
.login-select {
  position: absolute;
  left: 0;
  right: 10;
  width: 240px;
  padding: 0px 10px 0px 35px;
  margin: -12px auto;

  /* background-color: #6363f793; */
}
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
</style>