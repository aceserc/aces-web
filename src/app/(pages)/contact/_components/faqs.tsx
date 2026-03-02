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
    <div className="flex flex-col gap-5 w-full items-center">
      <div className="flex flex-col gap-1.5 items-center">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
          FAQs
        </span>
        <H2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
          Frequently Asked Questions
        </H2>
      </div>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem value={faq.answer} key={index}>
            <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { FAQs };
