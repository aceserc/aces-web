import { uploadFile } from "@/helpers/upload-file";
import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromCloudinary } from "@/helpers/delete-image";
import { isAdmin } from "@/helpers/is-admin";
import { RESPONSES } from "@/constants/response.constant";

// uploads file to cloudinary
export const POST = async (req: NextRequest) => {
  try {
    // Check if the user is an admin
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
        ...RESPONSES.CREATED,
        message: "File uploaded successfully!",
        data,
      },
      {
        status: RESPONSES.CREATED.status,
      }
    );
  } catch (error) {
    return NextResponse.json(RESPONSES.INTERNAL_SERVER_ERROR, {
      status: RESPONSES.INTERNAL_SERVER_ERROR.status,
    });
  }
};

// deletes files from cloudinary
export const DELETE = async (req: NextRequest) => {
  try {
    // Check if the user is an admin
    if (!(await isAdmin())) {
      return NextResponse.json(RESPONSES.UNAUTHORIZED_ACCESS, {
        status: RESPONSES.UNAUTHORIZED_ACCESS.status,
      });
    }

    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json(
        {
          ...RESPONSES.INSUFFICIENT_REQUEST_BODY,
          message: "Please provide one or more publicIds to delete",
        },
        {
          status: RESPONSES.INSUFFICIENT_REQUEST_BODY.status,
        }
      );
    }

    let publicIds: string[] = [];

    if (typeof publicId === "string") {
      publicIds = [publicId];
    } else {
      publicIds = publicId;
    }

    try {
      for (const publicId of publicIds) {
        if (!publicId) continue;
        await deleteImageFromCloudinary(publicId);
      }
      return NextResponse.json(
        {
          ...RESPONSES.SUCCESS,
          message: "Files deleted successfully!",
        },
        {
          status: RESPONSES.SUCCESS.status,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          ...RESPONSES.SOMETHING_WENT_WRONG,
          message: "Failed to delete files!",
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
        message: "Failed to delete files!",
      },
      {
        status: RESPONSES.INTERNAL_SERVER_ERROR.status,
      }
    );
  }
};
