import Image from "next/image";
import React from "react";
import ContactImg from "../../public/images/contact_img.png";

const ContactView = () => {
  return (
    <div
      id="contact"
      className="py-20 px-10 md:px-30 xl:px-50 flex flex-col-reverse lg:flex-row justify-center items-center gap-5"
    >
      <form
        action=""
        className="flex flex-col gap-4 w-full lg:max-w-[60%] mt-5 px-10 lg:px-0"
      >
        <h1 className="text-center lg:text-start text-3xl font-extrabold text-black">
          Need Help? Get in Touch!
        </h1>
        <div className="max-w-130 w-full">
          <p className="">Tell us the problem</p>
          <textarea
            name="data"
            className="w-full resize-none rounded-2xl bg-slate-200 h-40 p-1 px-2 hideScrollbar mt-2"
          ></textarea>
          <button className="self-start px-4 py-1 bg-primary text-black font-semibold rounded mt-3">
            Submit
          </button>
        </div>
      </form>

      <div className="relative aspect-[4/3] max-w-100 w-full">
        <Image src={ContactImg} fill alt="" />
      </div>
    </div>
  );
};

export default ContactView;
