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
          <yd-cell-group>
            <yd-cell-item>
              <span slot="left">{{nickName}}</span>
              <span slot="right"><img slot="img" :src="portrait" style="max-width: 58px;max-height: 58px;"></span>
            </yd-cell-item>
            <yd-cell-item>
              <span slot="left">标题：</span>
              <input slot="right" max="32" v-model="title" type="text" placeholder="请输入文章标题">
            </yd-cell-item>
            <yd-cell-item arrow type="label">
              <span slot="left">分区：</span>
              <select slot="right" v-model="partition">
                <option value="">请选择分区</option>
                <option value="科技">科技</option>
                <option value="游戏">游戏</option>
                <option value="音乐">音乐</option>
                <option value="汽车">汽车</option>
                <option value="影视">影视</option>
                <option value="军事">军事</option>
              </select>
            </yd-cell-item>

              <yd-cell-item>
                <el-input
                  type="textarea"
                  slot="right"
                  :rows="12"
                  style="margin: 20px;"
                  placeholder="请输入文章内容"
                  v-model="content">
                </el-input>
              </yd-cell-item>

          </yd-cell-group>
          <yd-backtop></yd-backtop>
          <div v-if="nickName&&title&&partition&&content">
            <yd-button size="large" type="primary" @click.native="submit">提 交</yd-button>
          </div>
          <div v-else>
            <yd-button size="large" type="disabled" disabled>提 交</yd-button>
          </div>
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
import axios from 'axios'
export default {
    name: 'write',
  data () {
    return {
      nickName: '',
      portrait: '',
      title: '',
      partition: '',
      content: '',
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
  },
  computed: {

  },
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

    //提交文章
    submit() {
      let now = new Date();
      axios.post('/api_write',{
        userId: window.localStorage.getItem('userId'),
        access_token: window.localStorage.getItem('access_token'),
        nickName: this.nickName,
        portrait: this.portrait,
        title: this.title,
        partition: this.partition,
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
