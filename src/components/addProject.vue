<template>
  <div>
    <div style="text-align: center;font-size: xx-large;margin-bottom: 20px">添加项目</div>
    <br>
    <el-row type="flex" justify="center">
      <el-select v-model="project.sflx" placeholder="收付款类型">
        <el-option
          value="收款">
        </el-option>
        <el-option
          value="付款">
        </el-option>
      </el-select>
      <el-select :disabled="project.sflx==='收款'||project.sflx===''" v-model="project.xgsj" placeholder="招标类型">
        <el-option
          value="公开招标">
        </el-option>
        <el-option
          value="内部邀标">
        </el-option>
        <el-option
          value="比质比价">
        </el-option>
        <el-option
          value="直接选定">
        </el-option>
        <el-option
          value="单一来源">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="project.cjsj"
        type="date"
        placeholder="创建日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-row>
    <br/>
    <br/>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <x-input v-model="project.xmmc" style="font-size: large" title="项目名称:"></x-input>
          <x-input v-model="project.zxmmc" style="font-size: large" title="子项目名称:"></x-input>
          <x-input v-model="project.xmlx" style="font-size: large" title="项目类型:"></x-input>
          <x-input v-model="project.xmgq" style="font-size: large" title="预计项目工期:"></x-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <x-input v-model="project.zjly" style="font-size: large" title="资金来源:"></x-input>
          <x-input v-model="project.ysje" style="font-size: large" title="预算金额:" type="number"></x-input>
          <x-input v-model="project.xmfzr" style="font-size: large" title="项目负责人:"></x-input>
          <!--备注为联系方式-->
          <x-input v-model="project.bz" style="font-size: large" title="联系方式:"></x-input>
        </div>
      </el-col>
    </el-row>
    <x-textarea v-model="project.xmnrgy" style="font-size: large" title="项目内容概要:" placeholder="项目内容概要" :max="200"
                autosize></x-textarea>
    <x-textarea v-model="project.ptyjjxtrj" style="font-size: large" title="配套硬件及系统软件:" placeholder="配套硬件及系统软件"
                :max="200"
                autosize></x-textarea>
    <x-input v-model="project.cjr" style="font-size: large" title="创建人:"></x-input>
    <br/>

    <!--<x-button link="/main">取消</x-button>-->
    <div style="text-align: right">
      <el-button type="primary" @click="toMain">取消</el-button>
      <el-button type="primary" @click="confrim_add">确定</el-button>
    </div>

    <!--<x-button @click.native="confrim_add">确定</x-button>-->

  </div>
</template>

<script>
  import {XInput, Flexbox, FlexboxItem, XTextarea, XButton} from 'vux'
  import axios from 'axios'

  export default {
    data() {
      return {
        project: {
          xmid: '',
          xmbh: '',
          xmmc: '',
          zxmmc: '',
          sflx: '',
          xmlx: '',
          xmgq: '',
          zjly: '',
          ysje: '',
          xmfzr: '',
          xmnrgy: '',
          ptyjjxtrj: '',
          bz: '',
          cjsj: new Date(),
          cjr: this.$store.state.yhmc,
          xgsj: '',
          xgr: '',
        }
      }
    },
    name: "addProject",
    methods: {
      toMain() {
        window.location.href = "/#/main";
      },
      confrim_add() {
        let that=this
        if((this.project.sflx === '收款'||(this.project.sflx === '付款' && this.project.xgsj != '' && this.project.xgsj != null))&&(this.project.xmmc != '' || this.project.zxmmc != '')){
            axios.post('http://localhost:8080/api/xm/addxm', this.project)
              .then(function (response) {
                if (response.status == '200') {
                  that.$message.success('创建项目成功！');
                  window.location.href = "/#/main";
                } else {
                  that.$message.error('创建项目失败')
                  window.location.href = "/#/main";
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }else {
          this.$message({
            type:'error',
            message:'请补充必填信息(收付款类型、招标方式、项目名称或者子项目名称)！',
            showClose: true,
            duration:5000
          });
        }
      }
    },
    components: {
      XButton,
      Flexbox,
      FlexboxItem,
      XInput,
      XTextarea
    }
  }
</script>

<style scoped>

</style>
