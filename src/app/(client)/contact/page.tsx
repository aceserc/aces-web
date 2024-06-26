import { IoMailOpenOutline } from "react-icons/io5";
import { PiPhoneLight } from "react-icons/pi";
import ContactForm from "./_components/contact-form";
import contactBlob from "@/assets/svg/contact-blog.svg";
import Image from "next/image";
const ContactPage = () => {
  return (
    <>
      <section className="wrapper pt-16 md:pt-28 flex flex-col items-center justify-center gap-16">
        <div className="flex gap-8 flex-col items-center w-full">
          <ContactForm />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1492.045251743784!2d87.292253571873!3d26.792788669879336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1719406732980!5m2!1sen!2snp"
          loading="lazy"
          className="w-full wrapper rounded-xl !max-w-4xl h-[250px] sm:h-[400px]"
        ></iframe>
      </section>
      <Image
        src={contactBlob}
        alt="Contact us"
        className="absolute top-12 right-0 h-screen opacity-0 md:opacity-100 -z-10 max-h-[700px] lg:max-h-[1000px] max-xl:w-fit"
      />
    </>
  );
};

export default ContactPage;
