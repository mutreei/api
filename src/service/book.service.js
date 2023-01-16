/**
 * 图书功能模块
 * 1. 查看所有图书信息（用户） 
 * 2. 新增图书信息（管理员）    
 * 3. * 修改图书资料信息（管理员）
 * 4. * 图书被借阅/归还/购买 (borrow return buy)  a.修改图书剩余数量信息 b.修改读者账户余额 c.新增账户变动记录 d.新增借阅记录
 * 5. 查询图书信息 （用户/管理员）
 * 6. * 用户借阅/归还/购买记录
 */

const connect = require('../utils/db');
const { v4: uuidv4 } = require('uuid');
const transformTimeStamp = require('../utils/transformTimeStamp');
const {recharge} = require('./account.service')

/**
 * 查看所有图书信息
 * @param {*} callback 
 */
const getAllBook = callback => {
    const sqlStatement = 'select *from books';
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 查看符合条件的图书信息表
 * @param {*} param0 
 * @param {*} callback 
 */
const findBook = ({ bookName, author, publisher }, callback) => {
    console.log('publisher', publisher===null);
    const sqlStatement = 'SELECT *FROM `books` WHERE `bookName`' + `LIKE '%${bookName}%' OR` + '`author`' + `LIKE '%${author}%' OR` + '`publisher`' + `LIKE '%${publisher}%'`;
    console.log('sqlStatement', sqlStatement);
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}

/**
 * 添加图书信息
 * @param {*} param0 
 * @param {*} callback 
 * bookCover = 
 */
const addBook = ({bookName, author, surplus, price, borrowPrice}, callback) => {
    const sqlStatement = 'INSERT INTO `books`(`bookID`, `bookName`, `author`, `price`, `surplus`, `borrowPrice`, `bookCover`) VALUES' + `('${uuidv4()}', '${bookName}', '${author}', '${price}', '${surplus}', '${borrowPrice}' ,'http://127.0.0.1:3001/public/images/${bookName}.jpeg')`;
    connect.query(sqlStatement, (error, data) => {
        if (error) {
            throw error;
        }
        callback(data);
    })
}


/**
 * 借书模块
 * 需要同时修改图书变动信息表、图书信息表、余额变动信息表、用户借书信息表
 * @param {*} param0 
 * @param {*} callback 
 */
const borrowBook = ({ bookID, userID }, callback) => {
    const userSql = 'SELECT `userName`, `userID`, `balance` FROM `users` WHERE `userID`=' + `'${userID}'`;
    connect.query(userSql, (usererr, user) => {
        if (usererr) {
            return callback(usererr);
        }
        const { userID, userName, balance } = user[0];  //拿到用户ID 用户名 余额
        // callback(user[0]);
        const bookSql = 'SELECT `bookName`, `price`, `surplus` FROM `books` WHERE `bookID`=' + `'${bookID}'`;
        connect.query(bookSql, (bookerr, book) => {
            if (bookerr) {
                return callback(bookerr);
            }
            else {
                const { bookName, price, surplus } = book[0];    //拿到书名和价格 
                // callback(book[0]);
                if (balance < price) {
                    return callback({
                        statusCode:403,
                        msg:'借书时需要您的余额大于该书的价格'
                    })
                }
                else if (surplus<=0) {
                    return callback({
                        statusCode: 403,
                        msg:'无剩余图书'
                    })
                }
                else {
                    const borrowSql = 'UPDATE `books` SET `surplus`=`surplus`-1 WHERE `bookID`=' + `'${bookID}'`;
                    const recordSql = 'INSERT INTO `record`(`bookName`, `time`, `readerID`, `readerName`, `type`) VALUES' + `('${bookName}','${transformTimeStamp(new Date().getTime())}','${userID}','${userName}','borrow')`;
                    connect.query(borrowSql, (borrowErr, borrowData) => {
                        connect.query(recordSql, (recordErr, recordData) => {
                            if (borrowErr || recordErr) {
                                return callback({ ...borrowErr, ...recordErr });
                            }
                            else {
                                const bSql = 'INSERT INTO `borrow` VALUES' + `('${userID}', '${userName}', '${bookID}', '${bookName}')`;
                                connect.query(bSql, (berr, bdata) => {
                                    if (berr) {
                                        return callback(berr);
                                    }
                                    else {
                                        callback({
                                            statusCode: 200,
                                            msg: '借书成功'
                                        })
                                    }
                                })
                            }
                        })
                    })
                }
            }
        })
    })
}


/**
 * 还书模块
 * 需要同时修改图书变动信息表、图书信息表、余额变动信息表、用户借书信息表
 * 查看userID下对应的borrow表，看该用户借了多少书，如果借的书里面没有该数返回错误
 * 图书信息表： bookID下surplus+1
 * 余额变动信息表：记录该账户余额-时间(天)*每日借书价格 如果该价格大于书的价值，就只减去书的价值
 * 用户借书信息表：删除该书的借书记录
 * 图书变动信息表：添加一条还书信息
 * 
 */
const returnBook = ({ userID, bookID }, callback) => {
    const borrow_sql = 'SELECT *FROM borrow WHERE `userID`=' + `'${userID}' AND bookID='${bookID}'`;
    console.log('borrow_sql', borrow_sql);
    connect.query(borrow_sql, (borrowErr, borrowData) => {
        if (borrowErr) {
            return callback(borrowErr)
        }
        else if (borrowData.length === 0) {
            return callback({
                statusCode: 403,
                msg:'无数据'
            })
        }
        else {
            console.log('borrowData', borrowData);
            const { bookName, username } = borrowData[0];
            const record_sql = 'SELECT *FROM record WHERE `bookName`=' + `'${bookName}' AND` + '`readerID`=' + `'${userID}' AND` + '`type`="borrow"';  //查询借阅记录数据
            const books_sql = 'SELECT *FROM books WHERE `bookid`='+`'${bookID}'`;
            console.log('record_sql', record_sql);
            connect.query(books_sql, (booksError, booksData) => {
                connect.query(record_sql, (reError, reData) => {
                    if (reError||booksError) { return callback({ ...reError, ...booksError }) }
                    const { time: borrowTime } = reData[reData.length - 1];
                    const { price, borrowPrice } = booksData[0];
                    let shijian = new Date().getTime() - borrowTime;
                    console.log('borrowTime', borrowTime);
                    const day = Math.ceil(shijian / (24 * 60 * 60 * 1000));//转天数
                    let consume = day * borrowPrice > price ? price : day * borrowPrice;//花费
                    console.log('consume', consume);
                    
                    //更新数据库
                    const update_books = 'UPDATE `books` SET `surplus` = `surplus`+1 WHERE `bookid`=' + `'${bookID}'`;
                    const update_borrow = 'DELETE FROM `borrow` WHERE `userID`=' + `'${userID}'` + 'AND `bookid`=' + `'${bookID}'`;
                    const update_record = 'INSERT INTO `record` VALUES' + ` ('${bookName}', '${transformTimeStamp(new Date().getTime())}', '${userID}', '${username}', 'return')`;
                    // const update_user = 'UPDATE `users` SET `balance` = `balance`-' + consume + ' WHERE `userID`=' + `'${userID}'`;
                    const update_sql = `${update_books};${update_borrow};${update_record};`;
                    connect.query(update_sql, (error, data) => {
                        if (error) {
                          return callback(error)
                        }
                        else {
                            consume = 0 - consume;
                            recharge(userID, consume, username, excuteRes => {
                                callback({
                                    statusCode: 200,
                                    msg: '成功还书',
                                    day
                                })
                            })
                            
                        }
                    })
                })
            })
        }
    })
}

/**
 * 买书模块
 * books.surplus-1
 * user.balance-books.price
 * recharge添加信息
 * UPDATE `books` SET `surplus` = `surplus` - 1 WHERE `bookid` = 'uuid02'
 * 
 */
const buyBook = ({ userID, bookID, userName }, callback) => {
    const priceSql = `SELECT \`price\` FROM books WHERE \`bookid\` = '${bookID}'`
    connect.query(priceSql, (err, data) => {
        if (err) { throw err }
        const price = data[0].price;
        const bookSurplusSql = `UPDATE \`books\` SET \`surplus\` = \`surplus\` - 1 WHERE \`bookid\` = '${bookID}'`;
        const spendBalanceSql = `UPDATE \`users\` SET \`balance\` = \`balance\` - ${price} WHERE \`userid\` = '${userID}'`
        const addRechargeSql = `INSERT INTO \`recharge\` VALUES ('${userID}', '${userName}', ${price}*(-1), NOW())`
        connect.query(`${bookSurplusSql};${spendBalanceSql};${addRechargeSql}`, (err, data) => {
            if (err) { throw err }
            callback({
                statusCode: 200,
                message: '操作成功',
                ...data
            })
        })
    })
}

/**
 * 查看个人已借阅书籍
 */
const findBorrow = (userID, callback) => {
    const findSql = `SELECT *FROM \`borrow\` WHERE \`userid\` = '${userID}'`;
    connect.query(findSql, (err, data) => {
        if (err) { throw err }
        callback(data);
    })
}

module.exports = {
    getAllBook,
    addBook,
    borrowBook,
    findBook,
    returnBook,
    buyBook,
    findBorrow
}