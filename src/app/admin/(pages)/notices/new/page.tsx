"use client";
import MarkdownEditor from "@/components/reusable/markdown-editor";
import React, { useState } from "react";

const AddNewNotice = () => {
  const [body, setBody] = useState("");
  const [usedImages, setUsedImages] = useState<string[]>([]);

  return (
    <div>
      <MarkdownEditor
        onChange={(value) => setBody(value)}
        value={body}
        imageFolder="notices"
        updateUsedImagesList={(image) =>
          setUsedImages((prev) => {
            const images = [image, ...prev];
            // @ts-ignore
            return [...new Set(images)];
          })
        }
        usedImagesList={usedImages}
      />
    </div>
  );
};

export default AddNewNotice;
