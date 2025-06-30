import { DetailPage } from "@/components/screens/detail-page";
import NotFound from "@/components/screens/not-found";
import { getCollection, getCollectionItemBySlug } from "@/lib/db";
import { Notice } from "@/lib/db/types";

type Props = {
  params: Promise<{
    slug: string;
  }>
};

const NoticesDetailsPage = async ({ params }: Props) => {
  const { slug } = await params

  const notice = getCollectionItemBySlug("notices", slug) as Notice

  if (!notice) return <NotFound />;


  return (
    <div className="mt-12">
      <DetailPage
        type="notices"
        title={notice.title}
        body={notice.body}
        createdAt={notice.created_date}
        thumbnail={notice.cover_image || ""}
      />
    </div>
  );
};

export default NoticesDetailsPage;

export async function generateStaticParams() {
  const data = getCollection("notices") as Notice[]

  return data.map((d) => ({
    slug: d.slug,
  }));
}
