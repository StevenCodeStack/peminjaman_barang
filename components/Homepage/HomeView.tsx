import Image from "next/image";
import React from "react";
import HomeImg from "../../public/images/homepage_img.png";

const HomeView = () => {
  return (
    <div
      id="home"
      className="paddingLayout !pt-20 flex flex-col-reverse lg:flex-row justify-center items-center min-h-[90vh] md:gap-5 lg:gap-0"
    >
      <div className="max-w-15/16 lg:max-w-[60%] xl:max-w-[50%] flex flex-col items-center lg:items-start text-center lg:text-start">
        <h1 className="font-rubik text-[30px] md:text-5xl leading-11 md:leading-12 text-black text-shadow-lg tracking-tighter">
          MAKE YOUR LIFE <span className="text-primary-hover">EASIER</span> WITH
          SHARE
          <span className="text-primary-hover">IT</span>
        </h1>
        <p className="text-black font-semibold text-lg w-7/12">
          Why buy when you can borrow? Got the tech you need today!
        </p>
        <div className="flex gap-5 md:gap-10 my-5 text-lg md:text-xl">
          <button className="px-3 md:px-7 py-3 border-2 border-black">
            Get Started
          </button>
          <button className="px-3 md:px-7 py-3 border-2 border-black bg-primary hover:bg-primary-hover transition-all">
            Contact Us
          </button>
        </div>
      </div>
      <div className="relative flex-grow min-h-20 sm:min-h-50 w-full lg:w-fit lg:min-h-90">
        <Image src={HomeImg} alt="" className="object-contain" fill />
      </div>
    </div>
  );
};

export default HomeView;
