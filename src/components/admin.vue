<template>
  <div id="admin" style="height: 100%;">
    <yd-layout>
      <!--头部导航-->
      <yd-navbar slot="navbar" title="个人中心" bgcolor="#09bb07" color="#fff" style="height: .9rem">

      </yd-navbar>

      <!--主体内容-->
      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
        <yd-list theme="4">

        </yd-list>

        <yd-tab>
          <yd-tab-panel label="账号资料">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">用户头像</span>
                <span slot="right"><img slot="img" src="../assets/img/head.png"></span>
              </yd-cell-item>
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
              <yd-button size="large" type="danger" style="margin-top: 15%;">退出登录</yd-button>
            </yd-cell-group>
          </yd-tab-panel>

          <yd-tab-panel label="发布信息">

           </yd-tab-panel>

          <yd-tab-panel label="关注列表">

          </yd-tab-panel>

          <yd-tab-panel label="收藏夹">

          </yd-tab-panel>
        </yd-tab>

        <yd-backtop></yd-backtop>
      </yd-pullrefresh>

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
  import axios from 'axios'
export default {
  name: 'admin',
  data () {
      return {
        dataUser:[],
      }
  },
  beforeCreate () {
    this.$dialog.loading.open('加载中');
  },
  created () {
    this.$dialog.loading.close();
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    //获取账号资料
    getUser () {
      axios.post('/api_admin',{

      })
        .then((response)=>{
          let res = response.data.result;
          this.dataUser = res.data;
        })
        .catch((error)=>{
          this.$dialog.toast({
            mes: '出错了',
            timeout: 1500,
            icon: 'error',
          });
        });
    },

    //下拉刷新
    loadList() {
      location.reload();
      this.$dialog.toast({
        mes: '页面正在刷新',
      });
      this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
    },

  },
  components:{  },
}
</script>

<style scoped>

</style>
