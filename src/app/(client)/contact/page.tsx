import { IoLocationOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { PiPhoneThin } from "react-icons/pi";
import Link from "next/link";
import ContactForm from "./_components/contact-form";

const CONTACTS = [
  {
    icon: IoLocationOutline,
    title: "1734 Sanfransico, CA 93063",
    href: "",
  },
  {
    icon: CiMail,
    title: "someone@gmail.com",
    href: "mailto:someone@gmail.com",
  },
  {
    icon: PiPhoneThin,
    title: "+1 (987) 4587 899",
    href: "tel:+1 (987) 4587 899",
  },
];

const ContactPage = () => {
  return (
    <>
      <div className="md:mt-12 xl:mt-20">
        <div className="wrapper mx-auto max-w-screen-lg py-5 lg:py-8">
          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl ">
            Contact
          </h1>
          <div className="text-center">
            <p className="text-lg opacity-80">We are a here to help.</p>
          </div>
          <hr className="opacity-50" />
          <div className="grid mt-10 md:grid-cols-2 gap-6">
            <div className="md:my-10">
              <h2 className="text-2xl font-semibold">ACES</h2>
              <p className="max-w-sm mt-5 opacity-80">
                Have something to say? We are here to help. Fill up the form or
                send email or call phone. We will get back to you as soon as
                possible.
              </p>
              <div className="mt-5 opacity-80">
                {CONTACTS.map((contact, index) => (
                  <Link
                    href={contact.href}
                    key={index}
                    className="flex items-center mt-2 space-x-2 text-500 hover:text-blue-500 transition-colors"
                  >
                    <contact.icon className="text-xl" />
                    <span>{contact.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="sm:mt-10">
              <ContactForm />
            </div>
          </div>
          <hr className="my-9" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1492.045251743784!2d87.292253571873!3d26.792788669879336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1719406732980!5m2!1sen!2snp"
            loading="lazy"
            className="w-full h-[250px] sm:h-[400px] rounded-md border-none outline-none xl:grayscale-[40%] hover:grayscale-0 transition-colors"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
