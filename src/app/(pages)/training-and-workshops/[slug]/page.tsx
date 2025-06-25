import { DetailPage } from "@/components/screens/detail-page";
import NotFound from "@/components/screens/not-found";
import { notionToMD } from "@/lib/notion";
import { getTrainingBySlug } from "@/server-actions/trainings";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await getTrainingBySlug(slug);

  if (!data) return <NotFound />;
  const body = await notionToMD(data.id);
  return (
    <div className="mt-12">
      <DetailPage
        type="training"
        title={data.title!}
        metaDescription={data?.description}
        createdAt={data?.created_at}
        body={body}
        thumbnail={data?.thumbnail}
        duration={data?.duration}
      />
    </div>
  );
};

export default Page;

