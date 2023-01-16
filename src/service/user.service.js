const connect = require('../utils/db');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const transformTimeStamp = require('../utils/transformTimeStamp');  //转换时间戳
const jwt = require('jsonwebtoken');
const path = require('path');
const configPath = path.join(__dirname, '../../config');
const config = require(configPath);

/**
 * 
 * @param {*} callback 
 * 查询所有用户信息
 */
const findAllUser = (callback) => {
    const sqlStatement = 'select *from users';
    connect.query(sqlStatement, (err, res) => {
        if (err)
            throw err;
        callback(res);
    })
}

/**
 * 注册用户信息
 * @param {username, password, email} param0 
 * @param {*} callback 
 */
const register = ({ username, password, rights, email }, callback) => {
    if (!(username && password)) {
        return callback({
            msg: '错误，没有用户名或者密码'
        })
    }
    findUserByUsernameOrEmail({ username, email }, findRes => {
        // 查找到结果就不继续注册
        if (findRes[0]){
            console.log(findRes);
            return callback({ statusCode: 400, msg: '用户名或邮箱已被注册' });
        }
        else {
            const sqlStatement = 'INSERT INTO `users`(`userID`, `userName`, `password`, `rights`, `email`, `registerTime`) VALUES' + ` ('${uuidv4()}','${username}','${md5(password)}','${rights}','${email}','${transformTimeStamp(new Date().getTime())}')`;
            console.log('sqlStatement', sqlStatement);
            connect.query(sqlStatement, (err, res) => {
                if (err)
                    throw err;
                callback(res);
            })
        }
    })
}

/**
 * 根据用户名或者邮箱查找用户信息
 * @param {} param0 
 * @param {*} callback 
 */
const findUserByUsernameOrEmail = ({username, email}, callback) => {
    const sqlStatement = 'SELECT `userID` FROM users WHERE `username`=' + '"' + username + '"';
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (err, res) => {
        if (err)
            return err;
        callback(res);
    })
}

/**
 * 用户登录
 * @param {} param0 
 * @param {*} callback 
 */
const login = ({ username, password }, callback) => {
    findUserByUsernameOrEmail({ username }, findRes => {
        if (findRes[0]) {
            const sqlStatement = 'SELECT *FROM `users` WHERE `username`= ' + '"' + username + '"' + ' AND `password`=' + '"' + md5(password) + '"' + '';
            console.log('sqlStatement',sqlStatement)
            connect.query(sqlStatement, (err, res) => {
                if (err) {
                    return err
                }
                if (res[0]) {
                    console.log('res[0]', res[0]);
                    // 登录成功在数据库中存放登录时间
                    const string = 'UPDATE `users` SET `loginTime`=' + `'${transformTimeStamp(new Date().getTime())}'` + 'WHERE `userName`=' + `'${username}'`;
                    connect.query(string, (error, data) => {
                        if (error) {
                            throw error;
                        }
                        console.log('已修改登录时间', data);
                    })
                    //生成token
                    let token = 'Bearer ' + jwt.sign({ userID: res[0].userID, userName: res[0].username, email: res[0].email, rights: res[0].rights }, config.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    callback({ ...res[0], token });
                } else {
                    callback({ statusCode: 400, msg: '用户名或密码错误' });
                }
            })
        }
        else {
            callback({ statusCode: 400, msg: '未找到该用户' });
        }
    })
}

/**
 * 修改用户信息
 * @param {*} user 
 * @param {*} callback 
 */
const modifyUser = (user, callback) => {
    const { userID, userName, password, email, sex, address } = user;
    const sqlStatement = 'UPDATE `users` SET `userName`=' + `'${userName}'` + ',`password`=' + `'${md5(password)}'` + ',`email`='+`'${email}'` + ',`sex`=' + `'${sex}'` + ',`address`=' + `'${address}'` + 'WHERE `userID`=' + `'${userID}'`;
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 注销账户
 * @param {*} userID 
 * @param {*} callback 
 */
const destroyAcount = (userID, callback) => {
    const sqlStatement = 'DELETE FROM `users` WHERE `userID`=' + '"' + userID + '"';
    connect.query(sqlStatement, (err, res) => {
        if (err)
            throw err;
        callback(res);
    })
}

module.exports = {
    findAllUser,
    register,
    findUserByUsernameOrEmail,
    login,
    destroyAcount,
    modifyUser
}