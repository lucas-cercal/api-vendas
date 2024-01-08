import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import upload from '@config/upload';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
