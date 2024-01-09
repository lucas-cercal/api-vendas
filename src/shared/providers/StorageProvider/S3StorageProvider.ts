import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import upload from '@config/upload';
import mimeTypes from 'mime-types';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);

    const ContentType = mimeTypes.lookup(originalPath);

    if (!ContentType) throw new Error('File not found');

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
