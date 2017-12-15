<template>
    <div id="write" style="height: 100%;">
      <yd-layout>
        <!--头部导航-->
        <yd-navbar slot="navbar" title="发布文章" bgcolor="#09bb07" color="#fff" style="height: .9rem">

        </yd-navbar>

        <!--主体内容-->
        <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
          <yd-list theme="4">

          </yd-list>

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
            <yd-icon name="order" slot="icon"></yd-icon>
            <yd-badge slot="badge" type="danger">2</yd-badge>
          </yd-tabbar-item>
          <yd-tabbar-item title="搜索" link="/search">
            <yd-icon name="search" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="发布文章" link="/write" active>
            <yd-icon name="feedback" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="个人中心" link="/admin">
            <yd-icon name="ucenter-outline" slot="icon"></yd-icon>
          </yd-tabbar-item>
        </yd-tabbar>
      </yd-layout>
    </div>
</template>

<script>
export default {
    name: 'write',
  data () {
    return {

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
