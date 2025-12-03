import { Facebook, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Hr } from "@/components/ui/separator";
import { H1, H2, Paragraph } from "@/components/ui/typography";
import { CONTACT_LINKS } from "@/constants/contact-links";
import { FAQS } from "@/constants/faqs";
import { ContactForm } from "./_components/contact-form";
import { FAQs } from "./_components/faqs";

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    title: "56700 Gangalal Marga Tinkune, <br/> Dharan-8, Sunsari, Nepal.",
    href: "",
  },
  {
    icon: Mail,
    title: CONTACT_LINKS.email.href.split(":")[1],
    href: CONTACT_LINKS.email.href,
  },
  {
    icon: Facebook,
    title: "@ACES",
    href: CONTACT_LINKS.facebook.href,
  },
];

const ContactPage = () => {
  return (
    <div className="container mt-8 space-y-12">
      <section className="flex items-center justify-center flex-col gap-8">
        <H1 className="border-b w-full text-center">Have something so say?</H1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:my-10">
            <H2>ACES</H2>
            <Paragraph className="max-w-sm mt-5 ">
              Have something to say? We are here to help. Fill up the form or
              send email or call phone. We will get back to you as soon as
              possible.
            </Paragraph>
            <div className="mt-5 opacity-80">
              {CONTACT_DETAILS.map((contact, index) => (
                <Link
                  href={contact.href}
                  key={index}
                  className="flex items-start mt-3 space-x-2 text-500 hover:text-primary transition-colors "
                >
                  <contact.icon className="size-5 mt-1" />
                  <span
                    className="underline text-lg"
                    dangerouslySetInnerHTML={{ __html: contact.title }}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:mt-10">
            <ContactForm />
          </div>
        </div>
        <Hr className="my-4 sm:my-9" />
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1492.045251743784!2d87.292253571873!3d26.792788669879336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1719406732980!5m2!1sen!2snp"
          loading="lazy"
          className="w-full h-[250px] sm:h-[400px] rounded-md border-none outline-none xl:grayscale-[40%] hover:grayscale-0 transition-colors animate-fade-in delay-500 zoom-in"
        ></iframe>

        <Hr className="my-4 sm:my-9" />
        <div className="mx-auto">
          <FAQs faqs={FAQS} />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
