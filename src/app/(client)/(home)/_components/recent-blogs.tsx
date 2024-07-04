import React from "react";
import Section from "./section";
import { fetchData } from "@/services/fetch";
import API from "@/services";
import {
  IBlogsSchemaResponse,
  IHandleGetBlogsServiceResponse,
} from "@/services/blogs";
import SecondaryBlogCard from "../../blogs/_components/secondary-blog-card";

const RecentBlogs = async () => {
  const data = await fetchData<{
    data: IHandleGetBlogsServiceResponse;
  }>(`${API.blogs}?limit=3`);

  const blogs = data?.data?.blogs;

  if (!blogs) return null;
  return (
    <Section id="recent-blogs" title="Recent Blogs">
      <div className="w-full overflow-hidden">
        <div className="flex w-full gap-6 overflow-x-auto snap-x snap-mandatory">
          {blogs?.map((b, i) => (
            <div
              key={i}
              className="min-w-full h-full snap-center sm:min-w-[600px] max-w-[600px] pb-4"
            >
              <SecondaryBlogCard {...b} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default RecentBlogs;
