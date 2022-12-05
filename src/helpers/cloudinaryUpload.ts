import { Request } from "express";
import streamifier from "streamifier";

import cloudinary from "../config/cloudinaryConfig";

export const uploadImageToCloudinary = (req: Request): Promise<string> => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result.url);
      } else {
        reject(error);
      }
    });

    if (req.file) {
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    }
  });
};
