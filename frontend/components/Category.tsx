import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import images from "../assets";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation, Pagination, Scrollbar } from "swiper";

const Card = ({ image, title }: any) => {
  return (
    <div className="cursor-pointer w-[300px] rounded-md mb-8 bg-[#f7eded] drop-shadow-xl">
      <Image src={image} alt="card" height={400} />
      <p className="text-center mt-2 hover:scale-110 ease-out duration-300 font-semibold">
        {title}
      </p>
    </div>
  );
};

const CategoryObject = [
  { image: images.gadgets, title: "Gadgets" },
  { image: images.furniture, title: "Furnitures" },
  { image: images.books, title: "Books" },
  { image: images.shoes, title: "Shoes" },
  { image: images.clothes, title: "Clothes" },
  { image: images.utensile, title: "Utensiles" },
  { image: images.gadgets, title: "Gadgets" },
  { image: images.furniture, title: "Furnitures" },
  { image: images.books, title: "Books" },
  { image: images.shoes, title: "Shoes" },
  { image: images.clothes, title: "Clothes" },
  { image: images.utensile, title: "Utensiles" },
];

const Category = () => {
  return (
    <div className="text-[#0F282F] mt-[520px] justify-center w-full align-middle items-center flex">
      <div className="   w-full justify-center items-center">
        <div className="text-[#0F282F] flex justify-between w-full">
          <h1 className="font-bold text-3xl">Our Top Categories </h1>
          <p className="flex text-center hover:scale-110 font-bold ease-out duration-300 cursor-pointer text-md">
            See All Items{" "}
            <span className="mt-1 ml-3">
              <FiArrowRight />
            </span>
          </p>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          scrollbar={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[FreeMode, Pagination, Scrollbar, Navigation]}
          className="mySwiper mt-4 space-x-3"
        >
          {CategoryObject.map((item, index) => (
            <SwiperSlide key={index}>
              <Card image={item.image} title={item.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
