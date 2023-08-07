import Image from "next/image";
import { BsFillHandbagFill } from "react-icons/bs";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

const ItemCard = ({ image, title, price, rating, decs }: any) => {
  const [click, setClick] = useState(false);
  const removeFromWishlistHandler = (data: any) => {
    setClick(!click);
    //dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data: any) => {
    setClick(!click);
    //dispatch(addToWishlist(data));
  };
  return (
    <div className="w-[290px] text-[#0F282F] p-2 pb-4 rounded-md mb-8 bg-[#f9f9f9] drop-shadow-xl">
      <Image src={image} alt="card-image" />
      <div className="w-7 h-7 justify-center font-bold drop-shadow-xl items-center flex rounded-full absolute right-4 top-5 bg-white">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer"
            onClick={() => removeFromWishlistHandler("")}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer"
            onClick={() => addToWishlistHandler("")}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
      </div>
      <div className="w-full font-bold text-md mt-4 justify-between items-center align-middle flex">
        <p>{title}</p>
        <p>${price}.00</p>
      </div>
      <p className="mt-4 font-semibold text-md text-[#17343c]">{decs}</p>
      <div className="w-full  items-center align-middle flex">
        <ReactStars
          count={5}
          size={24}
          activeColor="#ffd700"
          color="#ffd700"
          value={5}
        />
        ({rating})
      </div>
      <Link href={`/product/${rating}`}>
        <button
          onClick={() => {}}
          className="shadow-lg mt-4 font-bold text-md hover:scale-110 text-[#0F282F] ease-out duration-300 shadow-indigo-500/40 border-[#0F282F] border-2 p-1 flex justify-center space-x-2 items-center text-center rounded-xl"
        >
          <BsFillHandbagFill /> <span className="ml-2">Shop Now</span>
        </button>
      </Link>
    </div>
  );
};

export default ItemCard;
