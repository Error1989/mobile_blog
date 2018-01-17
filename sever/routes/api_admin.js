/**
 * Created by Acer on 2017-12-06.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');

var pool = mysql.createPool({host: '101.37.20.186', user: 'root', password: 'keleme123', database: 'mobile_blog'});

router.post('/', function(req, res, next) {
  var userId = req.body.userId;
  pool.query(`SELECT nickName, sex, birthday, autograph, portrait FROM user WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'账号或密码错误',
      });
    }else {
      res.json({
        status:'1',
        msg:'登录成功',
        result:{
          data:data[0],
        }
      });
    }
  });
});

router.post('/changePortrait', function(req, res, next) {
  var userId = req.body.userId;
  var portrait = req.files[0].destination+'/'+req.files[0].filename;
  pool.query(`UPDATE user SET \`portrait\` = '${portrait}' WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'变更失败',
      });
    }else {
      res.json({
        status:'1',
        msg:'变更成功，请刷新页面',
      });
    }
  });
});

router.post('/changeData', function(req, res, next) {
  var userId = req.body.userId;
  var nickName = req.body.nickName;
  var sex = req.body.sex;
  var birthday = req.body.birthday;
  var autograph = req.body.autograph;
  pool.query(`UPDATE user SET \`nickName\` = '${nickName}',\`sex\` = '${sex}',\`birthday\` = '${birthday}',\`autograph\` = '${autograph}' WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'修改失败',
      });
    }else {
      res.json({
        status:'1',
        msg:'修改成功',
      });
    }
  });
});

router.post('/changePassword', function(req, res, next) {
  var userId = req.body.userId;
  var newPassword = req.body.newPassword;
  pool.query(`UPDATE user SET \`userPassword\` = '${newPassword}' WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'修改失败',
      });
    }else {
      res.json({
        status:'1',
        msg:'修改成功,请重新登陆',
      });
    }
  });
});

router.post('/collection', function(req, res, next) {
  var page = req.body.page;
  var pagesize = req.body.pagesize;
  var numbers = (page-1)*pagesize;
  var user_id = req.body.userId;
  pool.query(`SELECT * FROM collection JOIN article ON collection.article_id=article.id WHERE collection.user_id=${user_id} LIMIT ${numbers},${pagesize}`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'成功',
        result:{
          count:data.length,
          data:data,
        }
      });
    }
  });
});

router.post('/follow', function(req, res, next) {
  var page = req.body.page;
  var pagesize = req.body.pagesize;
  var numbers = (page-1)*pagesize;
  var user_id = req.body.userId;
  pool.query(`SELECT * FROM follow JOIN article ON follow.author_id=article.authorId WHERE follow.user_id=${user_id} LIMIT ${numbers},${pagesize}`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'成功',
        result:{
          count:data.length,
          data:data,
        }
      });
    }
  });
});

router.post('/write', function(req, res, next) {
  var page = req.body.page;
  var pagesize = req.body.pagesize;
  var numbers = (page-1)*pagesize;
  var user_id = req.body.userId;
  pool.query(`SELECT * FROM article WHERE authorId=${user_id} LIMIT ${numbers},${pagesize}`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'成功',
        result:{
          count:data.length,
          data:data,
        }
      });
    }
  });
});

router.post('/deleteArticle', function(req, res, next) {
  var id = req.body.id;
  pool.query(`DELETE FROM article WHERE \`id\`='${id}'`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'删除成功',
      });
    }
  });
});

router.post('/deletelFollow', function(req, res, next) {
  var user_id = req.body.userId;
  var author_id = req.body.author_id;
  pool.query(`DELETE FROM follow WHERE \`author_id\`='${author_id}' AND \`user_id\`='${user_id}'`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'取关成功',
      });
    }
  });
});

module.exports = router;
