import { Button } from "@/components/ui/button";
import { ITestimonialSchemaResponse } from "@/services/testimonials";
import React from "react";
import { toast } from "sonner";
import ViewTestimonialModal from "./view-testimonials-modal";

type Props = ITestimonialSchemaResponse;
const TestimonialAction = (props: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <ViewTestimonialModal {...props} />
      <Button
        onClick={() => toast.info("Edit feature is not available yet!")}
        variant="outline"
        size="sm"
      >
        Edit
      </Button>
    </div>
  );
};

export default TestimonialAction;
