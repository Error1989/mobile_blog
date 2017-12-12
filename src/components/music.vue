<template>
    <div id="music" style="height: 100%;">
      <yd-layout>
        <!--头部导航-->
        <yd-navbar slot="navbar" title="音乐" bgcolor="#09bb07" color="#fff" style="height: .9rem">

        </yd-navbar>

        <!--搜索框-->
        <yd-search v-model="searchData" :on-submit="search"></yd-search>

        <!--主体内容-->
        <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
          <yd-list theme="4">

          </yd-list>

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
      </yd-layout>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: 'music',
      data () {
        return {
          searchData: '',
          searchData_key:false,
          loading: false,
          busy: true,
          page: 1,
          pagesize: 8,
          dataList:[],
        }
      },
      watch: {
        searchData: function () {
          this.dataList=[];
          this.page=1;
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
          axios.post('/api_music',{
            page: this.page,
            pagesize: this.pagesize,
          })
            .then((response)=>{
              let res = response.data.result;
              this.loading = false;
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

        //搜索方法
        search (flag) {
          this.loading = true;
          this.searchData_key = true;
          axios.post('/api_music',{
            page: this.page,
            pagesize: this.pagesize,
            searchData:this.searchData,
          })
            .then((response)=>{
              let res = response.data.result;
              this.loading = false;
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
          if (!this.searchData_key) {
            this.busy=true;
            setTimeout(() => {
              this.page++;
              this.getList(true);
            }, 500);
          }else {
            this.busy=true;
            setTimeout(() => {
              this.page++;
              this.search(true);
            }, 500);
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
