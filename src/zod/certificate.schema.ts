import { z } from "zod";

export const CertificateSchemaForApi = z.object({
  eventId: z.string(),
  issuedAt: z.string(),
  recipients: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      team: z.string().optional().nullable().nullish(),
      position: z.string().optional().nullable().nullish(),
    })
  ),
});

export type ICertificateSchemaForApi = z.infer<typeof CertificateSchemaForApi>;
