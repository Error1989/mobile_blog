<template>
  <div id="search" style="height: 100%;">
    <yd-layout>
      <!--头部导航-->
      <yd-navbar slot="navbar" title="搜索" bgcolor="#09bb07" color="#fff" style="height: .9rem">

      </yd-navbar>

      <!--搜索框-->
      <yd-search v-model="searchData" :on-submit="search"></yd-search>

      <!--主体内容-->
      <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
        <yd-list theme="4">

        </yd-list>

        <!--热门标签-->
        <yd-cell-group>
          <yd-cell-item>
            <yd-icon slot="icon" name="discount" color="#FF685D" size=".42rem"></yd-icon>
            <span slot="left" style="font-weight: bolder">热门标签</span>
          </yd-cell-item>
        </yd-cell-group>
        <yd-button-group>
          <yd-button size="small" shape="circle" type="hollow" style="margin: 5px;text-align: center">Python</yd-button>
          <yd-button size="small" shape="circle" type="hollow" style="margin: 5px;text-align: center">Javascript</yd-button>
          <yd-button size="small" shape="circle" type="hollow" style="margin: 5px;text-align: center">游戏</yd-button>
          <yd-button size="small" shape="circle" type="hollow" style="margin: 5px;text-align: center">MySQL</yd-button>
          <yd-button size="small" shape="circle" type="hollow" style="margin: 5px;text-align: center">汽车</yd-button>

        </yd-button-group>

        <yd-cell-group style="margin-top: 20px;">
          <yd-cell-item>
            <yd-icon slot="icon" name="discover" color="#FF685D" size=".42rem"></yd-icon>
            <span slot="left" style="font-weight: bolder">{{tip}}</span>
          </yd-cell-item>
        </yd-cell-group>

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
        <yd-tabbar-item title="搜索" link="/search" active>
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
export default {
  name: 'search',
  data () {
      return {
        tip: '等待搜索',
        searchData: '',
        loading: false,
        busy: true,
        page: 1,
        pagesize: 8,
        dataList:[],
        count: '',
      }
  },
  watch: {
    searchData: function () {
      this.dataList=[];
      this.page=1;
      this.tip = '等待搜索';
    },
    count: function () {
      this.tip = '搜索结果';
    },
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
    //搜索方法
    search (flag) {
      this.loading = true;
      axios.post('/api_search',{
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
            mes: '搜索失败',
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
        this.search(true);
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
  components:{  },
}
</script>

<style scoped>
  .list {
    width:100%;
    height: auto;
  }
  .list li {
    width:100%;
    height: auto;
    border-bottom: 1px dashed #c9c9c9;
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
