<template>
    <div id="admin" style="height: 100%;">
      <yd-layout>
        <!--头部导航-->
        <yd-navbar slot="navbar" title="个人中心" bgcolor="#09bb07" color="#fff">

        </yd-navbar>

        <!--主体部分-->
        <yd-tab>
          <yd-tab-panel label="账号资料">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">用户名</span>
                <span slot="right">syntax error</span>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">性别</span>
                <span slot="right">男</span>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">出生日期</span>
                <span slot="right">1989年10月9日</span>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">个性签名</span>
                <span slot="right"></span>
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left">编辑资料</span>
                <span slot="right"></span>
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left">修改密码</span>
                <span slot="right"></span>
              </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
              <yd-button size="large" type="danger" style="margin-top: 25%;">退出登录</yd-button>
            </yd-cell-group>
          </yd-tab-panel>

          <yd-tab-panel label="发布信息">

          </yd-tab-panel>

          <yd-tab-panel label="收藏夹">

          </yd-tab-panel>
        </yd-tab>

        <yd-backtop></yd-backtop>

        <!--底部导航-->
        <yd-tabbar slot="tabbar">
          <yd-tabbar-item title="首页" link="/index">
            <yd-icon name="home-outline" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="分区" link="/partition">
            <yd-icon name="type" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="消息" link="/message">
            <yd-icon name="feedback" slot="icon"></yd-icon>
            <yd-badge slot="badge" type="danger">2</yd-badge>
          </yd-tabbar-item>
          <yd-tabbar-item title="搜索" link="/search">
            <yd-icon name="search" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="个人中心" link="/admin" active>
            <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
          </yd-tabbar-item>
        </yd-tabbar>
      </yd-layout>
    </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
      return {

      }
  },
  mounted () {

  },
  computed: {

  },
  methods: {

  },
  components:{  },
}
</script>

<style scoped>

</style>
