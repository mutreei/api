/**
 * 用户路由模块
 * 这个路由文件内负责：
 * 1. 用户注册
 * 2. 用户登录
 * 3. 修改用户信息(带token)
 * 4. 注销用户(带token)
 * 5. 查看所有用户(带token)
 * 6. 充值(带token)
 */

const userRouter = require('./router.controller');
const passport = require('passport');
const {
    findAllUser,
    register,
    findUserByUsernameOrEmail,
    login,
    destroyAcount,
    modifyUser,
    modifyReader
} = require('../service/user.service');

/**
 * 注册功能
 * method: POST
 * body:　
 *      1. username 用户名
 *      2. password 密码
 *      3. email    邮箱
 *      4. rights   权限
 */
userRouter.post('/register', (req, res) => {
    if (req.body.rights === ('administer' || 'reader')) { 
        register({...req.body}, excuteRes => {
            return res.json(excuteRes);
        })
    }
    else {
        res.json({
            msg: '请填写正确的用户权限信息'
        })
    }
})

/**
 * 查找所有用户信息
 * body: null
 */
userRouter.post('/findAllUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    findAllUser(excuteRes => {
        res.status(200).json(excuteRes);
    })
})

/**
 * 根据用户名或邮箱查找用户信息
 * body: 
 *      1. username
 *      2. email
 */
userRouter.post('/findUserByUsernameOrEmail', passport.authenticate('jwt', { session: false }), (req, res) => {
    findUserByUsernameOrEmail({ ...req.body }, excuteRes => {
        res.status(200).json(excuteRes);
    })
})

/**
 * 登录
 * body: 
 *      1. username
 *      2. password
 */
userRouter.post('/login', (req, res) => {
    login({ ...req.body }, excuteRes => {
        return res.status(200).json(excuteRes);
    })
})

/**
 * 修改账号信息
 * 携带token
 * body:
 *  1. userName
 *  2. password
 *  3. email
 *  4. sex
 *  5. address
 */
userRouter.post('/modifyUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { userName, password, email, sex, address } = req.body;
    console.log('password', password);
    const { userID } = req.user;
    modifyUser({ userID, userName, password, email, sex, address }, excuteRes => {
        res.status(200).json(excuteRes);
    })
})



//注销账号
userRouter.post('/destroyAccount', passport.authenticate('jwt', { session: false }), (req, res) => {
    let userID = req.user.userID;
    destroyAcount(userID, excuteRes => {
        res.status(200).json(excuteRes);
    })
})

//销毁他人账号（管理员）
userRouter.post('/delUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    const rights = req.user.rights;
    if (rights === 'administer') {
        const { userID } = req.body;
        destroyAcount(userID, excuteRes => {
            res.status(200).json(excuteRes);
        })
    }
    else {
        res.status(400).json({
            message:'无权限'
        })
    }
})

//修改用户信息（管理员）
userRouter.post('/modifyReader', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {rights} = req.user;
    if (rights === 'administer') {
        modifyReader(req.body, excuteRes => {
            res.status(200).json(excuteRes);
        })
    }
    else {
        res.status(400).json({
            message:'无权限'
        })
    }
})

module.exports = userRouter;