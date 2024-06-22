import { Button } from "@/components/ui/button";
import { ITestimonialSchemaResponse } from "@/services/testimonials";
import React from "react";

type Props = ITestimonialSchemaResponse;
const TestimonialAction = (props: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <Button variant="secondary" size="sm">
        View
      </Button>
      <Button variant="outline" size="sm">
        Edit
      </Button>
    </div>
  );
};

export default TestimonialAction;
