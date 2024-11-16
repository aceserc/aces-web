"use client";

import Loading from "@/components/reusable/loading";
import { ADMIN_ROLES } from "@/constants/roles.constants";
import {
  handleGetDashboardDataService,
  IDashboardData,
} from "@/services/dashboard";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const BlogsPage = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery<IDashboardData>({
    queryKey: ["dashboard"],
    queryFn: handleGetDashboardDataService,
    enabled: ADMIN_ROLES.includes(user?.publicMetadata.role as string),
  });

  return (
    <div className="overflow-x-scroll scrollbar-hidden min-h-[40vh] pb-40">
      <div className="border border-accent-foreground/10 rounded-lg bg-muted/10 p-6 flex flex-col gap-12 min-w-[1100px]">
        {/*  event list */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loading />
          </div>
        ) : !ADMIN_ROLES.includes(user?.publicMetadata.role as string) ? (
          <div className="w-full h-80 flex items-center justify-center gap-3 flex-col">
            <Image src="/logo.png" alt="logo" width={60} height={60} />
            <span>Welcome to the admin panel.</span>
          </div>
        ) : data ? (
          <div className="flex flex-col gap-12">
            <span className="text-sm text-gray-400">
              Any change form the admin panel might take upto 1-2 minutes to
              reflect in the UI for client side.
            </span>
            <div className="flex flex-wrap gap-6">
              {[
                {
                  title: "Sponsorships",
                  count: data.totalSponsors,
                },
                {
                  title: "Events",
                  count: data.totalEvents,
                },
                {
                  title: "Blogs",
                  count: data.totalBlogs,
                },
                {
                  title: "Notices",
                  count: data.totalNotices,
                },
                {
                  title: "Members",
                  count: data.totalCommitteeMembers,
                },
                {
                  title: "Testimonials",
                  count: data.totalTestimonials,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 bg-accent-foreground/5 px-6 py-3 rounded-lg min-w-52 shadow-sm"
                >
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-3xl font-semibold self-end">
                    <span className="font-medium text-sm text-muted-foreground">
                      Total:{" "}
                    </span>
                    {item.count}
                  </p>
                </div>
              ))}
            </div>

            {/* latest contact */}
            {data.latestContacts.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Latest Contacts </h3>
                <div className="grid grid-cols-2 gap-6">
                  {data.latestContacts.map((contact, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 px-5 py-2 bg-muted-foreground/5 shadow-sm"
                    >
                      <div className="flex gap-2">
                        <span className="font-medium">Name:</span>
                        <span>{contact.name ?? "Anonymous"}</span>
                      </div>
                      {contact.email && (
                        <div className="flex gap-2">
                          <span className="font-medium">Email:</span>
                          <span>{contact.email ?? "Anonymous"}</span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <span className="font-medium">Sent At:</span>
                        <span>
                          {new Date(contact.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div >
                        <span className="font-medium">Subject:</span>
                        <span className="text-muted-foreground ml-2">
                          {contact.subject}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <span className="font-medium">Message:</span>
                        <p className="text-muted-foreground ml-2">
                          {contact.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <span className="text-muted-foreground">No data found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
