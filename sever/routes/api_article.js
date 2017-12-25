/**
 * Created by Acer on 2017-12-06.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: 'localhost', user: 'root', password: '1q2w3e', database: 'mobile_blog'});

router.post('/', function(req, res, next) {
  if(req.body.article_id){
    //查询数据库中article的数据
    pool.query(`SELECT * FROM article WHERE id=${req.body.article_id}`,(err,data)=>{
      if(err){
        res.json({
          status:'0',
          msg:'出错了',
        });
      }else{
        if(data.length==0){
          res.json({
            status:'-1',
            msg:'您请求的文章不存在',
          });
        }else{
          let articleData=data[0];
          articleData.content=articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
          res.json({
            status:'1',
            msg:'成功',
            result:{
              data:articleData,
            },
          });
        }
      }
    });
  }else{
    res.json({
      status:'-2',
      msg:'您请求的文章找不到',
    });
  }
});

router.post('/approval',function (req, res, next) {
  var user_id = req.body.userId;
  var article_id = req.body.article_id;
  pool.query(`SELECT * FROM approval WHERE \`article_id\`='${article_id}' AND \`user_id\`='${user_id}'`,(error0,data0)=>{
    if(!data0[0]) {
      pool.query(`INSERT INTO approval (\`user_id\`, \`article_id\`) VALUES ('${user_id}','${article_id}')`,(error1,data1)=>{
        if(error1) {
          res.json({
            status:'0',
            msg:'出错了',
          })
        }else {
          pool.query(`UPDATE article SET \`approval\`=\`approval\`+1 WHERE \`id\`='${article_id}'`,(error2,data2)=>{
            if(error2) {
              res.json({
                status:'-1',
                msg:'出错了',
              })
            }else {
              res.json({
                status:'1',
                msg:'赞同成功',
              })
            }
          })
        }
      });
    }else {
      pool.query(`DELETE FROM approval WHERE \`article_id\`='${article_id}' AND \`user_id\`='${user_id}'`,(error3,data3)=>{
        if(error3) {
          res.json({
            status:'-2',
            msg:'出错了',
          })
        }else {
          pool.query(`UPDATE article SET \`approval\`=\`approval\`-1 WHERE \`id\`='${article_id}'`,(error4,data4)=>{
            if(error4) {
              res.json({
                status:'-3',
                msg:'出错了',
              })
            }else {
              res.json({
                status:'2',
                msg:'赞同已取消',
              })
            }
          })
        }
      })
    }
  });
});

router.post('/checkApproval',function (req,res,next) {
  var user_id = req.body.userId;
  var article_id = req.body.article_id;
  pool.query(`SELECT * FROM approval WHERE \`article_id\`='${article_id}' AND \`user_id\`='${user_id}'`,(error,data)=>{
    if(!data[0]) {
      res.json({
        status:'0',
        msg:'未赞同',
      })
    }else {
      res.json({
        status:'1',
        msg:'已赞同',
      })
    }
  })
});

router.post('/collection',function (req,res,next) {
  var user_id = req.body.userId;
  var article_id = req.body.article_id;
  pool.query(`SELECT * FROM collection WHERE \`article_id\`='${article_id}' AND \`user_id\`='${user_id}'`,(error0,data0)=>{
    if(!data0[0]) {
      pool.query(`INSERT INTO collection (\`user_id\`, \`article_id\`) VALUES ('${user_id}','${article_id}')`,(error1,data1)=>{
        if(error1) {
          res.json({
            status:'0',
            msg:'出错了',
          })
        }else {
          res.json({
            status:'1',
            msg:'收藏成功',
          })
        }
      });
    }else {
      pool.query(`DELETE FROM collection WHERE \`article_id\`='${article_id}' AND \`user_id\`='${user_id}'`,(error2,data2)=>{
        if(error2) {
          res.json({
            status:'-1',
            msg:'出错了',
          })
        }else {
          res.json({
            status:'2',
            msg:'收藏已取消',
          })
        }
      })
    }
  });
});

router.post('/checkCollection',function (req,res,next) {
  var user_id = req.body.userId;
  var article_id = req.body.article_id;
  pool.query(`SELECT * FROM collection WHERE \`article_id\`='${article_id}' AND \`user_id\`='${user_id}'`,(error,data)=>{
    if(!data[0]) {
      res.json({
        status:'0',
        msg:'未收藏',
      })
    }else {
      res.json({
        status:'1',
        msg:'已收藏',
      })
    }
  })
});

router.post('/follow',function (req,res,next) {
  var user_id = req.body.userId;
  var author_id = req.body.authorId;
  pool.query(`SELECT * FROM follow WHERE \`author_id\`='${author_id}' AND \`user_id\`='${user_id}'`,(error0,data0)=>{
    if(!data0[0]) {
      pool.query(`INSERT INTO follow (\`user_id\`, \`author_id\`) VALUES ('${user_id}','${author_id}')`,(error1,data1)=>{
        if(error1) {
          res.json({
            status:'0',
            msg:'出错了',
          })
        }else {
          res.json({
            status:'1',
            msg:'关注成功',
          })
        }
      });
    }else {
      pool.query(`DELETE FROM follow WHERE \`author_id\`='${author_id}' AND \`user_id\`='${user_id}'`,(error2,data2)=>{
        if(error2) {
          res.json({
            status:'-1',
            msg:'出错了',
          })
        }else {
          res.json({
            status:'2',
            msg:'关注已取消',
          })
        }
      })
    }
  });
});

router.post('/checkFollow',function (req,res,next) {
  var user_id = req.body.userId;
  var author_id = req.body.authorId;
  pool.query(`SELECT * FROM follow WHERE \`author_id\`='${author_id}' AND \`user_id\`='${user_id}'`,(error,data)=>{
    if(!data[0]) {
      res.json({
        status:'0',
        msg:'未关注',
      })
    }else {
      res.json({
        status:'1',
        msg:'已关注',
      })
    }
  })
});

module.exports = router;
