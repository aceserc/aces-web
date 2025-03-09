"use client";
import Loading from "@/components/reusable/loading";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { handleGetCertificateByIdService } from "@/services/certificates";
import { useQuery } from "@tanstack/react-query";
import { Award, Calendar, FileX, GraduationCap } from "lucide-react"
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams() as { id: string }
  const { isLoading, data } = useQuery({
    queryKey: ["certificate", id],
    queryFn: () => handleGetCertificateByIdService(id)
  })

  if (isLoading) return <Loading className="h-[70vh]" />

  if (!data) return <div className="w-full  p-4 md:p-8 flex items-center justify-center mt-24 container">
    <Card className="max-w-md w-full shadow-md">
      <CardHeader className="pb-4 text-center">
        <div className="w-full flex justify-center mb-4">
          <div className="p-4 bg-muted rounded-full">
            <FileX className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Certificate Not Found</CardTitle>
      </CardHeader>

      <CardContent className="text-center space-y-2">
        <p className="text-muted-foreground">
          We couldn&apos;t find a certificate with the ID you provided. If you think this is an error, please contact us.
        </p>
      </CardContent>
    </Card>
  </div>
  return (
    <div className="w-full bg-gradient-to-br from-background to-muted p-4 md:p-8 mt-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Certificate Header */}
        <div className="space-y-4">
          <div className="space-y-2 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-muted-foreground font-medium tracking-wide">CERTIFICATE</h4>
            <h1 className=" text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {data.event.title}
            </h1>
          </div>

          {/* Completion Info Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/10 relative overflow-hidden shadow-lg py-9">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"></div>

            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Issued To</div>
                  <div className="text-xl font-semibold text-primary">
                    {data.recipient.name}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-full">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {new Date(data.issuedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-border via-primary/10 to-border"></div>

              <div className="flex items-start gap-3 justify-start">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <p className="sm:text-lg text-card-foreground">
                  This is to certify that
                  {" "} {data.recipient.name}{" "}
                  ,{
                    data.recipient.position && <>
                      {" "} holding the position of <span className="font-semibold">
                        {" "} {data.recipient.position}{" "}
                      </span>
                    </>
                  } {
                    data.recipient.team && <>
                      with the team  <span className="font-semibold">
                        {" "} {data.recipient.team}
                      </span>,
                    </>
                  } has successfully participated in the
                  <span className="font-semibold">
                    {" "}   {data.event.title}{" "}
                  </span>
                  {
                    data.event.duration && <>
                      , for a duration of  {data.event.duration}{" "}

                    </>
                  }

                  {
                    ![
                      "participant",
                      "student",
                      "attendee",
                    ].includes(data.recipient.role) &&

                    <>
                      as
                      <span className="font-semibold">
                        {" "}        {data.recipient.role}{" "}
                      </span>
                    </>
                  }



                  . Throughout the event/training,
                  {" "}  {data.recipient.name} has
                  demonstrated exceptional dedication and skills. His/Her performance during the course has been outstanding, and this certificate recognizes his/her hard work and achievement.
                  <br />
                  <span className="mt-2.5 font-medium opacity-70">Issued by ACES.</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Description */}
        {data.event.inShort && <div className="text-center space-y-4">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data.event.inShort}
          </p>
        </div>}

        {/* View More Button */}
        <div className="flex justify-center">
          <Button variant={"outline"} className="px-6 py-2" asChild>
            <Link href={`/training-and-workshops/${data.event._id}`}>
              View More About Training/Event
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

