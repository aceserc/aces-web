import cloudinary from "@/configs/cloudinary";
import imageKit from "@/configs/imagekit";
export const uploadFile = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result);
          }
        }
      )
      .end(bytes);
  });
};

/**
 * Uploads an image file to ImageKit.
 * @param file - The image file to upload.
 * @param folder - The folder in which to upload the image.
 * @returns A promise that resolves to the upload result or rejects with an error message.
 */
export const UploadImagetoImageKit = async (file: File, folder: string) => {
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
//Note: It returns the fileId  file url and thumbnail url along with file id which is required to delete the file from imagekit.
//TODO: Create a database model accordingly  to store the file id and other details.
