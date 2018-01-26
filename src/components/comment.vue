<template>
    <div id="comment" style="height: 100%;">
      <yd-layout>
        <!--头部导航-->
        <yd-navbar slot="navbar" title="评论" bgcolor="#09bb07" color="#fff" style="height: .9rem">
            <yd-icon slot="right" name="feedback" size=".5rem" color="#fff" @click.native="show = true"></yd-icon>
        </yd-navbar>

        <!--主体内容-->
        <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
          <yd-list theme="4">

          </yd-list>

          <div>
            <ul class="list" slot="list">
              <li v-for="item in dataList">
                <div style="display: inline-flex;line-height: 32px;width: 100%;">
                  <img slot="icon" :src="item.portrait" style="max-width: 48px;max-height: 48px;height: .8rem;">
                  <h3 slot="left" style="font-family: 楷体;font-weight: bolder;">{{item.nickName}}</h3>
                </div>
                <div class="content" v-html="item.content"></div>
                <span>评论时间  • {{item.post_time}}</span>
                <span v-if="item.user_id==user_id || isAuthor" style="float: right">
                  <yd-badge  type="danger" color="#fff" @click.native.once="deleteComment(item.id)">删 除</yd-badge >
                </span>
                <span v-if="item.user_id==user_id" style="float: right">
                  <yd-badge  type="warning" color="#fff" @click.native="show2 = true,content2 = item.content,id = item.id">编 辑</yd-badge >
                </span>

                <!--编辑评论-->
                <yd-popup v-model="show2" position="bottom" height="30%">
                  <yd-cell-item>
                    <yd-textarea slot="right" placeholder="请输入评论内容" v-model="content2"></yd-textarea>
                  </yd-cell-item>
                  <div v-if="content2">
                    <yd-button size="large" type="primary" style="margin:25px auto;width: 80%;" @click.native="changeComment(id)">编辑评论</yd-button>
                  </div>
                  <div v-else>
                    <yd-button size="large" type="disabled" disabled style="margin:25px auto;width: 80%;">编辑评论</yd-button>
                  </div>
                </yd-popup>
              </li>
            </ul>
          </div>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" style="text-align: center;margin-top: 20px;">
            <img src="./../assets/loading.gif" v-if="loading">
          </div>
          <yd-backtop></yd-backtop>
        </yd-pullrefresh>

      </yd-layout>

      <!--发布评论-->
      <yd-popup v-model="show" position="bottom" height="30%">
        <yd-cell-item>
          <yd-textarea slot="right" placeholder="请输入评论内容" v-model="content"></yd-textarea>
        </yd-cell-item>
        <div v-if="content">
          <yd-button size="large" type="primary" style="margin:25px auto;width: 80%;" @click.native="submit">发 布</yd-button>
        </div>
        <div v-else>
          <yd-button size="large" type="disabled" disabled style="margin:25px auto;width: 80%;">发 布</yd-button>
        </div>
      </yd-popup>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'comment',
    components: {},
    data () {
        return {
          loading: false,
          busy: true,
          page: 1,
          pagesize: 8,
          show: false,
          show2: false,
          id: null,
          user_id: window.localStorage.getItem('userId'),
          isAuthor: false,
          nickName: '',
          portrait: '',
          content: '',
          content2: '',
          dataList: [],
        }
    },
    beforeCreate () {
      this.$dialog.loading.open('加载中');
    },
    created () {
      this.$dialog.loading.close();
    },
    mounted () {
      this.getAuthor();
      this.getComment();

    },
    computed: {},
    methods: {
      //获取用户的昵称
      getAuthor() {
        axios.post('/api_write/author',{
          userId: window.localStorage.getItem('userId'),
          access_token: window.localStorage.getItem('access_token'),
        })
          .then((response)=>{
            let res = response.data.result;
            this.nickName = res.data.nickName;
            this.portrait = res.data.portrait;
          })
          .catch((error)=>{
            this.$dialog.toast({
              mes: '出错了',
              timeout: 1500,
              icon: 'error',
            });
          });
      },

      //获取评论信息
      getComment(flag) {
        this.loading = true;
        axios.post('/api_article/comment',{
          userId: window.localStorage.getItem('userId'),
          access_token: window.localStorage.getItem('access_token'),
          article_id: this.$route.query.id,
          page: this.page,
          pagesize: this.pagesize,
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

            //检查文章作者
            if (this.$route.query.authorId==window.localStorage.getItem('userId')) {
              this.isAuthor = true
            }else {
              this.isAuthor = false
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

      //提交评论
      submit() {
        let now = new Date();
        axios.post('/api_article/submitComment',{
          userId: window.localStorage.getItem('userId'),
          access_token: window.localStorage.getItem('access_token'),
          article_id: this.$route.query.id,
          nickName: this.nickName,
          portrait: this.portrait,
          post_time: now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate(),
          content: this.content,
        })
          .then((response)=>{
            this.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'success',
            });
            location.reload();
          })
          .catch((error)=>{
            this.$dialog.toast({
              mes: '出错了',
              timeout: 1500,
              icon: 'error',
            });
          });
      },

      //编辑评论
      changeComment(id) {
        let now = new Date();
        axios.post('/api_article/changeComment',{
          userId: window.localStorage.getItem('userId'),
          access_token: window.localStorage.getItem('access_token'),
          id: id,
          nickName: this.nickName,
          portrait: this.portrait,
          post_time: now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate(),
          content: this.content2,
        })
          .then((response)=>{
            this.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'success',
            });
            location.reload();
          })
          .catch((error)=>{
            this.$dialog.toast({
              mes: '出错了',
              timeout: 1500,
              icon: 'error',
            });
          });
      },

      //删除评论
      deleteComment(id) {
        axios.post('/api_article/deleteComment',{
          userId: window.localStorage.getItem('userId'),
          access_token: window.localStorage.getItem('access_token'),
          id: id,
          article_id: this.$route.query.id,
        })
          .then((response)=>{
            this.$dialog.toast({
              mes: response.data.msg,
              timeout: 1500,
              icon: 'success',
            });
            location.reload();
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
          this.getComment(true);
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
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
  }

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
