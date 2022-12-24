import streamifier from "streamifier";
import cloudinary from "../config/cloudinaryConfig.js";
export const uploadImageToCloudinary = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                const { secure_url, public_id } = result;
                console.log(secure_url);
                resolve({ secure_url, public_id });
            }
            else {
                reject(error);
            }
        });
        if (req.file) {
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        }
    });
};
export const deleteImageFromCloudinary = async (publicId = "") => {
    if (publicId) {
        await cloudinary.uploader.destroy(publicId);
    }
};
//# sourceMappingURL=cloudinaryServices.js.map