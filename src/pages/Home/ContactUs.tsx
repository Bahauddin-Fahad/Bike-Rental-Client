import { BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import ContactForm from "../../components/form/ContactForm";
const ContactUs = () => {
  return (
    <div
      id="contact"
      className="custom-margin grid grid-cols-1 xl:grid-cols-2 items-center justify-between gap-5 xl:gap-12 bg-secondary dark:bg-primary rounded-2xl xl:rounded-[40px] p-8 xl:p-[80px] shadow"
    >
      <div className="space-y-4 xl:space-y-[20px] max-w-md">
        <h1 className="font-vietnam text-[20px] xl:text-[30px] 2xl:text-[40px] xl:leading-[48px] tracking-tight">
          Contact Us for any kind of Query
        </h1>
        <p className="font-satoshi text-xs xl:text-base xl:leading-[28px]">
          We&apos;d love to hear from you! Reach out to us with any questions,
          feedback, or inquiries, and we will be happy to assist you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xl:gap-5 text-white">
          <div className="flex flex-col items-center gap-2 p-3 xl:p-5 rounded-xl xl:rounded-2xl bg-accent border-2 border-white xl:rounded-tl-[35px] xl:rounded-br-[35px] xl:rounded-tr-[10px] xl:rounded-bl-[10px]">
            <BsFillPersonFill className="size-5 xl:size-8" />
            <h2 className="font-satoshi font-semibold text-xs xl:text-md">
              RideOn Rentals
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 xl:p-5 rounded-xl xl:rounded-2xl bg-accent xl:bg-[#27ae60] border-2 border-white xl:rounded-tl-[35px] xl:rounded-br-[35px] xl:rounded-tr-[10px] xl:rounded-bl-[10px]">
            <BsTelephoneFill className="size-5 xl:size-8" />
            <h2 className="font-satoshi font-semibold text-xs xl:text-md">
              +880 1812345678
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 xl:p-5 rounded-xl xl:rounded-2xl bg-accent xl:bg-[#27ae60] border-2 border-white xl:rounded-tl-[35px] xl:rounded-br-[35px] xl:rounded-tr-[10px] xl:rounded-bl-[10px]">
            <MdEmail className="size-5 xl:size-8" />
            <h2 className="font-satoshi font-semibold text-xs xl:text-md">
              rideon.rentals@gmail.com
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 p-3 xl:p-5 rounded-xl xl:rounded-2xl bg-accent border-2 border-white xl:rounded-tl-[35px] xl:rounded-br-[35px] xl:rounded-tr-[10px] xl:rounded-bl-[10px]">
            <MdLocationPin className="size-5 xl:size-8" />
            <h2 className="font-satoshi font-semibold text-xs xl:text-md text-center">
              Chattogram, BD
            </h2>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default ContactUs;
