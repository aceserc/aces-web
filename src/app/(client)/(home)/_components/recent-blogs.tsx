import React from "react";
import Section from "./section";
import { fetchData } from "@/services/fetch";
import API from "@/services";
import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import SecondaryBlogCard from "../../blogs/_components/secondary-blog-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "@/components/reusable/blog-card";
const RecentBlogs = async () => {
  const data = await fetchData<{
    data: IHandleGetBlogsServiceResponse;
  }>(`${API.blogs}?limit=3`);

  const blogs = data?.data?.blogs;

  if (!blogs) return null;
  return (
    <Section id="recent-blogs" title="Recent Blogs">
      <div className="w-full overflow-hidden">
        <div className="flex w-full">
          <Carousel className="w-full flex flex-col gap-4 px-4">
            <CarouselContent>
              {blogs?.map((b, i) => (
                <CarouselItem
                  key={i}
                  className="min-w-full h-ful sm:min-w-[600px] max-w-[600px] pb-4"
                >
                  <BlogCard lessDescription {...b} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-4 ml-auto">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};

export default RecentBlogs;
