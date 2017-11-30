<template>
    <div id="search" style="height: 100%;">
      <yd-layout>
        <!--头部导航-->
        <yd-navbar slot="navbar" title="搜索" bgcolor="#09bb07" color="#fff">

        </yd-navbar>

        <!--搜索框-->
        <yd-search v-model="search_text" :on-submit="search"></yd-search>

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
          <yd-tabbar-item title="搜索" link="/search" active>
            <yd-icon name="search" slot="icon"></yd-icon>
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
  name: 'search',
  data () {
      return {
        search_text: '',
      }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    //搜索方法
    search () {

    },
  },
  components:{  },
}
</script>

<style scoped>

</style>
