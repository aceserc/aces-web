import DetailPage from "@/components/pages/detail-page";
import NotFound from "@/components/reusable/not-found";
import API from "@/services";
import { fetchData } from "@/services/fetch";
import { IAuthor } from "@/types/author";
import { ICreatedUpdatedAt } from "@/types/created-update";
import { IApiResponse } from "@/types/response";
import { ITrainingAndWorkshopsSchemaExtended } from "@/zod/training-and-workshops.schema";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Props) => {
  const data = await getTrainingById(id);

  if (!data || !data.training) return <NotFound />;

  return (
    <div className="mt-12">
      <DetailPage
        type="training"
        title={data?.training.title!}
        metaDescription={data?.training.inShort}
        createdAt={data?.training?.createdAt!}
        body={data?.training.body!}
        thumbnail={data?.training.thumbnail!}
        trainingDuration={data?.training?.duration ?? ""}
      />
    </div>
  );
};

export default Page;

const getTrainingById = async (id: string) => {
  const res = await fetchData<
    IApiResponse<{
      training: ITrainingAndWorkshopsSchemaExtended & ICreatedUpdatedAt;
    }>
  >(`${API.trainingAndWorkshops}?id=${id}`);
  return res?.data;
};

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata | null> => {
  const data = await getTrainingById(id);
  if (!data || !data.training) return null;
  return {
    title: data.training.title,
    description: data.training.inShort,
    openGraph: {
      title: data.training.title,
      description: data.training.inShort,
      images: [data.training.thumbnail],
    },
  };
};
