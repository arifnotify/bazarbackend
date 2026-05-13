import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import type { Express } from 'express';

import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Single Image Upload
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },

      fileFilter: (req, file, cb) => {
        const allowedTypes = /\/(jpg|jpeg|png)$/i;

        if (!allowedTypes.test(file.mimetype)) {
          return cb(
            new BadRequestException('Only JPG, JPEG, PNG images are allowed'),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    return this.uploadService.uploadImage(file);
  }

  // Multiple Images Upload
  @Post('images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },

      fileFilter: (req, file, cb) => {
        const allowedTypes = /\/(jpg|jpeg|png)$/i;

        if (!allowedTypes.test(file.mimetype)) {
          return cb(
            new BadRequestException('Only JPG, JPEG, PNG images are allowed'),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  async uploadMultiple(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one image is required');
    }

    return Promise.all(
      files.map((file) => this.uploadService.uploadImage(file)),
    );
  }
}
