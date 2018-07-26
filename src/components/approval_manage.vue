<template>
  <div>
    <!--<el-button hre="./">审批表生成</el-button>-->
    <a :href="approval_form_url" target="_blank">审批表生成</a>
    <hr/>
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
      <el-button size="small" type="primary">上传审批表</el-button>
    </el-upload>
  </div>
</template>

<script>
  import {Box, XButton} from 'vux'
  import axios from 'axios'

  export default {
    data() {
      return {
        approval_form_url: '',
        xm: {},
        fileList: [],
        somename:false
      };
    },
    computed: {
      url() {
        return "http://localhost:8080/upload?xmid=" + this.xm.xmid + "&blx=审批表"
      }
    },
    name: "approval_manage",
    created() {
      this.xm = this.$store.state.xm
      this.approval_form_url = '../../static/approval_form.html?xmid=' + this.xm.xmid
      axios.get('http://localhost:8080/spb/getSpb', {
        params: {
          xmid: this.xm.xmid
        }
      }).then(res => {
        if (this.isArray(res.data)) {
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            var file = new Object()
            file.name = res.data[i].spbmc
            file.url = res.data[i].spburl
            file.spbid = res.data[i].spbid
            this.fileList.push(file)
          }
        }
      })
    },

    methods: {
      //判断是否是数组
      isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
      },

      onProgress(event, file, fileList){
        if(this.somename)
          file.name=file.name.split(".")[0]+"副本."+file.name.split(".")[1]
      },
      //上传前判断文件名是否重复
      handleBeforeupload(file) {
        console.log("handleBeforeupload")
        this.somename=false
        for (var i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name == file.name) {
            this.$message.warning("存在相同文件名称，已修改文件名！");
            this.somename=true
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
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      },
      //删除请求
      handleRemove(file, fileList) {
        console.log("handleRemove")
        axios.get("http://localhost:8080/spb/deletSqb", {
          params: {
            spbid: file.spbid
          }
        })
          .then(res => {
            this.removeByValue(this.fileList,file)
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
        axios.get('http://localhost:8080/spb/save', {
          params: {
            xmid: this.xm.xmid,
            spbmc: file.name,
          }
        })
          .then(res=>{
            var file = new Object()
            file.name = res.data.spbmc
            file.url = res.data.spburl
            file.spbid = res.data.spbid
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
      }
    }
  }
</script>

<style scoped>

</style>
