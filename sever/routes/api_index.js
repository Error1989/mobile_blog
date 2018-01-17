var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: '101.37.20.186', user: 'root', password: 'keleme123', database: 'mobile_blog'});

router.post('/', function(req, res, next) {
  var page = req.body.page;
  var pagesize = req.body.pagesize;
  var numbers = (page-1)*pagesize;
  pool.query(`SELECT * FROM article ORDER BY \`APPROVAL\` DESC LIMIT ${numbers},${pagesize}`,(err, data)=>{
    if (err) {
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

module.exports = router;
