// import cloudinary from "@/configs/cloudinary";
import imageKit from "@/configs/imagekit";

/**
 * Uploads an image file to ImageKit.
 * @param file - The image file to upload.
 * @param folder - The folder in which to upload the image.
 * @returns A promise that resolves to the upload result or rejects with an error message.
 */
export const uploadFile = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise(async (resolve, reject) => {
    imageKit.upload(
      {
        file: bytes,
        fileName: file.name,
        folder: folder,
      },
      async (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

export const deleteFiles = async (fileId: string | string[]) => {
  if (fileId instanceof Array) {
    return Promise.all(
      fileId.map(async (id) => {
        return new Promise(async (resolve, reject) => {
          imageKit.deleteFile(id, async (err, result) => {
            if (err) {
              return reject(err.message);
            } else {
              return resolve(result);
            }
          });
        });
      })
    );
  } else {
    return new Promise(async (resolve, reject) => {
      imageKit.deleteFile(fileId, async (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result);
        }
      });
    });
  }
};
