import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hr } from "@/components/ui/separator";
import { H1, H2 } from "@/components/ui/typography";
import { getCommittee } from "@/lib/committee";
import { Committee } from "./_component/committee";

const CommitteePage = async () => {
  const { currentCommitteeNumber, pastCommittees, currentCommittee } =
    await getCommittee();

  const pastCommitteeNumbers = Object.keys(pastCommittees)
    .map(Number)
    .sort((a, b) => b - a)
    .filter((number) => number !== currentCommitteeNumber);

  return (
    <div className="container mt-8 space-y-14">
      {/* Current committee */}
      <section className="flex items-center justify-center flex-col gap-8">
        <div className="flex flex-col items-center gap-2 w-full border-b border-border pb-6">
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
            Current Committee
          </span>
          <H1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            ACES {currentCommitteeNumber}
            <sup>th</sup> Committee
          </H1>
        </div>
        <Committee committee={currentCommittee} />
      </section>

      <Hr />

      {/* Past committees */}
      <section className="flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
            Archive
          </span>
          <H2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
            Past Committees
          </H2>
        </div>

        <div className="flex gap-3 flex-wrap justify-center max-w-2xl">
          {pastCommitteeNumbers.map((number) => (
            <Button
              key={number}
              variant="outline"
              size="sm"
              asChild
              className="rounded-full border-border hover:border-primary/40 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              <Link href={`/committee/${number}`}>
                ACES {number}th Committee
              </Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommitteePage;

export const metadata: Metadata = {
  title: "Committee | ACES",
};
