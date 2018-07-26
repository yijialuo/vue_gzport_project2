<template>
  <div class="xm-item">
    <label v-if="xm.zxmmc==''||xm.zxmmc==null">{{xm.xmmc}} <span style="font-size:7px" >{{xm.sflx}}</span> <span style="font-size:5px" >{{xm.cjsj}}</span></label>
    <label v-else>{{xm.zxmmc}} <span style="font-size:7px" >{{xm.sflx}}</span> <span style="font-size:5px" >{{xm.cjsj}}</span></label>
    <router-link  class="manage"  to="/manage/"  @click.native="addStoreXm" >管理</router-link>
  </div>
</template>

<script>


export default {
  props: {
    xm: {
      type: Object,
      required: true,
    }
  },

  methods:{
    addStoreXm(){
      this.$store.commit('updataXm',this.xm)
    }
  },
  data(){
    return{
       //itemXm:this.xm
    }
  },


  }
</script>

<style lang="stylus" scoped>
.xm-item{
  font-weight:bold
  position relative
  background-color #fff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,0.06)
  // &:hover{
  //   .order:after{
  //     content: '订'
  //   }
  // }
  label{
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  &.completed{
    label{
      color: #d9d9d9;
      text-decoration line-through
    }
  }
}
.toggle{
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  outline none
  &:after{
    content url('../assets/images/round.svg')
  }
  &:checked:after{
    content url('../assets/images/done.svg')
  }
}
.manage{

  position: absolute;
  top: 0px;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 20px;
  color: #1E90FF;
  margin-bottom: 3px;
  transition: color 0.2s ease-out;
  background-color transparent
  appearance none
  border-width 0
  cursor pointer
  outline none
  text-decoration: none
}
</style>
