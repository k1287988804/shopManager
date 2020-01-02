<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="userParams.query" clearable @clear="getUserInfo">
            <el-button slot="append" icon="el-icon-search" @click="getUserInfo"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
          <!--修改-->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"> </el-button>
          <!--删除-->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="Top Center 提示文字"
            placement="top"
            :enterable="false"
          >
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userParams.pagenum"
        :page-sizes="[1,2,5,10]"
        :page-size="userParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClose" :close-on-click-modal="false">
      <el-form ref="addFormRef" :model="addForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

     <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" @close="editDialogClose" :close-on-click-modal="false">
      <el-form ref="editFormRef" :model="editForm" label-width="80px" :rules="editFormRules">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }

    return {
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
      },
      editFormRules:{
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }]
      },
      userlist: [],
      total: 0,
      userParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      addDialogVisible: false,
      editDialogVisible: false,
      editId : '',
      editForm:{}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$http
        .get('users', { params: this.userParams })
        .then(({ data: res }) => {
          if (res.meta.status !== 200) {
            return this.$message.error('获取用户列表失败')
          }
          this.userlist = res.data.users
          this.total = res.data.total
        })
    },
    handleSizeChange(newSize) {
      this.userParams.pagesize = newSize
      this.getUserInfo()
    },
    handleCurrentChange(newPage) {
      this.userParams.pagenum = newPage
      this.getUserInfo()
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      console.log(res)
      if (!res.meta.status == 200) {
        this.userParams.mg_state = !this.userParams.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功!')
    },
    addDialogClose(){
      this.$refs.addFormRef.resetFields()
    },
    addUser(){
      this.$refs.addFormRef.validate(async valid => {
        if(!valid) return 
        const {data:res} = await this.$http.post('users',this.addForm)
        console.log(res)
        if(res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
          return 
        }
        this.$message.success('添加用户成功!')
        this.addDialogVisible = false
        this.getUserInfo()

      })
    },
    async showEditDialog(editId){
      this.editId = editId
      const {data:res} = await this.$http.get("users/"+editId)
      if(res.meta.status !== 200){
        return this.$message.error("查询用户信息失败！")
      }
      this.editForm =  res.data

      this.editDialogVisible = true
    },
    editDialogClose(){
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo(){
      this.$refs.editFormRef.validate(async valid => {
        if(!valid) return 
        const {data:res} = await this.$http.put('users/'+this.editForm.id,{email:this.editForm.email,mobile:this.editForm.mobile})
        console.log(res)
        if(res.meta.status !== 200) {
          this.$message.error('更改用户失败！')
          return 
        }
        this.$message.success('更改用户成功!')
        this.editDialogVisible = false
        this.getUserInfo()
      })
    },
    removeUserById(userId){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         closeOnClickModal:false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data:res} = await this.$http.delete("users/"+userId)
          if(res.meta.status !==200){
            return this.$message.error('删除用户失败')
          }
          this.getUserInfo()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>

<style lang='less' scoped>
</style>