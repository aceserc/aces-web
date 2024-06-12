import { uploadFile } from "@/helpers/upload-file";
import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromCloudinary } from "@/helpers/delete-image";
import { isAdmin } from "@/helpers/is-admin";
import { RESPONSES } from "@/constants/response.constant";

/**
 * Handles the POST request for uploading a file.
 *
 * @body file - The file to upload.
 * @body folder - The folder to upload the file to.
 *
 * @returns data - The uploaded file data.
 */
export const POST = async (req: NextRequest) => {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const formData = await req.formData();
    const file = formData.get("file") as unknown as File;
    const folder = formData.get("folder") as string;

    if (!file)
      return NextResponse.json(
        {
          ...RESPONSES.INSUFFICIENT_REQUEST_BODY,
          message: "Please provide a file to upload",
        },
        {
          status: RESPONSES.INSUFFICIENT_REQUEST_BODY.status,
        }
      );

    if (!folder) {
      return NextResponse.json(
        {
          ...RESPONSES.INSUFFICIENT_REQUEST_BODY,
          message: "Please provide a folder to upload the file",
        },
        {
          status: RESPONSES.INSUFFICIENT_REQUEST_BODY.status,
        }
      );
    }

    const data: any = await uploadFile(file, folder);

    return NextResponse.json(
      {
        ...RESPONSES.SUCCESS,
        message: "File uploaded successfully",
        data,
      },
      {
        status: RESPONSES.SUCCESS.status,
      }
    );
  } catch (error) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

/**
 *  Handles the DELETE request for deleting a file.
 *
 * @body publicIds - The publicIds of the files to delete.
 *
 * @returns message - The response message.
 */
export const DELETE = async (req: NextRequest) => {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const { publicIds } = await req.json();

    if (!publicIds || !Array.isArray(publicIds)) {
      return NextResponse.json(
        {
          ...RESPONSES.INSUFFICIENT_REQUEST_BODY,
          message: "Please provide an array of publicIds to delete",
        },
        {
          status: RESPONSES.INSUFFICIENT_REQUEST_BODY.status,
        }
      );
    }
    try {
      for (const publicId of publicIds) {
        if (!publicId) continue;
        await deleteImageFromCloudinary(publicId);
      }
      return NextResponse.json(
        {
          ...RESPONSES.SUCCESS,
          message: "Files deleted successfully",
        },
        {
          status: RESPONSES.SUCCESS.status,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          ...RESPONSES.SOMETHING_WENT_WRONG,
          message: "Failed to delete files",
        },
        {
          status: RESPONSES.SOMETHING_WENT_WRONG.status,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        ...RESPONSES.INTERNAL_SERVER_ERROR,
        message: "Failed to delete files",
      },
      {
        status: RESPONSES.INTERNAL_SERVER_ERROR.status,
      }
    );
  }
};
