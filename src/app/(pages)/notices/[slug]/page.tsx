import { DetailPage } from "@/components/screens/detail-page";
import NotFound from "@/components/screens/not-found";
import { notionToMD } from "@/lib/notion";
import { getNoticeBySlug } from "@/server-actions/notices";

type Props = {
  params: Promise<{
    slug: string;
  }>
};

const NoticesDetailsPage = async ({ params }: Props) => {
  const { slug } = await params

  const notice = await getNoticeBySlug(slug)

  if (!notice) return <NotFound />;

  const body = await notionToMD(notice.id);

  return (
    <div className="mt-12">
      <DetailPage
        type="notices"
        title={notice.title}
        body={body}
        createdAt={notice.created_date}
        thumbnail={notice.cover_image}
      />
    </div>
  );
};

export default NoticesDetailsPage;

