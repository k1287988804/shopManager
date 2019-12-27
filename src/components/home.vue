<template>
  <el-container class="home-container">
    <el-header>
      <div class="leftDiv">
        <img src="./../images/360.png" alt />
        <span>KK电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened>
          <el-submenu :index="String(item.id)" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="[iconsObj[item.id],'iconFont']"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="String(subitem.id)"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconsStr:['icon-users','icon-dice','icon-cart','icon-clipboard','icon-stats-dots'], //5个icon图标
      iconsObj: {}
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      this.menulist.forEach((item,i)=>{
          this.iconsObj[item.id] = this.iconsStr[i]
      }) 
      console.log(this.iconsObj); 
      console.log(this.menulist);
    }
  }
};
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #373d41;
  align-items: center;
  .leftDiv {
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;

    img {
      width: 50px;
    }
    span {
      display: inline-block;
      width: auto;
      height: 60px;
      font-size: 20px;
      color: white;
      margin-left: 15px;
      line-height: 60px;
      vertical-align: middle;
    }
  }
}
.el-aside {
  background-color: #333744;
  .iconFont{
      margin-right:10px;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>