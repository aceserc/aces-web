import MainLayout from "@/components/layouts/main-layout";
import API from "@/services";
import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import { fetchData } from "@/services/fetch";
import { IApiResponse } from "@/types/response";
import React from "react";
import { IAuthor } from "@/types/author";
import AllTagsAuthors from "../../_components/all-tags-and-authors";
import BlogCard from "@/components/reusable/blog-card";

type Props = {
  params: {
    tag: string;
  };
};

const BlogByTag = async ({ params: { tag } }: Props) => {
  const blogs = await getBlogsByTag(tag);
  const tags = await getTags();
  const authors = await getBlogAuthors();
  return (
    <MainLayout
      title={
        <>
          Tag: <span className="opacity-85 font-medium">{decodeURI(tag)}</span>
        </>
      }
      className="max-w-7xl"
    >
      <div className="mt-7 sm:mt-12">
        <div className="flex gap-5 md:gap-7 flex-col lg:flex-row xl:gap-24">
          {/* sidebar */}
          <div className="flex flex-col gap-3 px-6 py-7 bg-white shadow-md h-fit rounded-md w-full lg:w-72">
            <AllTagsAuthors
              data={tags.map((t) => ({
                label: t,
                href: `/blogs/tag/${t}`,
              }))}
              title="Tags"
            />
            <AllTagsAuthors
              data={authors.map((a) => ({
                label: `${a.firstName} ${a.lastName}`,
                href: `/blogs/author/${a.id}`,
              }))}
              title="Authors"
            />
          </div>

          {/* all remaining blogs */}
          <div className="flex flex-col gap-6 w-full">
            {blogs.length === 0 ? (
              <div className="text-center text-lg md:text-xl mt-12">
                No blogs found with tag:{" "}
                <span className="text-primary">{tag}</span>
              </div>
            ) : (
              blogs.map((blog) => {
                return <BlogCard key={blog._id} {...blog} />;
              })
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogByTag;

const getBlogsByTag = async (tag: string) => {
  const res = await fetchData<
    IApiResponse<IHandleGetBlogsServiceResponse["blogs"]>
  >(`${API.blogByTag}?tag=${tag}`);
  return res?.data || [];
};

const getTags = async () => {
  const res = await fetchData<IApiResponse<string[]>>(
    `${API.blogTags}?onlyTags=true`
  );
  return res?.data || [];
};

const getBlogAuthors = async () => {
  const res = await fetchData<IApiResponse<IAuthor[]>>(
    `${API.blogAuthors}?onlyAuthors=true`
  );
  return res?.data || [];
};
