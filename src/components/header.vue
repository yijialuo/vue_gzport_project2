<template>
  <div>
    <el-header style="text-align: right; font-size: 20px">
      <span>{{this.$store.state.yhmc}}</span>
      <el-button  @click="logout" v-show="this.$store.state.yhmc!=''" type="info">注销</el-button>
    </el-header>
    <header class="main-header">
      <a href="/#/main/"><h1 >项目管理系统</h1></a>
    </header>
  </div>
</template>

<script>
  export default {
    methods:{
      logout(){
        console.log("logout")
        this.$store.commit('logoutYh')
        window.location.href = '/'
      }
    }
  }
</script>

<style lang="stylus" scoped>

  a:link {
    font-size: 12px;
    color: #000000;
    text-decoration: none;
  }
  a:visited {
    font-size: 12px;
    color: #000000;
    text-decoration: none;
  }
  a:hover {
    font-size: 12px;
    color: #999999;
    text-decoration: none;
  }

  .main-header{
  text-align center
  h1{
    font-size 60px
    color: #1E90FF
    font-weight 460
    margin 20px
  }
}
</style>
