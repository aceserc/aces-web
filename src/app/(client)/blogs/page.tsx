import MainLayout from "@/components/layouts/main-layout";
import API from "@/services";
import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import { fetchData } from "@/services/fetch";
import { IApiResponse } from "@/types/response";
import SecondaryBlogCard from "./_components/secondary-blog-card";
import PrimaryBlogCard from "./_components/primary-blog-card";
import Link from "next/link";
import { IAuthor } from "@/types/author";
import BlogCard from "../../../components/reusable/blog-card";
import AllTagsAuthors from "./_components/all-tags-and-authors";

const Blogs = async () => {
  const blogs = await getBlogs();

  const tags = await getTags();
  const authors = await getBlogAuthors();

  return (
    <MainLayout className="max-w-7xl">
      <div className="flex flex-col gap-6 md:gap-12 xl:gap-24">
        {blogs.length === 0 && (
          <div className="flex items-center justify-center flex-col gap-3">
            <h1 className="text-lg md:text-2xl mt-20">No blogs available</h1>
          </div>
        )}
        <div className="flex flex-col gap-y-4 md:gap-y-7 xl:gap-y-9">
          {/* first blog */}
          {blogs.length > 0 && <PrimaryBlogCard {...blogs[0]} />}
          {/* second and third blogs */}
          <div className="grid gap-x-7 gap-y-9 grid-cols-1 lg:grid-cols-2">
            {blogs.length > 1 && <SecondaryBlogCard {...blogs[1]} />}
            {blogs.length > 2 && <SecondaryBlogCard {...blogs[2]} />}
          </div>
        </div>
        {blogs.length > 3 && (
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
              {blogs.map((blog, i) => {
                if (i < 3) return null;
                return <BlogCard key={blog._id} {...blog} />;
              })}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Blogs;

const getBlogs = async () => {
  const res = await fetchData<IApiResponse<IHandleGetBlogsServiceResponse>>(
    `${API.blogs}?limit=0`
  );
  return res?.data?.blogs || [];
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
