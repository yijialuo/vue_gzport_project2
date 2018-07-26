<template>
  <el-tabs>
    <el-tab-pane label="内部邀标" name="one">
      <bidding_manage></bidding_manage>
    </el-tab-pane>
    <el-tab-pane label="公开招标" name="two">公开招标</el-tab-pane>
    <el-tab-pane label="比质比价" name="three">比质比价</el-tab-pane>
    <el-tab-pane label="直接选定" name="four">直接选定</el-tab-pane>
    <el-tab-pane label="单一来源" name="five">单一来源</el-tab-pane>
  </el-tabs>
</template>

<script>
    import Bidding_manage from "./bidding_manage";
    export default {
        name: "bidding_menu",
      components: {Bidding_manage}
    }
</script>

<style scoped>

</style>
