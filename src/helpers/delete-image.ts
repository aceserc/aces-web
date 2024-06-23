import cloudinary from "@/configs/cloudinary";
import imageKit from "@/configs/imagekit";

export const deleteImageFromCloudinary = async (publicId: string) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader.destroy(publicId, async (err, result) => {
      if (err) {
        return reject(err.message);
      } else {
        return resolve(result);
      }
    });
  });
};

export const deleteImageFromImageKit = async (fileId: string) => {
  return new Promise(async (resolve, reject) => {
    imageKit.deleteFile(fileId, async (err, result) => {
      if (err) {
        return reject(err.message);
      } else {
        return resolve(result);
      }
    });
  });
};
