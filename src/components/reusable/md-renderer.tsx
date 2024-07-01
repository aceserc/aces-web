import { marked } from "marked";
import React from "react";

type Props = {
  md: string;
};

const MdRender = ({ md }: Props) => {
  const htmlContent = marked(md);
  return (
    <div className="prose prose-p:mb-0 prose-p:mt-0 prose-p:w-full w-full prose-thead:text-left prose-hr:mt-3 prose-hr:mb-3 prose-a:text-blue-600">
      <div
        className="w-full"
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      />
    </div>
  );
};

export default MdRender;
