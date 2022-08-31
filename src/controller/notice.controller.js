const noticeRouter = require('./router.controller');
const passport = require('passport');

const {
    publish,
    getAllNotice,
} = require('../service/notice.service');

/**
 * 发布公告(administer)
 * token：是
 * body:
 *  1. title 公告标题
 *  2. content 公告内容
 * req.user:
 *  1. userID
 *  2. rights
 */
noticeRouter.post('/publish', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { userID, rights, userName } = req.user;
    const { title, content } = req.body;
    if (rights !== 'administer') {
        return res.status(400).json({
            msg: '无权限'
        })
    }
    else {
        publish({ userID, userName, title, content }, excuteRes => {
            res.status(200).json(excuteRes);
        })
    }
})

/**
 * 获取所有公告信息
 */
noticeRouter.post('/getAllNotice', passport.authenticate('jwt', { session: false }), (req, res) => {
    getAllNotice(excuteRes => {
        res.status(200).json(excuteRes);
    })
})


module.exports = noticeRouter;