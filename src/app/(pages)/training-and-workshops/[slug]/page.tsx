import { DetailPage } from "@/components/screens/detail-page";
import NotFound from "@/components/screens/not-found";
import { getCollection, getCollectionItemBySlug } from "@/lib/db";
import { Training } from "@/lib/db/types";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = getCollectionItemBySlug("trainings", slug) as Training

  if (!data) return <NotFound />;
  return (
    <div className="mt-12">
      <DetailPage
        type="training"
        title={data.title!}
        metaDescription={data?.description}
        createdAt={data?.created_at}
        body={data.body}
        thumbnail={data?.cover_image || ""}
        duration={data?.duration}
      />
    </div>
  );
};

export default Page;


export async function generateStaticParams() {
  const data = getCollection("trainings") as Training[]

  return data.map((d) => ({
    slug: d.slug,
  }));
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const data = getCollectionItemBySlug("trainings", slug) as Training;

  return {
    title: data.title!,
    description: data.description!,
    openGraph: {
      title: data.title!,
      description: data.description!,
      images: [
        {
          url: data.cover_image!,
        }
      ]
    }
  }
}