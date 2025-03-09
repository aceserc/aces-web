"use client"

import { useState } from "react"
import { z } from "zod"
import { CalendarIcon, Users, Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useQuery } from "@tanstack/react-query"
import { handleGetCertificatesByEventIdService } from "@/services/certificates"
import Loading from "@/components/reusable/loading"



interface CertificateDialogProps {
  eventId: string
}

export default function CertificateDetailsDialog({ eventId }: CertificateDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedIds, setCopiedIds] = useState<Record<number, boolean>>({})
  const certificates = useQuery({
    queryKey: ["certificates", { eventId: eventId }],
    queryFn: () => handleGetCertificatesByEventIdService(eventId),
  })


  // Function to copy certificate ID to clipboard
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIds({ ...copiedIds, [index]: true })

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedIds({ ...copiedIds, [index]: false })
      }, 2000)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Certificate Details</DialogTitle>
          <DialogDescription>
            All the details of the certificates issued for this event.
          </DialogDescription>
        </DialogHeader>

        {
          certificates.isLoading ? (
            <Loading className="min-h-56" />
          ) :
            !certificates?.data || certificates?.data?.length === 0 ? (
              <p className="text-lg text-center text-muted-foreground">No certificates issued yet!</p>
            ) : (
              <div className="space-y-6 py-4">
                {/* Certificate Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Event ID</h3>
                    <p className="text-lg font-semibold">{eventId}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Issued At</h3>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-lg font-semibold">{
                        new Date(certificates.data[0].issuedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recipients Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Recipients</h3>
                    <Badge className="ml-2">{certificates?.data?.length}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-full max-h-[50vh] py-5">
                    {certificates?.data.map(({ recipient, _id }, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 py-3 flex flex-row items-center justify-between">
                          <CardTitle className="text-base">{recipient.name}</CardTitle>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => copyToClipboard(_id, index)}
                                >
                                  {copiedIds[index] ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copiedIds[index] ? "Copied!" : "Copy Certificate ID"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="font-medium text-muted-foreground">Role</p>
                              <p>{recipient.role}</p>
                            </div>
                            <div>
                              <p className="font-medium text-muted-foreground">Certificate ID</p>
                              <p className="font-mono truncate">{_id}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )
        }
      </DialogContent>
    </Dialog>
  )
}

