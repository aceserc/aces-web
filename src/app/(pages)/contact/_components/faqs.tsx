import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { H2 } from "@/components/ui/typography";

type Props = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

const FAQs = ({ faqs }: Props) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <H2 className="text-left">Frequently Asked Questions!</H2>
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
