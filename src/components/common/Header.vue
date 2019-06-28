<template>
  <el-container>
    <el-header style="padding:0">
      <el-row>
        <el-col :span="4">
          <div class="logo">
            <img src="../../assets/images/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="text">
            <img src="../../assets/images/logo-famil.png" alt>
            <span>天率家人</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="aside-container">
      <el-aside width="16.6%">
      <el-menu style="border-right:0px solid" :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo mymenu">
        <el-submenu index="1">
            <!-- 一级菜单 -->
            <template slot="title">
                 <img class="banner-img" src="../../assets/images/banner1.png" alt>
                <i></i>
                <span>banner管理</span>
            </template>
            <el-menu-item index="/" style="padding-left: 57px;">
                <i></i>
                <span>首页banner</span>
            </el-menu-item>
             <el-menu-item index="/Peopbanner" style="padding-left: 57px;">
                <i></i>
                <span>艺人banner</span>
            </el-menu-item>
              <el-menu-item index="/matchbanner" style="padding-left: 57px;">
                <i></i>
                <span>赛事banner</span>
            </el-menu-item>
              <el-menu-item index="/aboutbanner" style="padding-left: 57px;">
                <i></i>
                <span>关于我们banner</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
              <img class="banner-img" src="../../assets/images/banner2.png" alt>
                <i></i>
                <span>艺人管理</span>
            </template>
            <el-menu-item class="all" index="/allpeople" style="padding-left: 57px;">
                <i></i>
                <span>所有艺人</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
              <img class="banner-img" src="../../assets/images/banner3.png" alt>
                <i ></i>
                <span>赛事管理</span>
            </template>
            <el-menu-item index="/match" style="padding-left: 57px;">
                <i></i>
                <span>所有赛事</span>
            </el-menu-item>
        </el-submenu>
         <el-submenu index="4">
            <template slot="title">
              <img class="banner-img" src="../../assets/images/banner4.png" alt>
                <i></i>
                <span>新闻动态</span>
            </template>
            <el-menu-item index="news" style="padding-left: 57px;">
                <i></i>
                <span>所有新闻动态</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
      </el-aside>
      <el-main style="padding:0px">
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {}
</script>

<style>
body{
  margin: 0;
}

.el-container {
  min-height: calc(100vh - 60px);
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0;
}
.el-aside {
  background-color: #fff;
  color: #333;
  border-top: 1px solid #E6E6E6;
  box-shadow: 2px 2px 10px #888888;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
/* 头部 */
.logo {
  background: #fff;
  height: 60px;
  text-align: center;
  /* box-shadow: 2px 2px 10px #888888; */
}
.logo img {
  margin-top: 5px;
  width: 142px;
}
.text {
  background: #fff;
}
.el-col {
  background: #fff;
  height: 60px;
  box-shadow: 3px -6px 5px #888888;
}
.text {
  float: right;
}
.text img {
  height: 24px;
  width: 24px;
  padding-right: 10px;
  margin-bottom: -6px;
}
.text span {
  font-size: 7px;
  padding-right: 53px;
  color: rgba(102, 102, 102, 1);
  line-height: 15px;
}

/* 侧边栏 */
.banner-img {
  margin-right: 24px;
  height: 16px;
  width: 16px;
}
.el-menu-item span {
  font-size: 7px;
  color:rgba(153,153,153,1);
}
.el-menu-item :hover{
  color:#1890FF;

}
</style>
