import images from "../assets";
import Image from "next/image";

const Services = () => {
  return (
    <div className=" justify-center mb-8 pb-8 align-middle items-center flex">
      <div className="   max-w-[1200px]  mt-6 w-full  flex flex-col">
        <h1 className="mt-6 text-4xl font-bold text-[#0F282F]">
          Services To Help You Shop
        </h1>
        <div className="mt-4 flex space-x-4  flex-wrap w-full">
          {[images.faq1, images.faq2, images.faq3].map((item, index) => (
            <div
              key={index}
              className="w-[380px] drop-shadow-xl mt-4 cursor-pointer rounded-md"
            >
              <Image src={item} alt="deal-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
