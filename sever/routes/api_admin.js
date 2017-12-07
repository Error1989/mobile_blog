/**
 * Created by Acer on 2017-12-06.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({host: 'localhost', user: 'root', password: '1q2w3e', database: 'mobile_blog'});
/* GET home page. */
router.use('/', function(req, res, next) {

});

module.exports = router;
