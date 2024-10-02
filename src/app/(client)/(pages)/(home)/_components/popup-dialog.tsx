"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/helpers/cn";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import API from "@/services";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type INotice = {
  _id: string;
  title: string;
  thumbnail: {
    url: string;
  };
  createdAt: string;
};

type IDoNotShowAgain = {
  date: string;
  notices: string[];
};

// show a dialog with recent notices
const PopupDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const { data, isLoading, isSuccess } = useQuery<INotice[]>({
    queryKey: ["notices", "popup"],
    queryFn: async () =>
      new Promise((resolve, reject) => {
        axios
          .get(API.recentNotices)
          .then((res) => resolve(res.data?.data))
          .catch((err) => reject([]));
      }),
  });

  // set open now true after 5 seconds
  useEffect(() => {
    let timer = setTimeout(() => {
      const doNotShowAgain = localStorage.getItem("doNotShowAgain");
      if (doNotShowAgain) {
        try {
          const parsedDoNotShowAgain: IDoNotShowAgain =
            JSON.parse(doNotShowAgain);

          const notices = parsedDoNotShowAgain.notices;
          if (
            JSON.stringify(notices) ===
            JSON.stringify(data?.map((notice) => notice._id))
          ) {
            setOpenNow(false);
          } else {
            setOpenNow(true);
          }
        } catch (e) {
          setOpenNow(true);
        }
      } else {
        setOpenNow(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  });

  // if open now is true, open the dialog
  useEffect(() => {
    if (openNow && !isLoading && isSuccess) {
      setIsOpen(true);
    }
  }, [openNow, isLoading, isSuccess]);

  const handleClose = () => {
    const doNotShowAgain: IDoNotShowAgain = {
      date: new Date().toISOString(),
      notices: data?.map((notice) => notice._id) || [],
    };
    localStorage.setItem("doNotShowAgain", JSON.stringify(doNotShowAgain));
    setIsOpen(false);
  };

  if (!data || data?.length === 0 || !isSuccess) return null;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) setIsOpen(isOpen);
        else handleClose();
      }}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Recent Notices</DialogTitle>
          <DialogDescription className="text-lg font-medium">
            {activeNoticeIndex + 1}. {data?.[activeNoticeIndex].title}
          </DialogDescription>
        </DialogHeader>
        <div className="relative group">
          <Link href={`/notices/${data?.[activeNoticeIndex]._id}`}>
            <img
              src={data?.[activeNoticeIndex].thumbnail.url}
              alt={data?.[activeNoticeIndex].title}
              onError={(e) => {
                console.log(e);
                e.currentTarget.src = "placeholder.png";
              }}
              className="w-full h-full object-contain max-h-[300px] object-center"
              fetchPriority="low"
              loading="lazy"
            />
          </Link>
          {activeNoticeIndex > 0 && (
            <button
              onClick={() => {
                if (activeNoticeIndex === 0) return;
                setActiveNoticeIndex((prev) => prev - 1);
              }}
              className="absolute h-9 w-9 -bottom-3 left-1 bg-gray-100 shadow-lg rounded-full p-2 border-none hover:rotate-[360deg] hover:scale-105 hover:bg-red-500 hover:text-white transition-all"
            >
              <IoIosArrowForward className="w-full h-full rotate-180" />
            </button>
          )}
          {
            <button
              onClick={() => {
                if (activeNoticeIndex === data?.length - 1) return;
                setActiveNoticeIndex((prev) => prev + 1);
              }}
              className={cn(
                "absolute h-9 w-9 -top-3 right-1 bg-gray-100 shadow-lg rounded-full p-2 border-none group-hover:rotate-[360deg] hover:scale-105 group-hover:bg-red-500 group-hover:text-white transition-all"
              )}
            >
              <IoIosArrowForward className="w-full h-full" />
            </button>
          }
        </div>
        <DialogFooter>
          <Button onClick={handleClose}>Thanks!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
