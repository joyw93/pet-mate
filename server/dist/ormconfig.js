"use strict";
const dotenv = require("dotenv");
dotenv.config();
const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    logging: true,
    keepConnectionAlive: true,
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map