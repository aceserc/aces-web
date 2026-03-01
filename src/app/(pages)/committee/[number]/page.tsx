import type { Metadata } from "next";
import { ArrowLeftIcon, HistoryIcon } from "lucide-react";
import Link from "next/link";
import { NotFound } from "@/components/screens/not-found";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { getCommittee } from "@/lib/committee";
import { Committee } from "../_component/committee";

type Props = {
  params: Promise<{
    number: string;
  }>;
};

const CommitteePage = async ({ params }: Props) => {
  const { number } = await params;
  const { pastCommittees, currentCommitteeNumber } = await getCommittee();
  const currentCommittee = pastCommittees[Number(number)];
  const isCurrentCommittee = currentCommitteeNumber === Number(number);

  if (!currentCommittee) {
    return <NotFound />;
  }

  return (
    <div className="container mt-8 space-y-10">
      <section className="flex items-center justify-center flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 w-full border-b border-border pb-6">
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
            {isCurrentCommittee ? "Current Committee" : "Past Committee"}
          </span>
          <H1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            ACES {number}
            <sup>th</sup> Committee
          </H1>

          {/* Back to current committee banner */}
          {!isCurrentCommittee && (
            <div className="flex items-center gap-3 mt-2 px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground">
              <HistoryIcon className="size-4 shrink-0" />
              <span>You are viewing an older committee.</span>
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/committee`}>
                  <ArrowLeftIcon className="size-3.5 mr-1.5" />
                  View {currentCommitteeNumber}th Committee
                </Link>
              </Button>
            </div>
          )}
        </div>

        <Committee committee={currentCommittee} />
      </section>
    </div>
  );
};

export default CommitteePage;

export const metadata: Metadata = {
  title: "Committee | ACES",
};
