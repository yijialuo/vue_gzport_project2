<template>
  <div>
    <br/>
    <el-button type="text" @click="addzzgs">新建单位</el-button>
    <br>
    <hr>
    <br/>
    <div style="font-size: large;font-weight: bold">
      单位信息：
    </div>
    <!--添加公司form-->
    <el-dialog title="新增投标公司" :visible.sync="showAddgs">
      <el-form :model="zbjlb">
        <el-form-item label="招标类型:" :label-width="formLabelWidth">
          <el-input v-model="zbjlb.zblx" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位:" :label-width="formLabelWidth">
          <el-input v-model="zbjlb.dwmc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报价:" :label-width="formLabelWidth">
          <el-input v-model="zbjlb.bj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zbjlb.fbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddgs = false">取 消</el-button>
        <el-button type="primary" @click="addzbjlb">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改公司form-->
    <el-dialog title="修改招标公司信息" :visible.sync="showEditgs">
      <el-form :model="zbjlb">
        <el-form-item label="招标类型:" :label-width="formLabelWidth">
          <el-input v-model="zbjlb.zblx" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位:" :label-width="formLabelWidth">
          <el-input v-model="zbjlb.dwmc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报价:" :label-width="formLabelWidth">
          <el-input v-model="zbjlb.bj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zbjlb.fbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditgs">取 消</el-button>
        <el-button type="primary" @click="confirm_Editgs">确定修改</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData3"
      style="width: 64%"
      stripe
      align="center"
      max-height="270">
      <el-table-column
        fixed
        prop="dwmc"
        label="单位"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fbsj"
        label="发标日期"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="bj"
        label="报价"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="400">
        <template slot-scope="scope">
          <el-button @click="deletgs(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editgs(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="addzhongbiao(scope.row)" type="text" size="small">添加为中标</el-button>
          <el-button @click="addweizhongbiao(scope.row)" type="text" size="small">添加未中标</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加form-->
    <el-dialog title="新增未中标信息" :visible.sync="dialogFormVisible1">
      <el-form :model="zbb">
        <el-form-item label="单位名称:" :label-width="formLabelWidth">
          <el-input v-model="zbb.dwmc" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报价:" :label-width="formLabelWidth">
          <el-input v-model="zbb.bj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zbb.fbsj" :disabled="zbb.fbsj!=''&&zbb.fbsj!=null" type="date"
                          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="评标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zbb.pbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="得分:" :label-width="formLabelWidth">
          <el-input v-model="zbb.df" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addzzb">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改form-->
    <el-dialog title="修改招标信息" :visible.sync="dialogFormVisible3">
      <el-form :model="zbb">
        <el-form-item label="单位名称:" :label-width="formLabelWidth">
          <el-input v-model="zbb.dwmc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="报价:" :label-width="formLabelWidth">
          <el-input v-model="zbb.bj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zbb.fbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="评标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zbb.pbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="得分:" :label-width="formLabelWidth">
          <el-input v-model="zbb.df" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="updateZzb">确 定</el-button>
      </div>
    </el-dialog>
    <hr>
    <br/>
    <div style="font-size: large;font-weight: bold">
      未中标信息：
    </div>
    <el-table
      :data="tableData"
      style="width: 69%"
      stripe
      max-height="250">
      <el-table-column
        align="center"
        fixed
        prop="dwmc"
        label="单位"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fbsj"
        label="发标日期"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pbsj"
        label="评标日期"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="bj"
        label="报价"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="df"
        label="得分"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="220">
        <template slot-scope="scope">
          <el-button @click="deletZzb(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editZzb(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="zhaobtzs(scope.row)" type="text" size="small">未中标通知书</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <!--<el-button type="text" @click="dialogFormVisible2 = true">创建中标信息</el-button>-->
    <el-dialog title="创建中标信息" :visible.sync="dialogFormVisible2">
      <el-form :model="zhongbiaob">
        <el-form-item label="中标单位名称:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaob.zbdwmc" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中标报价:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaob.zbbj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zhongbiaob.zbfbsj" :disabled="zhongbiaob.zbfbsj!=''&&zhongbiaob.zbfbsj!=null"
                          type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="中标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zhongbiaob.zbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="中标分:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaob.zbdf" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="第几中标单位:" :label-width="formLabelWidth">
          <el-select v-model="zhongbiaob.bz" placeholder="请选择第几中标单位">
            <el-option label="第一中标单位" value="第一中标单位"></el-option>
            <el-option label="第二中标单位" value="第二中标单位"></el-option>
            <el-option label="第三中标单位" value="第三中标单位"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否最终中标单位" :label-width="formLabelWidth">
          <el-select v-model="zhongbiaob.sfzzzbdw" placeholder="请选择第几中标单位">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addZhongbiaob">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改中标信息" :visible.sync="dialogFormVisible4">
      <el-form :model="zhongbiaob">
        <el-form-item label="中标单位名称:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaob.zbdwmc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中标报价:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaob.zbbj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zhongbiaob.zbfbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="中标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zhongbiaob.zbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="中标分:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaob.zbdf" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="第几中标单位:" :label-width="formLabelWidth">
          <el-select v-model="zhongbiaob.bz" placeholder="请选择第几中标单位">
            <el-option label="第一中标单位" value="第一中标单位"></el-option>
            <el-option label="第二中标单位" value="第二中标单位"></el-option>
            <el-option label="第三中标单位" value="第三中标单位"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否最终中标单位" :label-width="formLabelWidth">
          <el-select v-model="zhongbiaob.sfzzzbdw" placeholder="请选择第几中标单位">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="updataZhongbiaob">确 定</el-button>
      </div>
    </el-dialog>
    <hr>
    <br/>
    <div style="font-size: large;font-weight: bold">
      中标信息：
    </div>
    <el-table
      :data="tableData2"
      style="width: 85%"
      stripe
      max-height="250">
      <el-table-column
        fixed
        prop="zbdwmc"
        label="中标单位"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="zbfbsj"
        label="中标发标日期"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zbsj"
        label="中标时间"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zbbj"
        label="中标报价"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zbdf"
        label="中标得分"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="bz"
        label="备注"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sfzzzbdw"
        label="是否最终中标"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="170">
        <template slot-scope="scope">
          <el-button @click="deletZhongbiaob(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editZhongbiaob(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="zhongbiaotzs(scope.row)" type="text" size="small">中标通知书</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--招标通知form-->
    <el-dialog title="未中标结果通知书" :visible.sync="dialogFormVisible5">
      <el-form :model="zztz">
        <el-form-item label="通知单位:" :label-width="formLabelWidth">
          <el-input v-model="zztz.dwmc" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目名称:" :label-width="formLabelWidth">
          <el-input v-model="zztz.xmmc" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zztz.kbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="中标人:" :label-width="formLabelWidth">
          <el-input v-model="zztz.zbdw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中表价:" :label-width="formLabelWidth">
          <el-input v-model="zztz.zbbj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中表价大写:" :label-width="formLabelWidth">
          <el-input v-model="zztz.zbbjdx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="通知时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zztz.tzsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="product_zhaobiaotzs">生成通知书</el-button>
      </div>
    </el-dialog>

    <!--中标通知form-->
    <el-dialog title="中标结果通知书" :visible.sync="dialogFormVisible6">
      <el-form :model="zhongbiaotz">
        <el-form-item label="通知单位:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaotz.dwmc" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目名称:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaotz.xmmc" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开标时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zhongbiaotz.kbsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="中表价:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaotz.zbj" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中表价大写:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaotz.zbjdx" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="通知时间:" :label-width="formLabelWidth">
          <el-date-picker v-model="zhongbiaotz.tzsj" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系人:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaotz.lxr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" :label-width="formLabelWidth">
          <el-input v-model="zhongbiaotz.dh" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible6 = false">取 消</el-button>
        <el-button type="primary" @click="product_zhongbiaotzs">生成通知书</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "bidding_manage",
    data() {
      return {
        dialogFormVisible1: false,
        //添加中标form
        dialogFormVisible2: false,
        //修改招标form
        dialogFormVisible3: false,
        //修改终边form
        dialogFormVisible4: false,
        //通知form
        dialogFormVisible5: false,
        //中标通知form
        dialogFormVisible6: false,
        //新建招标公司
        showAddgs: false,
        //招标记录
        showEditgs: false,
        zbjlb: {
          zbjlid: '',
          zblx: this.$store.state.xm.xgsj,
          xmid: this.$store.state.xm.xmid,
          dwmc: '',
          bj: '',
          sfzb: ''
        },
        //未中标数据
        tableData: [],
        //中标数据
        tableData2: [],
        //投标公司数据
        tableData3: [],
        //招标
        //招标表
        zbb: {
          zbbid: '',
          dwmc: '',
          bj: '',
          fbsj: '',
          pbsj: '',
          df: '',
          xmid: this.$store.state.xm.xmid,
          xmmc: this.$store.state.xm.zxmmc === '' ? this.$store.state.xm.xmmc : this.$store.state.xm.zxmmc
        },
        //中标表
        zhongbiaob: {
          zhongbiaoid: '',
          zbxmid: this.$store.state.xm.xmid,
          zbdwmc: '',
          zbxmmc: this.$store.state.xm.zxmmc === '' ? this.$store.state.xm.xmmc : this.$store.state.xm.zxmmc,
          zbbj: '',
          zbdf: '',
          zbfbsj: '',
          zbsj: '',
          bz: '',
          sfzzzbdw: ''
        },
        //招标通知form
        zztz: {
          dwmc: '',
          kbsj: '',
          zbdw: '',
          xmmc: '',
          zbbj: '',
          zbbjdx: '',
          tzsj: ''
        },
        //中标通知form
        zhongbiaotz: {
          dwmc: '',
          xmmc: '',
          kbsj: '',
          zbj: '',
          zbjdx: '',
          tzsj: '',
          lxr: '余飞',
          dh: '020-82152397'
        },
        //招标记录id
        zbjlid: '',
        formLabelWidth: '150px',
      }
    },
    mounted() {
      //公司请求
      axios.get('http://localhost:8080/api/zbjl/selectzbjl', {
        params: {
          xmid: this.$store.state.xm.xmid
        }
      })
        .then(res => {
          console.log(res.data)
          this.tableData3 = res.data
        })
        .catch(err => {
          console.log(err)
        })
      //招标表请求
      axios.get('http://localhost:8080/api/zbb/selectZbb', {
        params: {
          xmid: this.$store.state.xm.xmid
        }
      })
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
      //中标表请求
      axios.get('http://localhost:8080/api/zhongbiaob/selectZhongbiaob', {
        params: {
          zbxmid: this.$store.state.xm.xmid
        }
      })
        .then(res => {
          console.log('中标表')
          console.log(res.data)
          this.tableData2 = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      deletgs(row) {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('deletgs')
          console.log(row)
          axios.get('http://localhost:8080/api/zbjl/deletezbjl', {
            params: {
              zbjlid: row.zbjlid
            }
          })
            .then(res => {
              //删除过会重新请求
              axios.get('http://localhost:8080/api/zbjl/selectzbjl', {
                params: {
                  xmid: this.$store.state.xm.xmid
                }
              })
                .then(res => {
                  console.log(res.data)
                  this.tableData3 = res.data
                  this.zbjlb.zblx = res.data[0].zblx
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
            })
        })
      },
      cancelEditgs() {
        this.showEditgs = false
        axios.get('http://localhost:8080/api/zbjl/selectzbjl', {
          params: {
            xmid: this.$store.state.xm.xmid
          }
        })
          .then(res => {
            console.log(res.data)
            this.tableData3 = res.data
            this.zbjlb.zblx = res.data[0].zblx
          })
          .catch(err => {
            console.log(err)
          })

      },
      editgs(row) {
        this.showEditgs = true
        this.zbjlb = row
        console.log(row)
      },
      confirm_Editgs() {
        console.log(this.zbjlb)
        axios.post('http://localhost:8080/api/zbjl/updatazbjl', this.zbjlb)
          .then(res => {
            axios.get('http://localhost:8080/api/zbjl/selectzbjl', {
              params: {
                xmid: this.$store.state.xm.xmid
              }
            })
              .then(res => {
                console.log(res.data)
                this.tableData3 = res.data
                this.zbjlb.zblx = res.data[0].zblx
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
          })
        this.showEditgs = false
      },
      addzhongbiao(row) {
        this.dialogFormVisible2 = true
        this.zhongbiaob.zbdwmc = row.dwmc
        this.zhongbiaob.zbbj = row.bj
        this.zhongbiaob.zbfbsj = row.fbsj
        this.zbjlid = row.zbjlid
      },
      addweizhongbiao(row) {
        this.dialogFormVisible1 = true
        this.zbb.dwmc = row.dwmc
        this.zbb.bj = row.bj
        this.zbb.fbsj = row.fbsj
        this.zbjlid = row.zbjlid
      },


      addzzgs() {
        if (this.zbjlb.zblx != '') {
          this.showAddgs = true
        } else {
          this.$notify({
            title: '警告',
            message: '请先选择招标类型',
            type: 'warning'
          });
        }
      },
      addzbjlb() {
        if (this.zbjlb.dwmc != '') {
          axios.post('http://localhost:8080/api/zbjl/addzbjl', this.zbjlb)
            .then(res => {
              //添加过会重新请求
              axios.get('http://localhost:8080/api/zbjl/selectzbjl', {
                params: {
                  xmid: this.$store.state.xm.xmid
                }
              })
                .then(res => {
                  console.log(res.data)
                  this.tableData3 = res.data
                  this.zbjlb.zblx = res.data[0].zblx
                  this.zbjlb.dwmc = ''
                  this.zbjlb.bj = ''
                  this.zbjlb.fbsj = ''
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
            })
          this.showAddgs = false
        } else {
          this.$message.error('请补充必填信息！');
        }
      },

      zhongbiaotzs(row) {
        console.log(row)
        this.dialogFormVisible6 = true
        this.zhongbiaotz.dwmc = row.zbdwmc
        this.zhongbiaotz.xmmc = row.zbxmmc
        this.zhongbiaotz.kbsj = row.zbfbsj
        this.zhongbiaotz.zbj = row.zbbj
        let date = new Date();
        let mon = date.getMonth() + 1;
        let day = date.getDate();
        this.zhongbiaotz.tzsj = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
      },

      product_zhongbiaotzs() {
        if (this.zhongbiaotz.zbjdx != '' && this.zhongbiaotz.kbsj != '' && this.zhongbiaotz.kbsj != null && this.zhongbiaotz.tzsj != '' && this.zhongbiaotz.tzsj != null && this.zhongbiaotz.lxr != '' && this.zhongbiaotz.dh != '') {
          this.dialogFormVisible6 = false
          this.zhongbiaotz.kbsj = this.zhongbiaotz.kbsj.replace('-', '年')
          this.zhongbiaotz.tzsj = this.zhongbiaotz.tzsj.replace('-', '年')
          this.zhongbiaotz.kbsj = this.zhongbiaotz.kbsj.replace('-', '月')
          this.zhongbiaotz.tzsj = this.zhongbiaotz.tzsj.replace('-', '月')
          this.zhongbiaotz.kbsj = this.zhongbiaotz.kbsj + '日'
          this.zhongbiaotz.tzsj = this.zhongbiaotz.tzsj + '日'
          let s = 'dwmc=' + this.zhongbiaotz.dwmc + '&xmmc=' + this.zhongbiaotz.xmmc + '&kbsj=' + this.zhongbiaotz.kbsj + '&zbj=' + this.zhongbiaotz.zbj + '&zbjdx=' + this.zhongbiaotz.zbjdx + '&tzsj=' + this.zhongbiaotz.tzsj + '&lxr=' + this.zhongbiaotz.lxr + '&dh=' + this.zhongbiaotz.dh
          let url = '../../static/中标结果通知书.html?' + s
          window.open(url, top)
          this.zhongbiaotz.zbjdx = ''
        } else {
          this.$message.error('请补充必填信息！');
        }
      },

      product_zhaobiaotzs() {
        if (this.zztz.zbbjdx != '' && this.zztz.kbsj != '' && this.zztz.kbsj != null && this.zztz.zbdw != '' && this.zztz.tzsj != '' && this.zztz.tzsj != null && this.zztz.zbbj != '') {
          this.dialogFormVisible5 = false
          this.zztz.kbsj = this.zztz.kbsj.replace('-', '年')
          this.zztz.tzsj = this.zztz.tzsj.replace('-', '年')
          this.zztz.kbsj = this.zztz.kbsj.replace('-', '月')
          this.zztz.tzsj = this.zztz.tzsj.replace('-', '月')
          this.zztz.kbsj = this.zztz.kbsj + '日'
          this.zztz.tzsj = this.zztz.tzsj + '日'
          let s = 'dwmc=' + this.zztz.dwmc + '&kbsj=' + this.zztz.kbsj + '&zbdw=' + this.zztz.zbdw + '&xmmc=' + this.zztz.xmmc + '&zzbj=' + this.zztz.zbbj + '&zzbjdx=' + this.zztz.zbbjdx + '&tzsj=' + this.zztz.tzsj
          let url = '../../static/招标结果通知书.html?' + s
          window.open(url, top)
          this.zztz.zbbjdx = ''
        } else {
          this.$message.error('请补充必填信息！');
        }
      },
      //招标通知书
      zhaobtzs(row) {

        console.log(row)
        this.dialogFormVisible5 = true
        this.zztz.dwmc = row.dwmc
        this.zztz.kbsj = row.fbsj
        for (let i = 0; i < this.tableData2.length; i++) {
          if (this.tableData2[i].sfzzzbdw === '是') {
            var zbdw = this.tableData2[i].zbdwmc
            var zbbj = this.tableData2[i].zbbj
            break
          }
        }
        this.zztz.zbdw = zbdw
        this.zztz.xmmc = row.xmmc
        this.zztz.zbbj = zbbj

        let date = new Date();
        let mon = date.getMonth() + 1;
        let day = date.getDate();
        this.zztz.tzsj = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);

      },

      updataZhongbiaob() {
        axios.post('http://localhost:8080/api/zhongbiaob/updataZhongbiaob', this.zhongbiaob)
          .then(res => {
          })
          .catch(err => {
            console.log(err)
          })
        this.dialogFormVisible4 = false
      },

      updateZzb() {
        axios.post('http://localhost:8080/api/zbb/updataZbb', this.zbb)
          .then(res => {
          })
          .catch(err => {
            console.log(err)
          })
        this.dialogFormVisible3 = false
      },

      editZhongbiaob(row) {
        this.zhongbiaob = row
        this.dialogFormVisible4 = true
      },

      deletZhongbiaob(row) {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除
          axios.get('http://localhost:8080/api/zhongbiaob/deletZhongbiaob', {
            params: {
              zhongbiaoid: row.zhongbiaoid
            }
          })
            .then(res => {
              //重新请求zbb
              axios.get('http://localhost:8080/api/zhongbiaob/selectZhongbiaob', {
                params: {
                  zbxmid: this.$store.state.xm.xmid
                }
              })
                .then(res => {
                  console.log('重新请求：' + res.data)
                  this.tableData2 = res.data
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {

        })
      },

      editZzb(row) {
        this.dialogFormVisible3 = true
        this.zbb = row
        console.log(row)
      },

      deletZzb(row) {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除
          axios.get('http://localhost:8080/api/zbb/deletZzb', {
            params: {
              zbbid: row.zbbid
            }
          })
            .then(res => {
              //重新请求zbb
              axios.get('http://localhost:8080/api/zbb/selectZbb', {
                params: {
                  xmid: this.$store.state.xm.xmid
                }
              })
                .then(res => {
                  console.log(res.data)
                  this.tableData = res.data
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {

        })
      },

      addZhongbiaob() {
        //检查添加到中标记录表中的必须字段
        if (this.zhongbiaob.zbdwmc != '' && this.zhongbiaob.zbbj != '' && this.zhongbiaob.zbdf != '' && this.zhongbiaob.zbfbsj != '' && this.zhongbiaob.zbsj != '' && this.zhongbiaob.bz != '' && this.zhongbiaob.sfzzzbdw != '') {
          //修改招标记录表
          axios.get('http://localhost:8080/api/zbjl/updatazhongbiao', {
            params: {
              zbjlid: this.zbjlid
            }
          })
            .then(res => {
              this.dialogFormVisible2 = false
              axios.post('http://localhost:8080/api/zhongbiaob/addZhongbiaob', this.zhongbiaob)
                .then(res => {
                  //中标表重新请求
                  axios.get('http://localhost:8080/api/zhongbiaob/selectZhongbiaob', {
                    params: {
                      zbxmid: this.$store.state.xm.xmid
                    }
                  })
                    .then(res => {
                      this.tableData2 = res.data
                      //清除缓存
                      this.zhongbiaob.zbsj = ''
                      this.zhongbiaob.zbdf = ''
                      this.zhongbiaob.bz = ''
                      this.zhongbiaob.sfzzzbdw = ''
                    })
                })
            })
        } else {
          this.$message.error('请填入必须数据！');
        }
      },

      addzzb() {
        if (this.zbb.dwmc != '' && this.zbb.df != '' && this.zbb.pbsj != '' && this.zbb.pbsj != '') {
          //修改招标记录表
          axios.get('http://localhost:8080/api/zbjl/updataweizhongbiao', {
            params: {
              zbjlid: this.zbjlid
            }
          })
            .then(res => {
              //添加未中标记录
              axios.post('http://localhost:8080/api/zbb/addzbb', this.zbb)
                .then(res => {
                  //未中标表重新请求
                  axios.get('http://localhost:8080/api/zbb/selectZbb', {
                    params: {
                      xmid: this.$store.state.xm.xmid
                    }
                  })
                    .then(res => {
                      this.tableData = res.data
                      this.zbb.pbsj = ''
                      this.zbb.df = ''
                    })
                })
            })
          this.dialogFormVisible1 = false
        } else {
          this.$message.error('请填入必须数据！');
        }
      }
    }
  }
</script>

<style scoped>

</style>
