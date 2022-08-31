/**
 * 日志中间件
 * 将访问日志记录到logger.txt中
 */
const fs = require('fs');
const path = require('path');
const transformTimeStamp = require('../utils/transformTimeStamp');

const loggerTxtPath = path.join(__dirname, '../../logger.txt');
console.log('loggerTxtPath', loggerTxtPath);

module.exports = (req, res, next) => {
    const wm = JSON.stringify({
        time: transformTimeStamp(new Date().getTime()),
        originalUrl: req.originalUrl,
        body: JSON.stringify(req.body)
    })+'\n';
    fs.appendFileSync(loggerTxtPath, wm, (error, data) => {
        if (error) {
            throw error;
        }
        else {
            console.log('data', data);
        }
    })
    next();
}
