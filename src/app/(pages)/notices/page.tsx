import { facebook } from "@/lib/fb";
import React from "react";
import { NoticeCard } from "./_components/notice-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONTACT_LINKS } from "@/constants/contact-links";

const Notices = async () => {
  const { posts, nextPage } = await facebook.listPosts();
  return (
    <div className="container flex flex-col items-center justify-center mt-12 gap-8 ">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full 2xl:grid-cols-4">
        {posts.map((post) => (
          <NoticeCard
            key={post.id}
            coverImages={(
              post.attachments?.data.map(
                (item) => item.media?.image?.src || ""
              ) || []
            ).filter(Boolean)}
            title={post.message || ""}
            createdAt={post.created_time || ""}
            href={`https://www.facebook.com/${post.id.split("_")[0]}/posts/${
              post.id.split("_")[1]
            }`}
          />
        ))}
      </div>
      {nextPage && (
        <Button variant={"secondary"} asChild>
          <Link href={CONTACT_LINKS.facebook.href} target="_blank">
            View all on Facebook
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Notices;
