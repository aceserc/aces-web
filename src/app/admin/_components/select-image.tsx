import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MAX_FILE_SIZE_IN_BYTES } from "@/constants/size.constant";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string | File) => void;
};
const SelectImage = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  return (
    <Dialog
      open={props.isOpen}
      onOpenChange={(val) => {
        if (!val) {
          setFile(null);
          setFileUrl("");
          props.onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-muted-foreground border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted-foreground/10 transition-colors"
              // show the background image if the file is selected
              {...(fileUrl || file
                ? {
                    style: {
                      backgroundImage: fileUrl
                        ? `url(${fileUrl})`
                        : `url(${URL.createObjectURL(file as Blob)})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    },
                  }
                : {})}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloudUpload className="w-8 h-8 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  {file || fileUrl ? (
                    <span className="font-semibold">Click to change</span>
                  ) : (
                    <>
                      <span className="font-semibold">Click to upload</span>{" "}
                      {/* or drag and drop */}
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {file || fileUrl
                    ? "File Selected"
                    : " SVG, PNG, JPG or GIF or anything..."}
                </p>
              </div>
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files?.length > 0) {
                    const file = e.target.files[0];
                    const fileSizeInBytes = file.size;

                    if (fileSizeInBytes > MAX_FILE_SIZE_IN_BYTES) {
                      toast.error(
                        `File size is too large. Please upload a file less than ${
                          MAX_FILE_SIZE_IN_BYTES / 1024 / 1024
                        }MB`
                      );
                      return;
                    }

                    setFile(e.target.files[0]);
                    setFileUrl("");
                  }
                }}
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          <div className="relative w-full ">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 bg-background font-medium text-sm">
              OR
            </span>
            <hr />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Image URL</Label>
            <Input
              type="url"
              id="image"
              placeholder="https://..."
              value={fileUrl}
              onChange={(e) => {
                setFile(null);
                setFileUrl(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              props.onClose();
              setFile(null);
              setFileUrl("");
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              if (file) {
                props.onSelect(file);
              } else if (fileUrl) {
                props.onSelect(fileUrl);
              }
              props.onClose();
              setFile(null);
              setFileUrl("");
            }}
            className="min-w-20"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectImage;
