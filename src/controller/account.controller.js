/**
 * 账户管理
 * 
 */

const accountRouter = require('./router.controller');
const passport = require('passport');
const {
    recharge,
    getTotalAssets,
    getAllRecharge,
    getSelfRecharge,
    getSelfAssets
} = require('../service/account.service')

/**
 * 充值/消费 携带token
 * body :
 *  1. 金额 rechargeAmount
 */
accountRouter.post('/recharge', passport.authenticate('jwt', { session: false }), (req, res) => {
    let userID = req.user.userID;
    let userName = req.user.userName;
    let rechargeAmount = req.body.rechargeAmount;
    recharge( userID, rechargeAmount, userName, excuteRes => {
        res.json(excuteRes);
    })
}) 

/**
 * 用户总资产查询
 * 携带token 
 * 权限： 管理员
 * body:
 */
accountRouter.post('/getTotalAssets', passport.authenticate('jwt', { session: false }), (req, res) => {
    let rights = req.user.rights;
    if (rights === 'administer') {
        getTotalAssets(excuteRes => {
            res.status(200).json(excuteRes);
        });
    }
    else {
        res.status(400).json({
            msg: '无权限'
        })
    }
})

/**
 * 查询所有消费数据
 * 携带token
 * 权限： 管理员
 */
accountRouter.post('/getAllRecharge', passport.authenticate('jwt', { session: false }), (req, res) => {
    const rights = req.user.rights;
    if (rights === 'administer') {
        getAllRecharge(excuteRes => {
            res.status(200).json(excuteRes);
        })
    }
    else {
        res.status(400).json({
            msg: '无权限'
        })
    }
})


/**
 * 获取个人消费数据
 * 携带token
 * 权限：reader
 */
accountRouter.post('/getSelfRecharge', passport.authenticate('jwt', { session: false }), (req, res) => {
    let userID = req.user.userID;
    getSelfRecharge(userID, excuteRes => {
        res.status(200).json(excuteRes);
    })
})

/**
 * 获取个人总资产
 * 携带token
 * 权限：reader
 */
accountRouter.post('/getSelfAssets', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userID = req.user.userID;
    getSelfAssets(userID, excuteRes => {
        res.status(200).json(excuteRes[0]);
    })
})

module.exports = accountRouter;