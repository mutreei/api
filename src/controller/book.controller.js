const bookRouter = require('./router.controller');
const passport = require('passport');
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');
const {
    getAllBook,
    addBook,
    borrowBook,
    findBook,
    returnBook,
    buyBook,
    findBorrow
} = require('../service/book.service');

/**
 * 查看所有图书信息
 */
bookRouter.post('/getAllBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    getAllBook(excuteRes => {
        res.status(200).json(excuteRes);
    })
})

/**
 * 查看符合条件的图书信息
 * 条件：
 *  1. 书名
 *  2. 作者
 *  3. 出版社
 */
bookRouter.post('/findBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    findBook(req.body, excuteRes => {
        res.status(200).json(excuteRes);
    })
})


/**
 * 上架图书
 * 权限：管理员
 * body:
 *  1. bookName:书名
 *  2. surplus: 书籍数量
 *  3. price:   购买价格
 *  4. borrowPrice: 借书价格/天 
 *  5. bookCover:   图书封面（图片文件）
 */
bookRouter.post('/addBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const rights = req.user.rights;
    if (rights !== 'administer') {
        return res.status(400).json({
            statusCode: 400,
            msg: '无权限'
        })
    }
    else {
        //将请求的图片上传到/public/images下
        const uploadDir = path.join(__dirname, '../../public/images');
        const form = new multiparty.Form({
            encoding: 'utf-8',
            uploadDir
        });
        form.parse(req, (error, fields, files) => {
            if (error) {
                res.status(401).json({
                    msg:'文件上传失败'
                })
                throw error;
            }
            else {
                const oldPath = files.bookCover[0].path;  //这里的bookCover是由于发起请求时form-data的key是bookCover
                const newPath = uploadDir + '/' + fields.bookName[0] + '.jpeg';
                fs.renameSync(oldPath, newPath);
                
                let book = {}
                for (let key in fields) {
                    book[key] = fields[key][0];
                }
                addBook(book, excuteRes => {
                    res.status(200).json(excuteRes);
                })
            }
        })
    }
})

/**
 * 用户借阅图书
 * 权限：用户
 * body:
 *  1. bookID
 * jwt:
 *  1. userID
 */
bookRouter.post('/borrowBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { bookID } = req.body;
    const { userID } = req.user;
    borrowBook({ bookID, userID }, excuteRes => {
        res.json(excuteRes);
    })
})

//用户归还图书
/**
 * 权限：用户
 * 参数：
 * jwt:
 *  1. userID
 * body:
 *  1. bookID
 * 
 */
bookRouter.post('/returnBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { userID } = req.user;
    const { bookID } = req.body;
    returnBook({ userID, bookID }, excuteRes => {
        res.send(excuteRes);
    })
})

/**
 * 买书
 * token:userid
 * params: bookid
 */
bookRouter.post('/buyBook', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { userID, userName } = req.user;
    const { bookID } = req.body;
    buyBook({ userID, bookID, userName }, data => {
        res.send(data);
    });
})

/**
 * 查看借阅书籍
 * token:userid
 */
bookRouter.post('/findBorrow', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { userID } = req.user;
    findBorrow(userID, data => {
        res.send(data);
    })
})

module.exports = bookRouter;
