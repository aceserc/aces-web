"use client";
import MarkdownEditor from "@/components/reusable/markdown-editor";
import React, { useState } from "react";
import EnterMoreDetails from "./enter-more-details";
import { MARKDOWN_BODY_MIN_LENGTH } from "@/constants/schema.constants";
import { MARKDOWN_BODY_DEFAULT_VALUE } from "@/constants/default.constant";
import { IFile } from "@/zod/file.schema";

const AddNewNotice = () => {
  const [body, setBody] = useState(MARKDOWN_BODY_DEFAULT_VALUE);
  const [usedImages, setUsedImages] = useState<IFile[]>([]);

  return (
    <>
      <div>
        <MarkdownEditor
          onChange={(value) => setBody(value)}
          value={body}
          imageFolder="training-and-workshops"
          updateUsedImagesList={(image) =>
            setUsedImages((prev) => {
              const images = [image, ...prev];
              // @ts-ignore
              return [...new Set(images)];
            })
          }
          usedImagesList={usedImages.map((image) => image.url)}
        />
      </div>
      <EnterMoreDetails
        images={usedImages}
        body={body}
        disableTrigger={body.length < MARKDOWN_BODY_MIN_LENGTH}
      />
    </>
  );
};

export default AddNewNotice;
