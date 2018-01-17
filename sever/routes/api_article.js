/**
 * Created by Acer on 2017-12-06.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: '101.37.20.186', user: 'root', password: 'keleme123', database: 'mobile_blog'});

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

router.post('/comment',function (req,res,next) {
  var user_id = req.body.userId;
  var article_id = req.body.article_id;
  var page = req.body.page;
  var pagesize = req.body.pagesize;
  var numbers = (page-1)*pagesize;
  pool.query(`SELECT * FROM comment WHERE \`article_id\`='${article_id}' LIMIT ${numbers},${pagesize}`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      })
    }else {
      res.json({
        status:'1',
        msg:'成功',
        result:{
          count:data.length,
          data:data,
        }
      })
    }
  })
});

router.post('/submitComment',function (req,res,next) {
  var user_id = req.body.userId;
  var article_id = req.body.article_id;
  var nickName = req.body.nickName;
  var portrait = req.body.portrait;
  var post_time = req.body.post_time;
  var content = req.body.content;
  pool.query(`INSERT INTO comment (\`article_id\`,\`user_id\`, \`nickName\`, \`portrait\`, \`post_time\`, \`content\`) VALUES 
  ('${article_id}','${user_id}','${nickName}','${portrait}','${post_time}','${content}')`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'出错了',
      })
    }else {
      res.json({
        status:'1',
        msg:'成功',
      })
    }
  })
});

router.post('/changeComment',function (req,res,next) {
  var id = req.body.id;
  var nickName = req.body.nickName;
  var portrait = req.body.portrait;
  var post_time = req.body.post_time;
  var content = req.body.content;
  pool.query(`UPDATE comment SET \`nickName\`='${nickName}', \`portrait\`='${portrait}', \`post_time\`='${post_time}', \`content\`='${content}' WHERE \`id\`='${id}'`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'编辑失败',
      })
    }else {
      res.json({
        status:'1',
        msg:'编辑成功',
      })
    }
  })
});

router.post('/deleteComment',function (req,res,next) {
  var id = req.body.id;
  pool.query(`DELETE FROM comment WHERE \`id\`='${id}'`,(error,data)=>{
    if(error) {
      res.json({
        status:'0',
        msg:'删除失败',
      })
    }else {
      res.json({
        status:'1',
        msg:'删除成功',
      })
    }
  })
});

module.exports = router;
