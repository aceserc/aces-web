import { z } from "zod";

export const FileSchema = z.object({
  fileId: z.string().optional(),
  name: z.string().optional(),
  url: z.string(),
  thumbnailUrl: z.string().optional(),
});

export type IFile = z.infer<typeof FileSchema>;
