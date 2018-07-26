<template>
  <div class="helper">
    <span class="left">一共 {{xmLength}} 个项目</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
        v-if="state!=''"
      >
        {{state}}
      </span>
    </span>
  </div>
</template>

<script>
  export default {
//接受父组件传递下来的filter、car
    props: {
      filter: {
        type: String,
        required: true,
      },
      xms: {
        type: Array,
        required: true
      }
    },
//    计算项目的数量
    computed: {
      xmLength(){
        return this.xms.length;
      }
    },
    data(){
      return {
        states: ['全部', '收款', '付款', '']
      }
    },
    methods: {
      toggleFilter(state){
        console.log("发射toggle")
        this.$emit('toggle', state)
      },

    }
  }
</script>


<style lang="stylus" scoped>
  .helper {
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #fff
    font-size 14px
    font-smoothing: antialiased
  }

  .left, .clear, .tabs {
    padding 0 10px
    box-sizing border-box
  }

  .left, .clear {
    width 150px
  }

  .left {
    text-align left
  }

  .clear {
    text-align right
    cursor pointer
  }

  .tabs {
    width 200px
    display flex
    justify-content space-around
    * {
      display inline-block
      padding 0 10px
      cursor pointer
      border 1px solid rgba(175, 47, 47, 0)
      &.actived {
        border-color rgba(175, 47, 47, 0.4)
        border-radius 5px
      }
    }
  }
</style>

