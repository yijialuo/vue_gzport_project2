<template>
  <div>
    <br/>
    <el-row type="flex" justify="center">
      <el-select @change="changesflx" v-model="project.sflx" placeholder="收付款类型">
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
    <hr>
    <el-upload
      name="test"
      class="upload-demo"
      :action="url"
      :before-upload="handleBeforeupload"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :before-remove="handleBeforeRemove"
      :on-remove="handleRemove"
      :on-progress="onProgress"
      multiple
      :file-list="fileList">
      <el-button size="small" type="primary">上传相关附件</el-button>
    </el-upload>
    <br/>
    <el-button style="float: right;" @click="confrim_edit" type="primary">确定修改</el-button>
  </div>
</template>

<script>
  import {XInput, Flexbox, FlexboxItem, XTextarea, XButton} from 'vux'
  import axios from 'axios'

  export default {
    name: "editXm",
    data() {
      return {
        project: {},
        fileList: [],
        somename: false
      }
    },
    methods: {
      changesflx(sflx) {
        if (sflx === '收款') {
          this.project.xgsj = ''
        }
      },
      //判断是否是数组
      isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
      },
      onProgress(event, file, fileList) {
        if (this.somename)
          file.name = file.name.split(".")[0] + "副本." + file.name.split(".")[1]
      },
      //上传前判断文件名是否重复
      handleBeforeupload(file) {
        console.log("handleBeforeupload")
        this.somename = false
        for (var i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name == file.name) {
            this.$message.warning("存在相同文件名称，已修改文件名！");
            this.somename = true
          }
        }
      },
      //删除前确认
      handleBeforeRemove(file, fileList) {
        console.log("handleBeforeRemove")
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //删除数组中指定元素
      removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      },
      //删除请求
      handleRemove(file, fileList) {
        console.log("handleRemove")
        axios.get("http://localhost:8080/fj/deletFj", {
          params: {
            fjid: file.fjid
          }
        })
          .then(res => {
            this.removeByValue(this.fileList, file)
          })
          .catch(err => {
            console.log(err)
          })
      },
      //上传成功
      handleSuccess(response, file, fileList) {
        console.log("handleSuccess")
        console.log("file:")
        console.log(file)
        axios.get('http://localhost:8080/fj/save', {
          params: {
            xmid: this.project.xmid,
            fjmc: file.name,
          }
        })
          .then(res => {
            var file = new Object()
            file.name = res.data.fjmc
            file.url = res.data.fjurl
            file.fjid = res.data.fjid
            this.fileList.push(file)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //预览文件
      handlePreview(file) {
        console.log("handlePreview")
        console.log(file);
        window.open(file.url, top)
      },

      confrim_edit() {
        if((this.project.sflx === '收款'||(this.project.sflx === '付款' && this.project.xgsj != '' && this.project.xgsj != null))&&(this.project.xmmc != '' || this.project.zxmmc != '')){
            this.$confirm('此操作将修改项目，您确定修改吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //修改项目申请
              axios.post('http://localhost:8080/api/xm/updataXm', this.project
              )
                .then(function (response) {
                })
                .catch(function (error) {
                  console.log(error);
                })
              // this.$store.commit('updataXm',this.project)
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              setTimeout(() => {
                window.location.href = '#/main/'
              }, 1000)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改'
              });
              setTimeout(() => {
                window.location.href = '#/main/'
              }, 1000)
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
    created() {
      this.project=this.$store.state.xm
      axios.get('http://localhost:8080/fj/getFjb', {
        params: {
          xmid: this.project.xmid
        }
      }).then(res => {
        if (this.isArray(res.data)) {
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            var file = new Object()
            file.name = res.data[i].fjmc
            file.url = res.data[i].fjurl
            file.fjid = res.data[i].fjid
            this.fileList.push(file)
          }
        }
      })
    },
    computed: {
      url() {
        return "http://localhost:8080/upload?xmid=" + this.project.xmid + "&blx=附件"
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
