import Image from "next/image";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import images from "../../assets";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

const SideBar = () => {
  const [curretItem, setCurrentItem] = useState("Phone");
  const [searchTerm, setSearchTerm] = useState("");
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-[220px] rounded-md text-[#0F282F]  border-[1px] border-[#0F282F]">
      <div className="p-4">
        <h1 className="text-lg font-bold">Category</h1>
        <h1 className="text-md ml-2 mt-1 font-semibold">Gadgets</h1>
      </div>
      <div className="flex  w-full justify-center items-center mb-2 flex-col space-y-2">
        {["Laptop", "Phone", "Airpod", "Headphone"].map((item, index) => (
          <div
            key={index}
            className={`text-center cursor-pointer text-md font-medium ${
              curretItem === item ? "bg-[#0F282F] w-full text-white p-2" : ""
            }`}
            onClick={() => setCurrentItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-[#0F282F]" />
      <div className="p-4">
        <h1 className="text-lg font-bold">Brand</h1>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            //onChange={handleSearchChange}
            className="h-[40px] bg-[#B8D8E0] w-full px-4 rounded-l-2xl outline-none"
          />
          <div className="bg-[#0F282F] text-white rounded-r-2xl w-[70px] justify-center flex align-middle text-center items-center">
            <AiOutlineSearch size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex w-full justify-center items-center mb-2 mt-2 flex-col space-y-2">
          <div className="space-y-2">
            {["Apple", "Samsung", "Infinix", "Tecno", "Nokia"].map(
              (item, index) => (
                <div key={index} className={`font-semibold text-md`}>
                  <input type="checkbox" id={item} name={item} value={item} />
                  <label className="ml-2">{item}</label>
                  <br></br>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#0F282F]" />
      <div className="p-4 h-32">
        <h1 className="text-lg mb-4 font-bold">Price ($)</h1>
        <Slider
          id="slider"
          defaultValue={1000}
          min={0}
          max={10000}
          colorScheme="blue"
          size="lg"
          onChange={(v) => setSliderValue(v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`$${sliderValue}`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </div>
      {/*<div className="w-full mb-4 pl-4 pr-4 flex justify-between">
        <button
          onClick={() => {}}
          className="shadow-lg w-[70px] font-bold text-md hover:scale-110 text-[#0F282F] ease-out duration-300 shadow-indigo-500/40 border-[#0F282F] border-[1px] p-1 flex justify-center space-x-2 items-center text-center rounded-xl"
        >
          1000
        </button>
        <span className="text-center">-</span>
        <button
          onClick={() => {}}
          className="shadow-lg w-[70px] font-bold text-md hover:scale-110 text-[#0F282F] ease-out duration-300 shadow-indigo-500/40 border-[#0F282F] border-[1px] p-1 flex justify-center space-x-2 items-center text-center rounded-xl"
        >
          10000
        </button>
      </div>*/}
      <div className="w-full h-[1px] bg-[#0F282F]" />
      <div className="p-4">
        <h1 className="text-lg mb-2 font-bold">Product Rating</h1>
        <div className="flex w-full justify-center items-center mb-2 mt-2 flex-col space-y-2">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((item, index) => (
              <div key={index} className={`font-semibold flex text-md`}>
                <input type="checkbox" id={`${item}`} value={item} />
                <label className="ml-2">
                  <div className="w-full  items-center align-middle flex">
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      color="#B8D8E0"
                      value={item}
                    />
                    & Above
                  </div>
                </label>
                <br></br>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
