import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

const FAQs = ({ faqs }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-left">
        Frequently Asked Questions!
      </h3>
      <Accordion type="single" collapsible className="w-full max-w-4xl">
        {faqs.map((faq, index) => (
          <AccordionItem value={faq.answer} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { FAQs };