"use client"

import { useState } from "react"
import { z } from "zod"
import { CalendarIcon, UploadCloudIcon, UploadIcon, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ICertificateSchemaForApi } from "@/zod/certificate.schema"
import { useMutation } from "@tanstack/react-query"
import { handleAddCertificatesService } from "@/services/certificates"
import { toast } from "sonner"


interface CertificatePreviewDialogProps {
  data: ICertificateSchemaForApi
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function CertificatePreviewDialog({ data, isOpen, setIsOpen }: CertificatePreviewDialogProps) {

  const upload = useMutation({
    mutationFn: () => handleAddCertificatesService(data),
    onError: (err: string) => {
      toast.error(err)
    },
    onSuccess: (data) => {
      toast.success("Certificates added successfully")
      setIsOpen(false)
    },
  })

  // Format the date for display
  const formattedDate = new Date(data.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Certificate Details</DialogTitle>
          <DialogDescription>Preview the details of the certificate and its recipients.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Certificate Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Event ID</h3>
              <p className="text-lg font-semibold">{data.eventId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Issued At</h3>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <p className="text-lg font-semibold">{formattedDate}</p>
              </div>
            </div>
          </div>



          <p className="text-sm text-destructive">
            You cannot edit the certificate details after it has been issued, Please review the details before saving.
          </p>
          <Separator />

          {/* Recipients Section */}
          <div>
            <div className="flex items-center mb-4">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Recipients</h3>
              <Badge className="ml-2">{data.recipients.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-full max-h-[50vh] py-5">
              {data.recipients.map((recipient, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 py-3">
                    <CardTitle className="text-base">{recipient.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Role</p>
                        <p>{recipient.role}</p>
                      </div>
                      {recipient.team && (
                        <div>
                          <p className="font-medium text-muted-foreground">Team</p>
                          <p>{recipient.team}</p>
                        </div>
                      )}
                      {recipient.position && (
                        <div className={recipient.team ? "col-span-2" : ""}>
                          <p className="font-medium text-muted-foreground">Position</p>
                          <p>{recipient.position}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            isLoading={upload.isPending}
            onClick={() => upload.mutate()}
          >Save All <UploadCloudIcon className="ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

