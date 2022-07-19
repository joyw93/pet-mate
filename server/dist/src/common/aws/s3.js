"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProfileConfig = exports.editPostConfig = exports.createPostConfig = void 0;
const uuid_1 = require("uuid");
const dotenv = require("dotenv");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
dotenv.config();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();
exports.createPostConfig = {
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `petmate/community/images/${(0, uuid_1.v4)()}${path.extname(file.originalname)}`);
        },
    }),
};
exports.editPostConfig = {
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `petmate/community/images/${(0, uuid_1.v4)()}${path.extname(file.originalname)}`);
        },
    }),
};
exports.setProfileConfig = {
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `petmate/user/image/${(0, uuid_1.v4)()}${path.extname(file.originalname)}`);
        },
    }),
};
//# sourceMappingURL=s3.js.map