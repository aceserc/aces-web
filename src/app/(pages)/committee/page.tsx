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
    <div className="container mt-8 space-y-12">
      <section className="flex items-center justify-center flex-col gap-8">
        <H1 className="border-b w-full text-center">
          ACES {currentCommitteeNumber}
          <sup>th</sup> Committee
        </H1>
        <Committee committee={currentCommittee} />
      </section>
      <Hr />
      <section className="flex flex-col gap-8">
        <H2 className="text-center">Past Committees</H2>
        <div className="flex gap-4 flex-wrap justify-center">
          {pastCommitteeNumbers.map((number) => (
            <Button key={number} variant="outline" asChild>
              <Link href={`/committee/${number}`}>
                ACES {number}
                <sup>th</sup> Committee
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
