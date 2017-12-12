<template>
  <div id="partition" style="height: 100%;">
    <yd-layout>
      <!--头部导航-->
      <yd-navbar slot="navbar" title="分区" bgcolor="#09bb07" color="#fff" style="height: .9rem">

      </yd-navbar>

      <!--轮播图-->
      <slide></slide>

      <!--板块分类-->
      <yd-grids-group :rows="3">
        <yd-grids-item link="science">
          <yd-icon name="phone3" slot="icon" color="#FF685D"></yd-icon>
          <span slot="text">科技</span>
        </yd-grids-item>
        <yd-grids-item link="game">
          <yd-icon name="qq" slot="icon" color="#FF685D"></yd-icon>
          <span slot="text">游戏</span>
        </yd-grids-item>
        <yd-grids-item link="music">
          <yd-icon name="play" slot="icon" color="#FF685D"></yd-icon>
          <span slot="text">音乐</span>
        </yd-grids-item>
        <yd-grids-item link="car">
          <yd-icon name="setting" slot="icon" color="#FF685D"></yd-icon>
          <span slot="text">汽车</span>
        </yd-grids-item>
        <yd-grids-item link="video">
          <yd-icon name="video" slot="icon" color="#FF685D"></yd-icon>
          <span slot="text">影视</span>
        </yd-grids-item>
        <yd-grids-item link="military">
          <yd-icon name="shield-outline" slot="icon" color="#FF685D"></yd-icon>
          <span slot="text">军事</span>
        </yd-grids-item>
      </yd-grids-group>

      <yd-backtop></yd-backtop>

      <!--底部导航-->
      <yd-tabbar slot="tabbar">
        <yd-tabbar-item title="首页" link="/index">
          <yd-icon name="home-outline" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="分区" link="/partition" active>
          <yd-icon name="type" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="消息" link="/message">
          <yd-icon name="feedback" slot="icon"></yd-icon>
          <yd-badge slot="badge" type="danger">2</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="搜索" link="/search">
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
import slide from './slide.vue'
export default {
    name: 'partition',
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
    methods: {

    },
  components:{ slide, },
}
</script>

<style scoped>

</style>
