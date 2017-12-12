var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: 'localhost', user: 'root', password: '1q2w3e', database: 'mobile_blog'});

router.post('/', function(req, res, next) {
  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  pool.query(`SELECT * FROM user WHERE \`userName\` = '${userName}' AND \`userPassword\` = '${userPassword}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'账号和密码错误',
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

router.post('/userData', function(req, res, next) {
  var userId = req.body.userId;
  var access_token = req.body.access_token;
  pool.query(`SELECT * FROM user WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'账号和密码错误',
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

router.post('/changeData', function(req, res, next) {
  var userId = req.body.userId;
  var access_token = req.body.access_token;
  var nickName = req.body.nickName;
  var sex = req.body.sex;
  var birthday = req.body.birthday;
  var autograph = req.body.autograph;
  pool.query(`UPDATE user SET \`nickName\` = '${nickName}',\`sex\` = '${sex}',\`birthday\` = '${birthday}',\`autograph\` = '${autograph}' WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'出错了',
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
  var access_token = req.body.access_token;
  var newPassword = req.body.newPassword;
  pool.query(`UPDATE user SET \`userPassword\` = '${newPassword}' WHERE \`id\` = '${userId}'`,(err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'出错了',
      });
    }else {
      res.json({
        status:'1',
        msg:'修改成功,请重新登陆',
      });
    }
  });
});

module.exports = router;
