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
            <div style="margin-top: 2px;">
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left">用户头像</span>
                  <span slot="right"><img slot="img" :src=dataUser.portrait style="max-width: 58px;max-height: 58px;"></span>
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
                  <yd-cell-item arrow @click.native="show5 = true">
                    <span slot="left">变更头像</span>
                    <span slot="right"></span>
                  </yd-cell-item>
                </div>
              </yd-cell-group>
            </div>
            <yd-flexbox>
              <yd-flexbox-item>
                <div v-if="!show2">
                  <yd-cell-group>
                    <yd-button size="large" type="primary" class="button" @click.native="show = true">登录</yd-button>
                  </yd-cell-group>
                </div>

                <div v-else="show2">
                  <yd-cell-group>
                    <yd-button size="large" type="danger" class="button" @click.native="signOut">退出登录</yd-button>
                  </yd-cell-group>
                </div>
              </yd-flexbox-item>
              <yd-flexbox-item>
                <div>
                  <yd-cell-group>
                    <yd-button size="large" type="hollow" class="button" @click.native="show6 = true">注册</yd-button>
                  </yd-cell-group>
                </div>
              </yd-flexbox-item>
            </yd-flexbox>
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
            <yd-input slot="right" min="2" max="8" required v-model="nickName" placeholder="请输入新的昵称"></yd-input>
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

      <yd-popup v-model="show5" position="center" width="90%">
        <el-upload
          class="avatar-uploader"
          action="/api_admin/changePortrait"
          :show-file-list="true"
          :auto-upload="true"
          list-type="picture"
          :limit="1"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="form">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </yd-popup>

      <yd-popup v-model="show6" position="center" width="90%">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">账号：</span>
            <yd-input slot="right" min="2" max="16" v-model="register_userName" required placeholder="请输入账号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">密码：</span>
            <yd-input slot="right" min="6" max="16" v-model="register_userPassword" required type="password" placeholder="请输入密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">昵称：</span>
            <yd-input slot="right" min="2" max="8" v-model="register_nickName" required placeholder="请输入昵称"></yd-input>
          </yd-cell-item>

          <yd-cell-item arrow type="label">
            <span slot="left">性别：</span>
            <select slot="right" v-model="register_sex">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </yd-cell-item>

          <yd-cell-item arrow>
            <span slot="left">生日：</span>
            <yd-datetime slot="right" type="date" v-model="register_birthday" start-date="1900-01-01" end-date="2100-01-01"></yd-datetime>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">个性签名：</span>
            <yd-input slot="right" max="32" v-model="register_autograph" placeholder="请输入个性签名（可不填）"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <div v-if="register_userName&&register_userPassword&&register_sex&&register_birthday">
          <yd-button size="large" type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="register">提交</yd-button>
        </div>

        <div v-else>
          <yd-button size="large" disabled type="primary" style="bottom: 10px;margin:0 auto;width: 80%;" @click.native="register">提交</yd-button>
        </div>

      </yd-popup>

      <yd-popup v-model="show" position="center" width="90%">
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">账号：</span>
            <yd-input slot="right" required v-model="userName" min="2" max="16" placeholder="请输入账号"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">密码：</span>
            <yd-input slot="right" min="6" max="16" required type="password" v-model="userPassword" placeholder="请输入密码"></yd-input>
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
          <yd-icon name="order" slot="icon"></yd-icon>
          <yd-badge slot="badge" type="danger">2</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="搜索" link="/search">
          <yd-icon name="search" slot="icon"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="发布文章" link="/write">
          <yd-icon name="feedback" slot="icon"></yd-icon>
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
        show5: false,
        show6: false,
        start: false,
        imageUrl: '',
        form: {userId: window.localStorage.getItem('userId'), access_token: window.localStorage.getItem('access_token')},
        register_userName: '',
        register_userPassword: '',
        register_nickName: '',
        register_sex: '',
        register_birthday: '1980-01-01',
        register_autograph: '',
        userName: '',
        userPassword: '',
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        nickName: '',
        sex: '',
        birthday: '',
        autograph: '',
        portrait: '',
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
    //注册
    register () {
      axios.post('/api_login/register',{
        register_userName: this.register_userName,
        register_userPassword: this.register_userPassword,
        register_nickName: this.register_nickName,
        register_sex: this.register_sex,
        register_birthday: this.register_birthday,
        register_autograph: this.register_autograph,
      })
        .then((response)=>{
          let res = response.data.result;
          this.$dialog.toast({
            mes: response.data.msg,
            timeout: 1500,
            icon: 'success',
          });
          this.show6=false;
          this.register_userName = '';
          this.register_userPassword = '';
          this.register_nickName = '';
          this.register_sex = '';
          this.register_birthday = '1980-01-01';
          this.register_autograph = '';
        })
        .catch((error)=>{
          this.$dialog.toast({
            mes: '注册失败',
            timeout: 1500,
            icon: 'error',
          });
        });
    },

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
            mes: '账号或密码错误',
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
        axios.post('/api_admin',{
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
            this.portrait = this.dataUser.portrait;
          })
          .catch((error)=>{
            this.$dialog.toast({
              mes: '出错了',
              timeout: 1500,
              icon: 'error',
            });
          });
      }
    },

    //编辑资料
    changeData () {
      axios.post('/api_admin/changeData',{
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
            mes: '修改失败',
            timeout: 1500,
            icon: 'error',
          });
        });
    },

    //修改密码
    changePassword () {
      axios.post('/api_admin/changePassword',{
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
            mes: '修改失败',
            timeout: 1500,
            icon: 'error',
          });
        });
    },

    //头像上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.status==1) {
        this.$dialog.toast({
          mes: res.msg,
          timeout: 1500,
          icon: 'success',
        });
      }else {
        this.$dialog.toast({
          mes: res.msg,
          timeout: 1500,
          icon: 'error',
        });
      }
//      this.show5=false;
//      location.reload();
    },

    //头像上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
  .avatar-uploader ,el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    left: 50%;
    margin-top: 40px;
    margin-bottom: 40px;

  }
  .avatar-uploader ,el-upload:hover {
    border-color: #09bb07;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .button {
    margin-top: 6.7%;
  }
</style>
