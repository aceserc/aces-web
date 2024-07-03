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
import { useQuery } from "@tanstack/react-query";
import { handleGetGalleryImagesService } from "@/services/gallery";
import SomeErrorOccurred from "@/components/pages/some-error-occured";
import Loading from "@/components/reusable/loading";
import Images from "./_components/images";

function App() {
  const [index, setIndex] = useState<number>(-1);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 12,
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery", queryParams],
    queryFn: () => handleGetGalleryImagesService(queryParams),
  });

  if (isError) <SomeErrorOccurred />;
  if (isLoading) return <Loading className="h-[80vh]" />;
  return (
    <div className="wrapper mt-16 sm:mt-24">
      <Images
        data={
          data?.images?.map((image) => ({
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
          data?.images?.map((image) => ({
            src: image.image.url,
            title: image.tag,
          }))!
        }
      />
    </div>
  );
}

export default App;
