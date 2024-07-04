"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { handleGetGalleryImagesService } from "@/services/gallery";
import SomeErrorOccurred from "@/components/pages/some-error-occured";
import Loading from "@/components/reusable/loading";
import Images from "./_components/images";
import { Button } from "@/components/ui/button";

function App() {
  const [index, setIndex] = useState<number>(-1);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notices"],
    queryFn: ({ pageParam }) =>
      handleGetGalleryImagesService({
        page: pageParam,
        limit: 12,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.resultsOnNextPage > 0) {
        return lastPage.pageNo + 1;
      }
      return undefined;
    },
  });

  if (isError) <SomeErrorOccurred />;
  if (isLoading) return <Loading className="h-[80vh]" />;
  return (
    <>
      <div className="wrapper mt-16 sm:mt-24">
        <Images
          data={
            data?.pages
              .map((page) => page.images)
              .flat()
              .map((image) => ({
                src: image.image.url,
                title: image.tag,
              }))!
          }
          onClick={(currentIndex) => setIndex(currentIndex)}
        />

        <Lightbox
          plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
          captions={{
            showToggle: true,
            descriptionTextAlign: "end",
          }}
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={
            data?.pages
              .map((page) => page.images)
              .flat()
              .map((image) => ({
                src: image.image.url,
                title: image.tag,
              }))!
          }
        />
      </div>
      {!isLoading && hasNextPage && (
        <div className="w-full flex items-center justify-center mt-9 sm:mt-12">
          <Button
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="default"
          >
            Load More...
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
