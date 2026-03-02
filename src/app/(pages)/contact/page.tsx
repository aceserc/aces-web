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
    <div className="container mt-8 space-y-14">
      <section className="flex items-center justify-center flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 w-full border-b border-border pb-6">
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
            Contact
          </span>
          <H1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Have something to say?
          </H1>
        </div>

        {/* Contact grid */}
        <div className="grid md:grid-cols-2 gap-6 w-full items-start">
          {/* Left: Info */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest font-mono">
                Get in touch
              </span>
              <H2 className="text-xl sm:text-2xl font-bold leading-tight">
                ACES
              </H2>
            </div>

            <Paragraph className="text-muted-foreground text-sm leading-relaxed">
              Have something to say? We are here to help. Fill up the form or
              send email or call phone. We will get back to you as soon as
              possible.
            </Paragraph>

            <div className="flex flex-col gap-3">
              {CONTACT_DETAILS.map((contact, index) => (
                <Link
                  href={contact.href}
                  key={index}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg border border-border bg-background group-hover:border-primary/30 group-hover:bg-accent transition-all duration-200 shrink-0 mt-0.5">
                    <contact.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <span
                    className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed pt-1.5"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                    dangerouslySetInnerHTML={{ __html: contact.title }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>

        <Hr />

        {/* Map */}
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1492.045251743784!2d87.292253571873!3d26.792788669879336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1719406732980!5m2!1sen!2snp"
          loading="lazy"
          className="w-full h-[250px] sm:h-[400px] rounded-2xl border border-border xl:grayscale-[40%] hover:grayscale-0 transition-all duration-300 animate-fade-in delay-500"
        />

        <Hr />

        {/* FAQs */}
        <div className="w-full flex flex-col items-center">
          <FAQs faqs={FAQS} />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
