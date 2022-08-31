const mysql = require('mysql');
const path = require('path');
const configPath = path.join(__dirname, '../../config');
const dbConfig = require(configPath).db;
/**
 * 开放数据库连接
 */
module.exports = mysql.createConnection({...dbConfig, multipleStatements: true}); //允许同时执行多条sql