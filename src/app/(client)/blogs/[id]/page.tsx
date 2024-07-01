import DetailPage from "@/components/pages/detail-page";
import API from "@/services";
import { fetchData } from "@/services/fetch";
import { IAuthor } from "@/types/author";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { IApiResponse } from "@/types/response";
import { IBlogSchemaExtended } from "@/zod/blog.schema.";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const data = await getBlogById(id);
  return (
    <div className="mt-12">
      <DetailPage
        tags={data?.blog.tags || []}
        type="blogs"
        title={data?.blog.title!}
        metaDescription={data?.blog.metaDescription}
        createdAt={data?.blog?.createdAt!}
        author={data?.author}
        body={data?.blog.body!}
        thumbnail={data?.blog.thumbnail!}
      />
    </div>
  );
};

export default page;

const getBlogById = async (id: string) => {
  const res = await fetchData<
    IApiResponse<{
      blog: IBlogSchemaExtended & ICreatedUpdatedAt;
      author: IAuthor;
    }>
  >(`${API.blogs}?id=${id}`);
  return res?.data;
};
