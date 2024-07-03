import MainLayout from "@/components/layouts/main-layout";
import API from "@/services";
import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import { fetchData } from "@/services/fetch";
import { IApiResponse } from "@/types/response";
import React from "react";
import AllTagsAuthors from "../../_components/all-tags-and-authors";
import { IAuthor } from "@/types/author";
import BlogCard from "../../../../../components/reusable/blog-card";
import Link from "next/link";

type Props = {
  params: {
    authorId: string;
  };
};

const BlogByTag = async ({ params: { authorId } }: Props) => {
  const blogs = await getBlogsByAuthor(authorId);
  const tags = await getTags();
  const authors = await getBlogAuthors();
  const author = blogs[0]?.author;

  return (
    <MainLayout className="max-w-7xl">
      <div className="mt-7 sm:mt-12 flex flex-col gap-5 sm:gap-7 md:gap-12">
        <div className="m-auto flex flex-col gap-3">
          <img
            src={author?.avatar}
            alt="author"
            className="h-20 w-20 md:h-24 md:w-24 m-auto border border-muted rounded-full object-cover object-center shadow-inner"
          />
          <Link
            target="_blank"
            href={author.contact || ""}
            className="text-center text-xl md:text-2xl font-semibold underline hover:text-primary transition-all"
          >
            {author?.firstName} {author?.lastName}
          </Link>
        </div>
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
                No blogs found!
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

const getBlogsByAuthor = async (author: string) => {
  const res = await fetchData<
    IApiResponse<IHandleGetBlogsServiceResponse["blogs"]>
  >(`${API.blogByAuthor}?authorId=${author}`);
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
