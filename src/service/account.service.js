const connect = require('../utils/db');
const transformTimeStamp = require('../utils/transformTimeStamp');

/**
 * 根据用户ID完成充值或者消费的操作并机录在recharge表
 * @param {*} userID 
 * @param {*} rechageAmount 
 * @param {*} callback 
 */
const recharge = ( userID, rechageAmount, userName, callback) => {
    const sqlStatement = 'UPDATE `users` SET `balance`=`balance`+' + rechageAmount + ' WHERE `userID`=' + '"' + userID + '"' + '';
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (err, res) => {
        if (err)
            throw err;
        const recordStatement = 'INSERT INTO `recharge`(`userID`, `userName`, `amount`, `time`) VALUES' + `('${userID}', '${userName}', '${rechageAmount}', '${transformTimeStamp(new Date().getTime())}')`;
        console.log('recordStatement', recordStatement);
        connect.query(recordStatement, (err, data) => {
            if (err)
                throw err;
            console.log('data', data);
        })
        callback({
            statusCode: 200,
            msg:'成功充值/消费'
        });
    })
}

/**
 * 获取所有用户余额之和
 * 查询用户总资产
 * @param {*} callback 
 */
const getTotalAssets = callback => {
    const sqlStatement = 'SELECT SUM(`balance`) AS `totalAssets` FROM `users`';
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 获取所有充值/消费数据
 * @param {*} callback 
 */
const getAllRecharge = callback => {
    const sqlStatement = 'SELECT `userID`, `userName`, `amount`, `time` FROM `recharge`';
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 获取用户消费记录
 * @param {} userID 
 * @param {*} callback 
 */
const getSelfRecharge = (userID, callback) => {
    const sqlStatement = 'SELECT `userID`, `userName`, `amount`, `time` FROM `recharge` WHERE `userID`=' + `'${userID}'`;
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 获取用户账户余额
 * @param {} userID 
 * @param {*} callback 
 */
const getSelfAssets = (userID, callback) => {
    const sqlStatement = 'SELECT `userName`,`balance` FROM `users` WHERE `userID`=' + `'${userID}'`;
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

module.exports = {
    recharge,
    getTotalAssets,
    getAllRecharge,
    getSelfRecharge,
    getSelfAssets
}