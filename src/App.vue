<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<Car></Car>-->
    <router-view/>
    <Footer></Footer>
  </div>
</template>



<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'


  export default{
    components:{
      Header,
      Footer,
    },
    mounted(){
      console.log(this.$store.state.yhmc)
    }
  }
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
   // background-color #999
    opacity .9
    z-index -1
  }
</style>


