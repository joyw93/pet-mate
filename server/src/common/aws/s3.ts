import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const createPostConfig = {
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(
        null,
        `petmate/community/images/${uuid()}${path.extname(file.originalname)}`,
      );
    },
  }),
};

export const editPostConfig = {
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      console.log('body',req.body)
      // console.log(file);
      cb(
        null,
        `petmate/community/images/${uuid()}${path.extname(file.originalname)}`,
      );
    },
  }),
};
