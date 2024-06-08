import { uploadFile } from "@/helpers/upload-file";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
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
