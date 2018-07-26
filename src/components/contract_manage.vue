<template>
  <div>
    <div v-if="this.$store.state.xm.sflx==='付款'" style="font-size: large;font-weight: bold">
      关联收款项目：
    </div>
    <div v-else style="font-size: large;font-weight: bold">
      关联付款项目：
    </div>
    <el-transfer v-model="value1"
                 :titles="this.$store.state.xm.sflx==='付款'?['收款项目','已关联收款项目']:['付款项目','已关联付款项目']"
                 :data="data">
    </el-transfer>
    <br/>
    <el-button @click="confrim_guanlian" type="primary">确定关联</el-button>
    <div style="font-size: medium;font-weight: bold;margin-top: 10px">
      <span>利：{{li}}</span>
    </div>
    <br/>
    <hr/>
    <div v-if="this.$store.state.xm.sflx==='付款'">
      <div style="font-size: large;font-weight: bold">
        下家合作单位：
      </div>
      <el-button
        size="small"
        type="primary"
        @click="initialHtqd">刷新
      </el-button>
      <el-table
        :data="tableData"
        style="width: 30%">
        <el-table-column
          fixed
          prop="zbdwmc"
          label="单位"
          align="center"
          width="170">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="schtjl(scope.$index, scope.row)">生成合同记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-button type="primary" @click="initialHtqd">初始化合同签订记录</el-button>-->
      <!--合同台账-->
      <el-dialog title="合同台账" :visible.sync="showHt">
        <el-form :model="ht">
          <el-form-item label="单位:" :label-width="formLabelWidth">
            <el-input v-model="ht.dwmc" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="合同金额:" :label-width="formLabelWidth">
            <el-input v-model="ht.htje" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确定单位时间:" :label-width="formLabelWidth">
            <el-date-picker v-model="ht.qddwsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="签约时间:" :label-width="formLabelWidth">
            <el-date-picker v-model="ht.qysj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="对方签约人:" :label-width="formLabelWidth">
            <el-input v-model="ht.dfqyr" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目负责人:" :label-width="formLabelWidth">
            <el-input v-model="ht.xmfzr" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="合同类型:" :label-width="formLabelWidth">
            <el-input v-model="ht.htlx" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="有效日期:" :label-width="formLabelWidth">
            <el-date-picker v-model="ht.yxrq" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="合同类型:" :label-width="formLabelWidth">
            <el-input v-model="ht.sflx" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group style="text-align: center" v-model="checkList">
              <el-checkbox label="廉洁合同"></el-checkbox>
              <el-checkbox label="安全合同"></el-checkbox>
              <el-checkbox label="智慧港口"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="ht.bz" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="合同状态:" :label-width="formLabelWidth">
            <el-select v-model="ht.htzt" placeholder="合同状态">
              <el-option
                value="起草">
              </el-option>
              <el-option
                value="会签中">
              </el-option>
              <el-option
                value="对方会签中">
              </el-option>
              <el-option
                value="完成">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同编号:" :label-width="formLabelWidth">
            <el-input v-model="ht.htid" :disabled="ht.htzt!='完成'" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showHt = false">取 消</el-button>
          <el-button type="primary" @click="addhtb">确 定</el-button>
        </div>
      </el-dialog>
      <hr/>
      <div style="font-size: large;font-weight: bold">
        合同记录：
      </div>
      <el-table
        :data="tableData5"
        style="width: 75%">
        <el-table-column align="center" type="expand">
          <template slot-scope="props">
            <el-form label-position="center" inline class="demo-table-expand">
              <el-form-item label="确定单位时间:">
                <span>{{ props.row.qddwsj }}</span>
              </el-form-item>
              <el-form-item label="对方签约人:">
                <span>{{ props.row.dfqyr }}</span>
              </el-form-item>
              <el-form-item label="合同类型:">
                <span>{{ props.row.htlx }}</span>
              </el-form-item>
              <el-form-item label="收付类型：">
                <span>{{ props.row.sflx }}</span>
              </el-form-item>
              <el-form-item label="廉洁合同：">
                <span>{{ props.row.ljht }}</span>
              </el-form-item>
              <el-form-item label="安全合同：">
                <span>{{ props.row.aqht }}</span>
              </el-form-item>
              <el-form-item label="智慧港口：">
                <span>{{ props.row.zhgk }}</span>
              </el-form-item>
              <el-form-item label="备注：">
                <span>{{ props.row.bz }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="合同编号"
          align="center"
          prop="htid">
        </el-table-column>
        <el-table-column
          label="合作单位"
          align="center"
          prop="dwmc">
        </el-table-column>
        <el-table-column
          label="合同金额"
          align="center"
          prop="htje">
        </el-table-column>
        <el-table-column
          label="签约时间"
          align="center"
          prop="qysj">
        </el-table-column>
        <el-table-column
          label="有效日期"
          align="center"
          prop="yxrq">
        </el-table-column>
        <el-table-column
          label="负责人"
          align="center"
          prop="xmfzr">
        </el-table-column>
        <el-table-column
          label="合同状态"
          align="center"
          prop="htzt">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <!--<el-button @click="deletht(scope.row)" type="text" size="small">删除</el-button>-->
            <el-button @click="edithtzt(scope.row)" type="text" size="small">修改状态</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改合同状态" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="合同状态" :label-width="formLabelWidth">
            <el-select v-model="ht.htzt" placeholder="合同状态">
              <el-option
                value="起草">
              </el-option>
              <el-option
                value="会签中">
              </el-option>
              <el-option
                value="对方会签中">
              </el-option>
              <el-option
                value="完成">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同编号:" :label-width="formLabelWidth">
            <el-input v-model="ht.htid" :disabled="ht.htzt!='完成'" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="concel_xghtzt">取 消</el-button>
          <el-button type="primary" @click="confrim_xghtzt">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-else>
      <div style="font-size: large;font-weight: bold">
        上家合作单位：
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "contract_manage",
    data() {
      return {
        data: [],
        //中标数据
        tableData: [],
        //合同详细数据
        tableData5: [],
        dialogFormVisible: false,
        checkList: [],
        value1: [],
        showHt: false,
        formLabelWidth: '150px',
        ht: {
          htid: '',
          xmid: this.$store.state.xm.xmid,
          dwmc: '',
          htje: '',
          qysj: '',
          qddwsj: '',
          htzt: '',
          dfqyr: '',
          xmfzr: this.$store.state.xm.xmfzr,
          htlx: this.$store.state.xm.xmlx,
          yxrq: '',
          sflx: this.$store.state.xm.sflx,
          ljht: '',
          aqht: '',
          zhgk: '',
          bz: '',
        },
        li: ''
      };
    },
    mounted() {
      //value1关联项目请求
      axios.get('http://localhost:8080/api/glb/selectglxmid', {
        params: {
          xmid: this.$store.state.xm.xmid
        }
      })
        .then(res => {
          //关联的项目ids
          this.value1 = res.data;
          if (this.$store.state.xm.sflx === '付款') {
            //请求收款项目
            axios.get('http://localhost:8080/api/xm/selectSK', {})
              .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                  this.data.push({
                    key: res.data[i].xmid,
                    label: res.data[i].xmmc === '' ? res.data[i].zxmmc : res.data[i].xmmc,
                  })
                }
              })
            //合同请求
            axios.get('http://localhost:8080/api/htb/selecthtjl', {
              params: {
                xmid: this.ht.xmid
              }
            })
              .then(res => {
                if (res.data.length != 0) {
                  this.tableData5 = res.data
                  this.$store.commit('updataHtje', res.data[0].htje)
                  this.$store.commit('updataYe', res.data[0].htje)
                  //总收款请求
                  axios.get('http://localhost:8080/api/xm/selectZSK', {
                    params: {
                      xmids: JSON.stringify(this.value1)
                    }
                  })
                    .then(res => {
                      this.li = (parseInt(res.data) - parseInt(this.tableData5[0].htje)).toString()
                    })
                }

              })
            //中标表
            axios.get('http://localhost:8080/api/zhongbiaob/selectZhongbiaob', {
              params: {
                zbxmid: this.$store.state.xm.xmid
              }
            }).then(res => {
              this.tableData = res.data
            })
          } else {//收款项目
            //请求付款项目
            axios.get('http://localhost:8080/api/xm/selectFK', {})
              .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                  this.data.push({
                    key: res.data[i].xmid,
                    label: res.data[i].xmmc === '' ? res.data[i].zxmmc : res.data[i].xmmc,
                  })
                }
              })
          }
        })
    },
    methods: {
      concel_xghtzt() {
        //重新请求
        axios.get('http://localhost:8080/api/htb/selecthtjl', {
          params: {
            xmid: this.ht.xmid
          }
        })
          .then(res => {
            this.tableData5 = res.data
          })
        this.dialogFormVisible = false
      },
      confrim_xghtzt() {
        console.log(this.ht)
        axios.post('http://localhost:8080/api/htb/updatahtjl', this.ht)
          .then(res => {
            //重新请求
            axios.get('http://localhost:8080/api/htb/selecthtjl', {
              params: {
                xmid: this.ht.xmid
              }
            })
              .then(res => {
                this.tableData5 = res.data
              })
          })
          .catch(err => {
          })
        this.dialogFormVisible = false
      },
      // deletht(row) {
      //   this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     axios.post('http://localhost:8080/api/htb/delethtjl', row)
      //     this.tableData5 = []
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   })
      // },
      edithtzt(row) {
        if (row.htzt === '完成')
          this.$message('该合同状态已经完成！不能修改！')
        else {
          this.dialogFormVisible = true
          this.ht = row
        }
      },
      addhtb() {
        this.ht.ljht = '否'
        this.ht.aqht = '否'
        this.ht.zhgk = '否'
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i] === '廉洁合同')
            this.ht.ljht = '是'
          else if (this.checkList[i] === '安全合同')
            this.ht.aqht = '是'
          else if (this.checkList[i] === '智慧港口')
            this.ht.zhgk = '是'
        }
        //添加合同记录
        axios.post('http://localhost:8080/api/htb/addhtjl', this.ht)
          .then(res => {
            axios.get('http://localhost:8080/api/htb/selecthtjl', {
              params: {
                xmid: this.ht.xmid
              }
            })
              .then(res => {
                this.tableData5 = res.data
              })
          })
          .catch(err => {
          })
        this.showHt = false
      },
      //生成合同记录
      schtjl(index, row) {
        if (this.tableData5.length === 0) {
          this.showHt = true
          console.log(index, row);
          this.ht.dwmc = row.zbdwmc
          this.ht.htje = row.zbbj
          this.ht.qddwsj = row.zbsj
          this.$store.commit('updataHtje',row.zbbj)
          this.$store.commit('updataYe',row.zbbj)
        } else {
          this.$message.info("存在合同记录！")
        }

      },
      confrim_guanlian() {
        if (this.tableData5.length === 0) {
          this.$message('请先生成合同记录！')
        } else {
          //插入glb
          axios.get('http://localhost:8080/api/glb/addglb', {
            params: {
              xmid: this.$store.state.xm.xmid,
              glxmids: JSON.stringify(this.value1)
            }
          })
            .then(res => {
              //总收款请求
              axios.get('http://localhost:8080/api/xm/selectZSK', {
                params: {
                  xmids: JSON.stringify(this.value1)
                }
              })
                .then(res => {
                  this.li = (parseInt(res.data) - parseInt(this.tableData5[0].htje)).toString()
                })
              this.$message.success("关联成功！")
            })
        }
      },
      initialHtqd() {
        this.tableData = []
        axios.get('http://localhost:8080/api/zhongbiaob/selectZhongbiaob', {
          params: {
            zbxmid: this.$store.state.xm.xmid
          }
        }).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.tableData = res.data
          }
          if (res.data.length === 0) {
            this.$alert('该项目还没有选定单位', '错误', {type: 'error'})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
