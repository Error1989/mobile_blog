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
              <img slot="icon" :src="dataArticle.portrait" style="max-width: 58px;max-height: 58px;height: .8rem;">
              <span slot="left" style="font-family: 楷体;font-weight: bolder;">{{dataArticle.author}}</span>
              <span slot="right" v-if="isShow"><yd-button type="primary" :disabled="isFollow" @click.native="follow">关 注</yd-button></span>
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
          <yd-tabbar-item title="赞同" :active="isApproval" type="a" herf="#" @click.native="approval">
            <yd-icon name="good" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="收藏" :active="isCollection" type="a" herf="#" @click.native="collection">
            <yd-icon name="star-outline" slot="icon"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="评论" :active="isLogin" :link="comment_id">
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
            dataArticle: [],
            comment_id: '/comment?id='+this.$route.query.id+'&authorId='+this.$route.query.authorId,
            isApproval: true,
            isCollection: true,
            isFollow: false,
            isShow: true,
            isLogin: false,
          }
      },
      beforeCreate () {
        this.$dialog.loading.open('加载中');
      },
      created () {
        this.$dialog.loading.close();
        this.checkAuthor();
        this.checkApproval();
        this.checkCollection();
        this.checkFollow();
      },
      mounted () {
        if (window.localStorage.getItem('userId')&&window.localStorage.getItem('access_token')) {
            this.isLogin = true
        }else {
          this.isLogin = false
        }
        this.getArticle();
      },
      watch: {

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

        //点赞
        approval() {
          this.isApproval = !this.isApproval;
          axios.post('/api_article/approval',{
            userId: window.localStorage.getItem('userId'),
            access_token: window.localStorage.getItem('access_token'),
            article_id:this.dataArticle.id,
          })
            .then((response)=>{
              this.$dialog.toast({
                mes:response.data.msg,
                timeout: 1500,
              });
            })
            .catch((error)=>{
              this.$dialog.toast({
                mes: '出错了',
                timeout: 1500,
                icon: 'error',
              });
            });
        },

        //收藏
        collection() {
          this.isCollection = !this.isCollection;
          axios.post('/api_article/collection',{
            userId: window.localStorage.getItem('userId'),
            access_token: window.localStorage.getItem('access_token'),
            article_id:this.dataArticle.id,
          })
            .then((response)=>{
              this.$dialog.toast({
                mes:response.data.msg,
                timeout: 1500,
              });
            })
            .catch((error)=>{
              this.$dialog.toast({
                mes: '出错了',
                timeout: 1500,
                icon: 'error',
              });
            });
        },

        //关注
        follow() {
          axios.post('/api_article/follow',{
            userId: window.localStorage.getItem('userId'),
            access_token: window.localStorage.getItem('access_token'),
            authorId:this.dataArticle.authorId,
          })
            .then((response)=>{
              this.$dialog.toast({
                mes:response.data.msg,
                timeout: 1500,
              });
            })
            .catch((error)=>{
              this.$dialog.toast({
                mes: '出错了',
                timeout: 1500,
                icon: 'error',
              });
            });
        },

        //检查是否赞同过文章
        checkApproval () {
          axios.post('/api_article/checkApproval',{
            userId: window.localStorage.getItem('userId'),
            access_token: window.localStorage.getItem('access_token'),
            article_id:this.$route.query.id,
          })
            .then((response)=>{
              if(response.data.status==='0') {
                this.isApproval = true;
              }else {
                this.isApproval = false;
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

        //检查是否收藏过文章
        checkCollection () {
          axios.post('/api_article/checkCollection',{
            userId: window.localStorage.getItem('userId'),
            access_token: window.localStorage.getItem('access_token'),
            article_id:this.$route.query.id,
          })
            .then((response)=>{
              if(response.data.status==='0') {
                this.isCollection = true;
              }else {
                this.isCollection = false;
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

        //检查是否关注过作者
        checkFollow() {
          axios.post('/api_article/checkFollow',{
            userId: window.localStorage.getItem('userId'),
            access_token: window.localStorage.getItem('access_token'),
            authorId:this.$route.query.authorId,
          })
            .then((response)=>{
              if(response.data.status==='0') {
                this.isFollow = false;
              }else {
                this.isFollow = true;
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

        //检查登录用户是否为本篇文章的作者
        checkAuthor() {
          let userId = window.localStorage.getItem('userId');
          let authorId = this.$route.query.authorId;
          if(userId==authorId) {
            this.isShow = false;
          }
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
