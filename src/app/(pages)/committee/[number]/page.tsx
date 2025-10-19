import { H1, H2 } from "@/components/ui/typography";
import { getCommittee } from "@/lib/committee";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Hr } from "@/components/ui/separator";
import Link from "next/link";
import { Committee } from "../_component/committee";
import { NotFound } from "@/components/screens/not-found";

type Props = {
  params: Promise<{
    number: string;
  }>;
};
const CommitteePage = async ({ params }: Props) => {
  const { number } = await params;

  const { pastCommittees } = await getCommittee();

  const currentCommittee = pastCommittees[Number(number)];

  if (!currentCommittee) {
    return <NotFound />;
  }

  return (
    <div className="container mt-8 space-y-12">
      <section className="flex items-center justify-center flex-col gap-8">
        <H1 className="border-b w-full text-center">
          ACES {number}
          <sup>th</sup> Committee
        </H1>
        <Committee committee={currentCommittee} />
      </section>
    </div>
  );
};

export default CommitteePage;

export const metadata: Metadata = {
  title: "Committee | ACES",
};
