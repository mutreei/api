// passport-jwt完成passport验证函数
// jwt策略和提取jwt
const passportJwt = require('passport-jwt');
const path = require('path');
const configPath = path.join(__dirname, '../../config');
const config = require(configPath);
const JwtStrategy = passportJwt.Strategy; //jwt策略
const ExtractJwt = passportJwt.ExtractJwt; //提取jwt
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
} //配置
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        // jwtPayload就是我们储存在token内部的用户信息对象解密的结果
        // console.log('jwtPayload', jwtPayload);    //{ username: 'username', iat: 1661057703, exp: 1661057763 }
        // user = { username: jwtPayload.username };
        return done(null, jwtPayload);
    }))
}