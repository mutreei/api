require('dotenv').config('./env');

const {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    JWT_SECRET
} = process.env;

module.exports = {
    // 数据库配置信息
    db: {
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        user: DB_USER,
        password: DB_PASSWORD
    },
    JWT_SECRET: JWT_SECRET
}