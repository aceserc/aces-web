import cloudinary from "@/configs/cloudinary";

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
