<template>
    <div id="article" style="height: 100%;">
      <yd-layout>
        <!--头部导航-->
        <yd-navbar slot="navbar" title="文章" bgcolor="#09bb07" color="#fff" style="height: .9rem">

        </yd-navbar>

        <!--主体内容-->
        <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
          <yd-list theme="4">

          </yd-list>

          <yd-cell-group>
            <yd-cell-item>
              <img slot="icon" :src="dataArticle.portrait">
              <span slot="left" style="font-family: 楷体;font-weight: bolder">{{dataArticle.author}}</span>
              <span slot="right"><yd-button type="primary">关 注</yd-button></span>
            </yd-cell-item>
          </yd-cell-group>

          <div class="main">
            <h3>{{dataArticle.title}}</h3>
            <span><h4>发布时间： {{dataArticle.post_time}}</h4></span>
            <div class="content" v-html="dataArticle.content"></div>
          </div>

          <yd-backtop></yd-backtop>
        </yd-pullrefresh>
        <!--底部导航-->
        <yd-tabbar slot="tabbar">
          <yd-tabbar-item title="赞同" link="">
            <yd-icon name="good" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="收藏" link="">
            <yd-icon name="star-outline" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="评论" link="">
            <yd-icon name="compose" slot="icon"></yd-icon>
          </yd-tabbar-item>
        </yd-tabbar>

      </yd-layout>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: 'article',
        data () {
            return {
              dataArticle:[],
            }
        },
        beforeCreate () {
          this.$dialog.loading.open('加载中');
        },
        created () {
          this.$dialog.loading.close();
        },
        mounted () {
          this.getArticle();
        },
        computed: {

        },
        methods: {
          //获取文章
          getArticle () {
            axios.post('/api_article',{
              article_id:this.$route.query.id,
            })
              .then((response)=>{
                let res = response.data.result;
                this.dataArticle = res.data;
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
        components: {

        },
    }
</script>

<style scoped>
  .main {
    width:100%;
    height: auto;
  }
  .main h3 {
    font-size: 24px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .main span h4 {
    text-align: center;
    color: #979797;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .content {
    margin: 15px;
  }
</style>
