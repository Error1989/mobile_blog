<template>
  <div id="index" style="height: 100%;">
    <yd-layout>
      <!--头部导航-->
      <yd-navbar slot="navbar" title="首页" bgcolor="#09bb07" color="#fff" style="height: .9rem">
        <router-link to="#" slot="right">
          <yd-icon name="qrscan" size=".5rem" color="#fff"></yd-icon>
        </router-link>
      </yd-navbar>

      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
        <yd-list theme="4">

        </yd-list>

        <!--轮播图-->
      <slide></slide>

      <!--滚动公告-->
      <yd-flexbox style="margin-top: 10px;margin-bottom: 10px;">
        <img src="//st.360buyimg.com/m/images/index/jd-news-tit.png" style="width: 73px;height: 16px;margin-left:15px;margin-right: 4px;">
        <yd-rollnotice autoplay="2000">
          <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>荣耀V9 3月超级钜惠！</yd-rollnotice-item>
          <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>3.23京东超级品牌日格力盛典</yd-rollnotice-item>
          <yd-rollnotice-item><span style="color:#F00;"> 荐 </span>京东服饰 早春新品低至7折</yd-rollnotice-item>
        </yd-rollnotice>
      </yd-flexbox>

      <!--主体内容-->
        <div>
          <ul class="list" slot="list">
            <li v-for="item in dataList">
              <router-link :to="{ path: '/article', query: { id: item.id } }">
                <h3>{{item.title}}</h3>
              </router-link>
              <span>赞同 • {{item.approval}}</span><span>评论 • {{item.comment}}</span><span>作者 • {{item.author}}</span>
            </li>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" style="text-align: center;margin-top: 20px;">
              <img src="./../assets/loading.gif" v-if="loading">
            </div>
          </ul>
        </div>

        <yd-backtop></yd-backtop>
      </yd-pullrefresh>

      <!--底部导航-->
      <yd-tabbar slot="tabbar">
        <yd-tabbar-item title="首页" link="/index" active>
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
        <yd-tabbar-item title="发布文章" link="/write">
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
  import axios from 'axios'
import slide from './slide.vue'
export default {
  name: 'index',
  data () {
    return {
      loading: false,
      busy: true,
      page: 1,
      pagesize: 8,
      dataList:[],
    }
  },
  beforeCreate () {
    this.$dialog.loading.open('加载中');
  },
  created () {
    this.$dialog.loading.close();
  },
  mounted () {
    this.getList();
  },
  computed: {

  },
  methods: {
    //获取列表数据
    getList (flag) {
      this.loading = true;
      axios.post('/api_index',{
        page: this.page,
        pagesize: this.pagesize,
        searchData:this.searchData,
      })
        .then((response)=>{
          let res = response.data.result;
          this.loading = false;
          this.count = res.count;
          if(flag) {
            this.dataList=this.dataList.concat(res.data);//flag为true,分页的数据累加
            if(res.count<this.pagesize || res.count==0) {
              this.busy=true;
            }else {
              this.busy=false;
            }
          }else {
            this.dataList=res.data;//第一次加载页面，数据不累加
            this.busy=false;
          }
        })
        .catch((error)=>{
          this.$dialog.toast({
            mes: '出错了',
            timeout: 1500,
            icon: 'error',
          });
        });
    },

    //分页功能
    loadMore(){
      this.busy=true;
      setTimeout(() => {
        this.page++;
        this.getList(true);
      }, 500);
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
  components:{ slide, },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list {
    width:100%;
    height: auto;
  }
  .list li {
    width:100%;
    height: auto;
    border-bottom: 1px solid #c9c9c9;
    padding: 5px;
  }
  .list h3 {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 25px;
  }
  .list span {
    margin-right: 20px;
    color: #979797;
    font-family: 楷体;
    font-size: 16px;
  }
</style>
