const express = require('express'); //引入express函数
const bodyParser = require('body-parser'); 
const app = express(); //调用express函数得到返回值app
const passport = require('passport');
const logging = require('./middleware/logging') //写入日志文件的中间件


const router = require('./controller/router.controller'); //路由模块
const userRouter = require('./controller/user.controller')
const accountRouter = require('./controller/account.controller');
const noticeRouter = require('./controller/notice.controller');
const bookRouter = require('./controller/book.controller');

//当以/public/开头的时候，去./public/寻找资源
app.use('/public/', express.static('./public/'));

//配置body-paeser
//只要加入这个配置，则在req请求对象上会多出来一个属性：body
//也就是说，可以直接通过req.body来获取表单post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//写入日志文件
app.use(logging);

// 路由模块
app.use(router);
app.use('/user', userRouter);
app.use('/account', accountRouter);
app.use('/notice', noticeRouter);
app.use('/book', bookRouter);

//token验证
app.use(passport.initialize());
require('./utils/verifyToken')(passport);

app.listen(3001, () => {
    console.log('服务已开启，请通过3001端口访问...');
}) //监听node服务