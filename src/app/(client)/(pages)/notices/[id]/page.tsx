import NotFound from "@/components/reusable/not-found";
import { fetchData } from "@/services/fetch";
import React from "react";
import API from "@/services";
import { INoticesSchemaResponse } from "@/services/notice";
import DetailPage from "@/components/pages/detail-page";
import { Metadata } from "next";

type IEvents = {
  data: INoticesSchemaResponse & {
    body: string;
  };
};
type Props = {
  params: {
    id: string;
  };
};

const NoticesDetailsPage = async ({ params: { id } }: Props) => {
  const res = await fetchData<IEvents>(`${API.notices}?id=${id}`);

  if (!res) return <NotFound />;

  const { data } = res;
  return (
    <div className="mt-12">
      <DetailPage
        type="notices"
        title={data.title}
        body={data.body}
        createdAt={data.createdAt}
        thumbnail={data.thumbnail}
      />
    </div>
  );
};

export default NoticesDetailsPage;

export async function generateStaticParams() {
  const response = await fetchData<{
    data: string[];
  }>(`${API.notices}?onlyIds=true`);

  if (!response) return [];
  let params = response?.data.map((id) => ({ id }));
  return params;
}

export const generateMetadata = async ({
  params: { id },
}: Props): Promise<Metadata | null> => {
  const res = await fetchData<IEvents>(`${API.notices}?id=${id}`);

  if (!res) return null;
  return {
    title: res.data.title,
    openGraph: {
      title: res.data.title,
      images: [res.data.thumbnail],
    },
  };
};
