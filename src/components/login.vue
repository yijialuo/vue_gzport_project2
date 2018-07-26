<template>
  <div class="login-box"  >
    <el-row>
      <el-col :span="8">
        <el-input id="name"  v-model="yh.yhmc" placeholder="请输入帐号">
          <template slot="prepend">帐号</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input id="password" v-model="yh.yhmm" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button id="login"  v-on:click="check" style="width:100%" type="primary">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "login",
        data(){
          return{
            yh:{
              yhmc:'yijialuo',
              yhmm:'111111'
            }
          }
        },
        methods:{
          //登录方法
          check(){
            var that = this
            axios.post('http://localhost:8080/yh/login',this.yh
            )
              .then(function (response) {
                //登录成功
                if(response.data==='ok'){
                  that.$store.commit('updataYh',that.yh.yhmc)
                  window.location.href = '#/main/'
                }
                else {
                  alert("用户名或密码错误！")
                }
              })
              .catch(function (error) {
                  console.log(error);
              });
          }
        }
    }
</script>




<style lang='stylus' scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
     margin-bottom: 0;
   }
  }
  .login-box {
    margin-top:10%;
    margin-left:40%;
  }
</style>
