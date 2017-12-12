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
            <div>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left">用户头像</span>
                  <span slot="right"><img slot="img" :src=dataUser.portrait></span>
                </yd-cell-item>
                <yd-cell-item>
                  <span slot="left">昵称</span>
                  <span slot="right">{{dataUser.nickName}}</span>
                </yd-cell-item>
                <yd-cell-item>
                  <span slot="left">性别</span>
                  <span slot="right">{{dataUser.sex}}</span>
                </yd-cell-item>
                <yd-cell-item>
                  <span slot="left">出生日期</span>
                  <span slot="right">{{dataUser.birthday}}</span>
                </yd-cell-item>
                <yd-cell-item>
                  <span slot="left">个性签名</span>
                  <span slot="right">{{dataUser.autograph}}</span>
                </yd-cell-item>
                <div v-if="show2">
                  <yd-cell-item arrow @click.native="show3 = true">
                    <span slot="left">编辑资料</span>
                    <span slot="right"></span>
                  </yd-cell-item>
                  <yd-cell-item arrow @click.native="show4 = true">
                    <span slot="left">修改密码</span>
                    <span slot="right"></span>
                  </yd-cell-item>
                </div>
              </yd-cell-group>
            </div>

            <div v-if="!show2">
              <yd-cell-group>
                <yd-button size="large" type="primary" style="margin-top: 15%;" @click.native="show = true">登录</yd-button>
              </yd-cell-group>
            </div>

            <div v-else="show2">
              <yd-cell-group>
                <yd-button size="large" type="danger" style="margin-top: 15%;" @click.native="signOut">退出登录</yd-button>
              </yd-cell-group>
            </div>

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

      <yd-popup v-model="show3" position="center" width="90%">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">昵称：</span>
            <yd-input slot="right" min="4" max="16" required v-model="nickName" placeholder="请输入新的昵称"></yd-input>
          </yd-cell-item>

          <yd-cell-item arrow type="label">
            <span slot="left">性别：</span>
            <select slot="right" v-model="sex">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </yd-cell-item>

          <yd-cell-item arrow>
            <span slot="left">生日：</span>
            <yd-datetime slot="right" type="date" start-date="1900-01-01" end-date="2100-01-01" v-model="birthday"></yd-datetime>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">个性签名：</span>
            <yd-input slot="right" max="32" v-model="autograph" placeholder="请输新的个性签名（可不填）"></yd-input>
          </yd-cell-item>
        </yd-cell-group>

        <div v-if="nickName&&sex&&birthday">
          <yd-button size="large" type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="changeData">提交</yd-button>
        </div>

        <div v-else>
          <yd-button size="large" disabled type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="changeData">提交</yd-button>
        </div>

      </yd-popup>

      <yd-popup v-model="show4" position="center" width="90%">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">旧密码：</span>
            <yd-input slot="right" min="6" max="16" required type="password" v-model="oldPassword" placeholder="请输入旧密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">新密码：</span>
            <yd-input slot="right" min="6" max="16" required type="password" v-model="newPassword" placeholder="请输入新密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">确认新密码：</span>
            <yd-input slot="right" min="6" max="16" required type="password" v-model="newPassword2" placeholder="请再次输入新密码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>

        <div v-if="newPassword==newPassword2&&oldPassword!=newPassword&&oldPassword&&newPassword&&newPassword2">
          <yd-button size="large" type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="changePassword">提交</yd-button>
        </div>

        <div v-else>
          <yd-button size="large" disabled type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="changePassword">提交</yd-button>
        </div>

      </yd-popup>

      <yd-popup v-model="show" position="center" width="90%">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">用户名：</span>
            <yd-input slot="right" required v-model="userName" max="20" placeholder="请输入用户名"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">密码：</span>
            <yd-input slot="right" required type="password" v-model="userPassword" placeholder="请输入密码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>

        <yd-button size="large" type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="login">提交</yd-button>

      </yd-popup>

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
        show: false,
        show2:window.localStorage.getItem('userId'),
        show3: false,
        show4: false,
        start: false,
        userName: '',
        userPassword: '',
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        nickName: '',
        sex: '',
        birthday: '',
        autograph: '',
        dataUser:[],
      }
  },
  watch: {

  },
  beforeCreate () {
    this.$dialog.loading.open('加载中');
  },
  created () {
    this.$dialog.loading.close();
  },
  mounted () {
    this.getUser();
  },
  computed: {

  },
  methods: {
    //登录
    login () {
      axios.post('/api_login',{
        userName: this.userName,
        userPassword: this.userPassword,
      })
        .then((response)=>{
          let res = response.data.result;
          const userId = res.data.id;
          const access_token = res.data.access_token;
          window.localStorage.setItem('userId', userId);
          window.localStorage.setItem('access_token', access_token);
          this.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            icon: 'success',
          });
          this.show=false;
          this.start=true;
          location.reload();
        })
        .catch((error)=>{
          this.$dialog.toast({
            mes: '账号和密码错误',
            timeout: 1500,
            icon: 'error',
          });
        });
    },

    //退出
    signOut () {
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('access_token');
      location.reload();
    },

    //获取账号资料
    getUser () {
      if (window.localStorage.getItem('userId')) {
        axios.post('/api_login/userData',{
          userId: window.localStorage.getItem('userId'),
          access_token: window.localStorage.getItem('access_token'),
        })
          .then((response)=>{
            let res = response.data.result;
            this.dataUser = res.data;
            this.nickName = this.dataUser.nickName;
            this.sex = this.dataUser.sex;
            this.birthday = this.dataUser.birthday;
            this.autograph = this.dataUser.autograph;
          })
          .catch((error)=>{

          });
      }
    },

    //编辑资料
    changeData () {
      axios.post('/api_login/changeData',{
        userId: window.localStorage.getItem('userId'),
        access_token: window.localStorage.getItem('access_token'),
        nickName: this.nickName,
        sex: this.sex,
        birthday: this.birthday,
        autograph: this.autograph,
      })
        .then((response)=>{
          this.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            icon: 'success',
          });
          this.show3=false;
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

    //修改密码
    changePassword () {
      axios.post('/api_login/changePassword',{
        userId: window.localStorage.getItem('userId'),
        access_token: window.localStorage.getItem('access_token'),
        newPassword: this.newPassword,
      })
        .then((response)=>{
          this.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            icon: 'success',
          });
          this.show4=false;
          window.localStorage.removeItem('userId');
          window.localStorage.removeItem('access_token');
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
