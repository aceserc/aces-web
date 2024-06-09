import { uploadFile } from "@/helpers/upload-file";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { deleteImageFromCloudinary } from "@/helpers/delete-image";

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !(user.publicMetadata.role === "admin")) {
      return NextResponse.json(
        {
          status: 401,
          message: "Unauthorized Access!",
        },
        { status: 401 }
      );
    }
    const formData = await req.formData();
    const image = formData.get("file") as unknown as File;
    const folder = formData.get("folder") as string;

    if (!image)
      return NextResponse.json(
        {
          status: 400,
          message: "Image is required",
        },
        {
          status: 400,
        }
      );

    if (!folder)
      return NextResponse.json(
        {
          status: 400,
          message: "Folder is required",
        },
        {
          status: 400,
        }
      );

    const data: any = await uploadFile(image, folder);

    return NextResponse.json(
      {
        data,
        message: "File uploaded successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user || !user.id || !(user.publicMetadata.role === "admin")) {
      return NextResponse.json(
        {
          status: 401,
          message: "Unauthorized Access!",
        },
        { status: 401 }
      );
    }

    const { publicIds } = await req.json();
    if (!publicIds || !Array.isArray(publicIds)) {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid publicIds",
        },
        {
          status: 400,
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
          status: 200,
          publicIds,
          message: "Files deleted successfully",
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          status: 400,
          message: "Error deleting files",
        },
        {
          status: 400,
        }
      );
    }

    // Your code to delete files with the given publicIds goes here
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
};
