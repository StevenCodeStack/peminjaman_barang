import Image from "next/image";
import React from "react";
import AboutImg from "../../public/images/about_img.png";

const AboutView = () => {
  return (
    <div className="paddingLayout flex flex-col lg:flex-row justify-center items-center md:gap-10 bg-black">
      <div className="relative flex-grow aspect-[4/3] h-80 lg:aspect-auto lg:h-[500px]">
        <Image src={AboutImg} fill alt="asd123" className="object-contain" />
      </div>
      <div className="flex-grow max-h-1/2 lg:max-w-1/2 mt-5">
        <h1 className="font-rubik text-4xl text-white">
          ABOUT<span className="text-primary">US</span>
        </h1>
        <p className="text-[#9AA1A3] mt-1">
          &quot;ShareIT is a reliable borrowing platform that makes accessing
          electronics easy and hassle-free. We ensure a smooth borrowing
          experience with a focus on security and convenience&quot;
        </p>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 text-white py-5">
          <div className="flex items-center gap-2">
            <h1 className="text-7xl font-rubik">1</h1>
            <p className="italic font-light text-xl">Simple and Secure</p>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-7xl font-rubik">2</h1>
            <p className="italic font-light text-xl">
              Reliable for all Members
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-7xl font-rubik">3</h1>
            <p className="italic font-light text-xl">Fast and Easy Process</p>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-7xl font-rubik">4</h1>
            <p className="italic font-light text-xl">
              Borrow only what you need when you need it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
