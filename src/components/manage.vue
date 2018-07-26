<template>
  <div>
    <h1 v-if="xm.zxmmc==''||xm.zxmmc==null" style="text-align:center" >{{xm.xmmc}}</h1>
    <h1 v-else style="text-align:center">{{xm.zxmmc}}</h1>
    <h3 style="text-align:center">{{xm.sflx}} {{xm.xgsj}}</h3>
    <el-tabs type="border-card">
      <el-tab-pane label="审批表管理">
        <Approval_manage ></Approval_manage>
      </el-tab-pane>
      <el-tab-pane label="招标管理">
        <bidding_manage v-if="this.$store.state.xm.sflx==='付款'"></bidding_manage>
        <nobidding v-else></nobidding>
      </el-tab-pane>
      <el-tab-pane label="合同管理">
        <Contract_manage></Contract_manage>
      </el-tab-pane>
      <el-tab-pane label="进度管理">
        <progress_manage></progress_manage>
      </el-tab-pane>
      <el-tab-pane label="验收管理">
        <div>验收管理</div>
      </el-tab-pane>
      <el-tab-pane label="编辑项目">
        <EditXm></EditXm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {XButton, Box} from 'vux'
  import Approval_manage from '@/components/approval_manage'
  import EditXm from '@/components/editXm'
  import axios from 'axios'
  import Bidding_manage from "./bidding_manage";
  import Contract_manage from "./contract_manage";
  import Nobidding from "./nobidding";
  import Bidding_menu from "./bidding_menu";
  import Progress_manage from "./progress_manage";

  export default {
    name: "manage",
    components: {
      Progress_manage,
      Bidding_menu,
      Nobidding,
      Contract_manage,
      Bidding_manage,
      XButton,
      Box,
      Approval_manage,
      EditXm
    },
    data() {
      return {
        xm: {}
      }
    },

    created() {
      this.xm=this.$store.state.xm;
    }
  }
</script>

<style scoped>

</style>
