/**
 * Created by Acer on 2017-12-06.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: 'localhost', user: 'root', password: '1q2w3e', database: 'mobile_blog'});

router.use('/', function(req, res, next) {
  if(req.body.article_id){
    //查询数据库中article的数据
    pool.query(`SELECT * FROM article WHERE ID=${req.body.article_id}`,(err,data)=>{
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

module.exports = router;
