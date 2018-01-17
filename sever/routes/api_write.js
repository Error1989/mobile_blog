/**
 * Created by Acer on 2017-12-25.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: '101.37.20.186', user: 'root', password: 'keleme123', database: 'mobile_blog'});

router.post('/',function (req,res,next) {
  var partition = req.body.partition;
  var authorId = req.body.userId;
  var author = req.body.nickName;
  var portrait = req.body.portrait;
  var title = req.body.title;
  var post_time = req.body.post_time;
  var content = req.body.content;
  pool.query(`INSERT INTO article (\`partition\`, \`authorId\`, \`author\`, \`portrait\`, \`title\`, \`post_time\`, \`content\`) VALUES 
    ('${partition}','${authorId}','${author}','${portrait}','${title}','${post_time}','${content}')`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'提交失败',
      })
    }else {
      res.json({
        status:'1',
        msg:'提交成功',
      })
    }
  })
});

router.post('/edirtArticle',function (req,res,next) {
  var id = req.body.id;
  var partition = req.body.partition;
  var author = req.body.nickName;
  var portrait = req.body.portrait;
  var title = req.body.title;
  var post_time = req.body.post_time;
  var content = req.body.content;
  pool.query(`UPDATE article SET \`partition\`='${partition}', \`author\`='${author}', \`portrait\`='${portrait}', \`title\`='${title}', \`post_time\`='${post_time}', \`content\`='${content}' WHERE \`id\` = '${id}'`,
    (error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'修改失败',
      })
    }else {
      res.json({
        status:'1',
        msg:'修改成功',
      })
    }
  })
});

router.post('/author',function (req,res,next) {
  var user_id = req.body.userId;
  pool.query(`SELECT nickName,portrait FROM user WHERE \`id\`='${user_id}'`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      })
    }else {
      res.json({
        status:'1',
        msg:'成功',
        result: {
          data: data[0],
        },
      })
    }
  })
});

router.post('/getArticle', function(req, res, next) {
  var id = req.body.id;
  pool.query(`SELECT * FROM article WHERE id=${id}`,(error,data)=>{
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
          data:data[0],
        }
      });
    }
  });
});

module.exports = router;
