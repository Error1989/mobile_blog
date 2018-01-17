var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');

var pool = mysql.createPool({host: '101.37.20.186', user: 'root', password: 'keleme123', database: 'mobile_blog'});

router.post('/', function(req, res, next) {
  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  pool.query(`SELECT id, access_token FROM user WHERE \`userName\` = '${userName}' AND \`userPassword\` = '${userPassword}'`,(err, data)=>{
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

router.post('/register', function(req, res, next) {
  var access_token = req.body.register_nickName + req.body.register_birthday;
  var register_userName = req.body.register_userName;
  var register_userPassword = req.body.register_userPassword;
  var register_nickName = req.body.register_nickName;
  var register_sex = req.body.register_sex;
  var register_birthday = req.body.register_birthday;
  var register_autograph = req.body.register_autograph;
  pool.query(
    `INSERT INTO user (\`access_token\`, \`userName\`, \`userPassword\`, \`nickName\`, \`sex\`, \`birthday\`, \`autograph\`) VALUES 
    ('${access_token}','${register_userName}','${register_userPassword}','${register_nickName}','${register_sex}','${register_birthday}','${register_autograph}')`,
    (err, data)=>{
    if (err) {
      res.json({
        status:'0',
        msg:'注册失败',
      });
    }else {
      res.json({
        status:'1',
        msg:'注册成功',
      });
    }
  });
});

module.exports = router;
