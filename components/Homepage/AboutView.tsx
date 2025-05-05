import Image from "next/image";
import React from "react";
import AboutImg from "../../public/images/about_img.png";

const AboutView = () => {
  return (
    <div className="paddingLayout !py-20 flex flex-col lg:flex-row justify-center items-center md:gap-10 lg:gap-10 bg-black">
      <div className="relative flex-grow aspect-[4/3] h-80 lg:aspect-auto lg:h-[500px]">
        <Image src={AboutImg} fill alt="asd123" className="object-contain" />
      </div>
      <div className="flex-grow max-h-1/2 lg:max-w-1/2 mt-5">
        <h1 className="font-rubik text-5xl text-white">
          ABOUT<span className="text-primary">US</span>
        </h1>
        <p className="text-[#9AA1A3] mt-3 text-xl">
          &quot;ShareIT is a reliable borrowing platform that makes accessing
          electronics easy and hassle-free. We ensure a smooth borrowing
          experience with a focus on security and convenience&quot;
        </p>

        <div className="grid grid-cols-2 grid-rows-2 gap-5 text-white py-5 mt-1">
          <AboutCard data="Simple and Secure" number={1} />
          <AboutCard data="Reliable for all Members" number={2} />
          <AboutCard data="Fast and Easy Process" number={3} />
          <AboutCard
            data="Borrow only what you need when you need it"
            number={4}
          />
        </div>
      </div>
    </div>
  );
};

const AboutCard = ({ data, number }: { data: string; number: number }) => {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-7xl font-rubik">{number}</h1>
      <p className="italic font-light text-2xl md:text-3xl">{data}</p>
    </div>
  );
};

export default AboutView;
