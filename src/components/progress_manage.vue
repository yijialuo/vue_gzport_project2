<template>
  <div v-show="htje!=''&&this.$store.state.xm.sflx!='收款'">
    <br/>
    <el-button type="text" @click="newfkb">新建付款进度</el-button>
    <br>
    <hr>
    <el-dialog title="新建付款进度" :visible.sync="shownewfkjd">
      <el-form :model="fkb">
        <el-form-item label="总付款额：" :label-width="formLabelWidth">
          <el-input :value="this.htje" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="余款：" :label-width="formLabelWidth">
          <el-input :value="ye" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="fkb.fksj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="付款类型：" :label-width="formLabelWidth">
          <el-input v-model="fkb.fklx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款额%：" :label-width="formLabelWidth">
          <el-input v-model="fkb.fkebfb" max=100 min=0
                    type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款额：" :label-width="formLabelWidth">
          <el-input v-model="fkb.fke" :disabled="true"
                    type="number" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shownewfkjd = false">取 消</el-button>
        <el-button type="primary" @click="Insertfkb">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="fkjk"

      style="width: 100%">
      <el-table-column
        prop="fksj"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fklx"
        label="付款类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fke"
        label="付款额">
      </el-table-column>
      <el-table-column
        prop="fkebfb"
        label="付款百分比"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sye"
        label="剩余额">
      </el-table-column>
      <el-table-column
        prop="syebfb"
        label="剩余额百分比">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    name: "progress_manage",
    data() {
      return {
        fkb: {
          xmid: this.$store.state.xm.xmid,
          //付款时间
          fksj: '',
          //付款类型
          fklx: '',
          //付款额
          fke: 0,
          //付款额百分比
          fkebfb: 0,
          //剩余额
          sye: '',
          //剩余额百分比
          syebfb: ''
        },
        shownewfkjd: false,
        fkjk: [],
        formLabelWidth: '150px',
        ye: '',
      }
    },
    mounted() {

      if (this.htje != '') {
        axios.get('http://localhost:8080/api/fk/getfkjl', {
          params: {
            xmid: this.$store.state.xm.xmid
          }
        })
          .then(res => {
            if (res.data.length === 0) {
              this.ye = this.htje
            } else {
              this.ye = res.data[res.data.length - 1].sye;
            }
            this.fkjk = res.data
          })
      }
    },
    computed: {
      fkebfb() {
        return this.fkb.fkebfb;
      },
      ...mapState(['htje'])

      // fke() {
      //   return this.fkb.fke;
      // }
    },
    watch: {
      fkebfb(newValue, oldValue) {
        if (newValue <= 100)
          this.fkb.fke = (parseInt(this.htje) * (newValue / 100))
      }
    },
    methods: {
      Insertfkb() {
        if (this.fkb.fksj != '' && this.fkb.fksj != null && this.fkb.fklx != '' && this.fkb.fklx != null && this.fkb.fkebfb != 0) {
          //插入付款记录
          axios.post('http://localhost:8080/api/fk/addfkb', this.fkb)
            .then(res => {
              //重新请求付款记录
              axios.get('http://localhost:8080/api/fk/getfkjl', {
                params: {
                  xmid: this.$store.state.xm.xmid
                }
              })
                .then(res => {
                  this.ye = res.data[res.data.length - 1].sye;
                  this.fkjk = res.data
                  this.fkb.fklx = ''
                  this.fkb.fkebfb = 0
                })
            })
          this.shownewfkjd = false
        } else {
          this.$message.error('请填入必须信息！')
        }
      },
      newfkb() {
        this.shownewfkjd = true
      }
    }
  }
</script>

<style scoped>

</style>
