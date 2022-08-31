const connect = require('../utils/db');
const transformTimeStamp = require('../utils/transformTimeStamp');

/**
 * 公告发布
 * @param {*} param0 
 * @param {*} callback 
 */
const publish = ({ userID, userName, title, content }, callback) => {
    const sqlStatement = 'INSERT INTO `notice`(`time`, `title`, `content`, `publisherID`, `publisherName`) VALUES' + `('${transformTimeStamp(new Date().getTime())}','${title}','${content}','${userID}', '${userName}')`;
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 获取所有公告信息
 * @param {*} callback 
 */
const getAllNotice = callback => {
    const sqlStatement = 'select `publisherName`, `time`, `title`, `content` from `notice`';
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

module.exports = {
    publish,
    getAllNotice
}