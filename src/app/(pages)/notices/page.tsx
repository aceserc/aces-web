import { MainLayout } from "@/components/layout/main-layout";
import { NoticeCard } from "./_components/notice-card";
import { getCollection } from "@/lib/db";
import { Notice } from "@/lib/db/types";

const Notices = () => {
  const notices = getCollection("notices") as Notice[]

  return (
    <MainLayout title="Notices">
      <div className="grid grid-cols-1 mx-auto gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full mt-12 max-w-[750px] lg:max-w-[1100px] 2xl:grid-cols-4 2xl:max-w-[1500px]">
        {notices.length === 0 ? (
          <div className="text-center text-lg md:text-2xl mt-16  col-span-4 flex items-center justify-center w-full">
            <span> No notices found</span>
          </div>
        ) : (
          notices
            .map((n, i) => (
              <NoticeCard
                key={i}
                {...n}
              />
            ))
        )}
      </div>
    </MainLayout>
  );
};

export default Notices;