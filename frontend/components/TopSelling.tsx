import { FiArrowRight } from "react-icons/fi";
import ItemCard from "./ItemCard";
import images from "../assets";

const TopObject = [
  {
    image: images.earpod,
    title: "Earpod",
    decs: "5 Colours Available ",
    rating: "130",
    price: "90",
  },
  {
    image: images.insta,
    title: "Furnitures",
    decs: "Colours - Gold - Black ",
    rating: "100",
    price: "110",
  },
  {
    image: images.totebag,
    title: "Books",
    decs: "Full grain leather",
    rating: "90",
    price: "70",
  },
  {
    image: images.igba,
    title: "Shoes",
    decs: "3 Versions ",
    rating: "110",
    price: "90",
  },
];

const TopSelling = () => {
  return (
    <div className="mt-4">
      <div className="text-[#0F282F] flex justify-between w-full">
        <h1 className="font-bold text-3xl">Top Selling Items</h1>
        <p className="flex text-center hover:scale-110 font-bold ease-out duration-300 cursor-pointer text-md">
          See All Items{" "}
          <span className="mt-1 ml-3">
            <FiArrowRight />
          </span>
        </p>
      </div>

      <div className="flex mt-4 space-x-3 flex-wrap justify-center w-full">
        {TopObject.map((item, index) => (
          <ItemCard
            key={index}
            title={item.title}
            image={item.image}
            decs={item.decs}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
