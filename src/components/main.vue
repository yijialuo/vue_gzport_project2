<template>
  <section class="real-app">
    <el-button type="primary" @click="toAddXm">新建项目</el-button>
    <el-button type="primary" @click="manageDw">单位管理</el-button>
    <br/>
    <input
      style="margin-top: 10px"
      ref="search_box"
      type="text"
      class="search-car"
      autofocus="autofocus"
      placeholder="搜索项目……"
    ><button class="search" @click="search">搜索</button>
    <item
      :xm="xm"
      v-for="xm in filteredXms"
      :key="xm.xmid"
    ></item>
    <!--子标签控件绑定父组件数据-->
    <tabs :filter="filter"
          :xms="xms"
          @toggle="toggleFilter"
    />
  </section>

</template>

<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'
  import {XButton} from 'vux'
  import axios from 'axios'

  export default {

    data() {
      return {
        xms: [],
        filter: "全部",
        yhmc: ''
      }
    },

    mounted() {
      this.yhmc = this.$store.state.yhmc
    },

    //数据初始化、填充xms
    created: function () {
      var that = this
      console.log('Create')
      axios.get('http://localhost:8080/api/xm/getAllXm', {
        params: {}
      })
        .then(function (response) {
          console.log(response.data)
          that.xms = response.data;

        })
        .catch(function (error) {
          console.log(error);
        });
    },

    components: {
      XButton,
      Item,
      Tabs
    },

    //根据filter过滤xms
    computed: {
      filteredXms() {
        var reasult = new Array()
        if (this.filter === '全部') {
          console.log("全部！！！！！")
          //日期排序
          return this.xms.sort((a, b) => new Date(b.cjsj).getTime() - new Date(a.cjsj).getTime());
        }
        else if (this.filter === '收款') {
          console.log("filter:收款")
          for (var i = 0; i < this.xms.length; i++) {
            if (this.xms[i].sflx == '收款')
              reasult.push(this.xms[i])
          }
          return reasult.sort((a, b) => new Date(b.cjsj).getTime() - new Date(a.cjsj).getTime())
        }
        else if (this.filter === '付款') {
          for (var i = 0; i < this.xms.length; i++) {
            if (this.xms[i].sflx == '付款')
              reasult.push(this.xms[i])
          }
          return reasult.sort((a, b) => new Date(b.cjsj).getTime() - new Date(a.cjsj).getTime())
        }
        else {
          for (var i = 0; i < this.xms.length; i++) {
            if (this.xms[i].xmmc.indexOf(this.$refs.search_box.value) != -1)
              reasult.push(this.xms[i])
            if (this.xms[i].zxmmc != null && this.xms[i].zxmmc != '') {
              if (this.xms[i].zxmmc.indexOf(this.$refs.search_box.value) != -1) {
                reasult.push(this.xms[i])
              }
            }
          }
          if (reasult.length == 0) {
            alert("没找到相关项目！")
            this.filter = "全部"
            return this.xms.sort((a, b) => new Date(b.cjsj).getTime() - new Date(a.cjsj).getTime())
          }
          this.filter = ""
          return reasult.sort((a, b) => new Date(b.cjsj).getTime() - new Date(a.cjsj).getTime())
        }
      }
    },
    //改变filter、子组件发射toggle事件,父组件绑定@toggle=toggleFilter
    methods: {
      //跳转添加项目
      toAddXm() {
        window.location.href = '/#/addProject'
      },
      manageDw() {
        window.location.href = '/#/manageDw'
      },
      //接受子组件事件
      toggleFilter(state) {
        this.filter = state
      },
      //搜索确定函数
      search() {
        if (this.$refs.search_box.value != null && this.$refs.search_box.value != '')
          this.filter = ''
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .real-app {
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
  }

  .search {
    position: relative;
    margin: 0;
    background: #4876FF
    width: 20%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 16px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }

  .search-car {
    position: relative;
    margin: 0;
    width: 80%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>
