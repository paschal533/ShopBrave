import { Footer, NavBar } from "@/components";
import images from "../../assets";
import Image from "next/image";
import { useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillHandbagFill } from "react-icons/bs";
import { ItemCard } from "@/components";
import Link from "next/link";

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(images.product1);
  const [selectedColor, setSelectedColor] = useState("#204e5b");
  const [selectedItem, setSelectedItem] = useState("Key Features");
  const [quantity, setQuantity] = useState(0);

  const letter =
    "Octa-Core JR510 (4 x 2.0 GHz + 4 x 1.5 GHz) processor, Mali-G52 GPU 4GB RAM with 64GB internal storage, expandable memory up to 1TB with microSD Android 11 with MIUI 13 for POCO Dual SIM (nano + nano + microSD) 13MP rear primary camera with f/1.8 aperture, 2MP depth sensor with f/2.4 aperture 5MP front camera Rear-mounted fingerprint sensor 3.5mm audio j";

  const TopObject = [
    {
      image: images.shopimage6,
      title: "Samsung",
      decs: "5 Colours Available ",
      rating: "130",
      price: "90",
    },
    {
      image: images.shopimage7,
      title: "Tecno",
      decs: "Colours - Gold - Black ",
      rating: "100",
      price: "110",
    },
    {
      image: images.shopimage8,
      title: "Iphone 9",
      decs: "Full grain leather",
      rating: "90",
      price: "70",
    },
    {
      image: images.shopimage9,
      title: "Novia",
      decs: "3 Versions ",
      rating: "110",
      price: "90",
    },
  ];

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <NavBar />
      <div className=" justify-center text-[#0F282F] mb-8 pb-8 align-middle items-center flex">
        <div className="max-w-[1200px]  mt-28 w-full  flex flex-col">
          <div className="w-full flex flex-wrap">
            <div className="w-1/2">
              <Image
                src={selectedImage}
                className="drop-shadow-xl"
                alt="product-image"
              />
              <div className="w-full flex mt-4 space-x-2">
                {[
                  images.product1,
                  images.product2,
                  images.product3,
                  images.product4,
                ].map((item, index) => (
                  <div
                    className={`${
                      selectedImage === item
                        ? "border-[2px] rounded-md border-[#0F282F]"
                        : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedImage(item)}
                  >
                    <Image src={item} alt="product-review" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 pl-8">
              <h1 className="text-3xl font-bold mb-2">Iphone 8 Pro Max</h1>
              <p>
                Korem ipsum dolor sit amet, consectetur Korem ipsum dolor sit
                amet, consectetur adipiscing elit.adipiscing elit.
              </p>
              <div className="w-full  items-center align-middle flex">
                <ReactStars
                  count={5}
                  size={30}
                  activeColor="#ffd700"
                  color="#ffd700"
                  value={5}
                />
                (110)
              </div>
              <div className="h-[1px] mt-4 rounded-md bg-[#204e5b] w-full" />
              <h1 className="text-3xl mt-4 font-bold mb-2">$130.00</h1>
              <p>tur Korem ipsum dolor sit amet, consectetur adipiscit.</p>
              <div className="h-[1px] mt-4 rounded-md bg-[#204e5b] w-full" />
              <h1 className="text-3xl mt-4 font-semibold mb-2">
                Choose a Colour
              </h1>
              <div className="flex w-full mt-4 space-x-3">
                {["#204e5b", "#000000", "#EF9C79", "#1877F2", "#D22ECC"].map(
                  (item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedColor(item)}
                      className={`h-10 w-10 rounded-full bg-[${item}] ${
                        selectedColor === item
                          ? "border-[2px] rounded-full border-[#0F282F]"
                          : ""
                      }`}
                    ></div>
                  )
                )}
              </div>
              <div className="h-[1px] mt-4 rounded-md bg-[#204e5b] w-full" />
              <div className="flex mt-6 text-center">
                <div className="flex">
                  <button
                    onClick={increment}
                    className="w-10 border-r-0 rounded-l-xl border-[2px] border-[#0F282F] h-10 text-center"
                  >
                    +
                  </button>
                  <div className="text-center pt-1 border-[2px] border-[#0F282F] h-10 w-10">
                    {quantity}
                  </div>
                  <button
                    onClick={decrement}
                    className="w-10 border-l-0 rounded-r-xl h-10 border-[2px] border-[#0F282F] text-center"
                  >
                    -
                  </button>
                </div>
                <p className="text-center font-semibold text-lg ml-3">
                  Only 14 Items left! Don’t miss it
                </p>
              </div>
              <div className="mt-4 flex">
                <button
                  onClick={() => {}}
                  className="shadow-lg mt-4 w-40 font-bold h-14 text-md hover:scale-110 text-[#0F282F] ease-out duration-300 shadow-indigo-500/40 border-[#0F282F] border-2 p-1 flex justify-center space-x-2 items-center text-center rounded-xl"
                >
                  <AiOutlineShoppingCart size={25} />
                  <span className="ml-2">Add to Cart</span>
                </button>
                <Link href="/checkout">
                  <button className="shadow-lg mt-4 w-40 font-bold h-14 text-md hover:scale-110 text-[#fff] bg-[#0F282F] ml-3 ease-out duration-300 shadow-indigo-500/40 border-[#0F282F] border-2 p-1 flex justify-center space-x-2 items-center text-center rounded-xl">
                    <BsFillHandbagFill /> <span className="ml-2">Shop Now</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full mt-8 space-x-3 flex">
            <div className=" p-4 rounded-md border-[1px] border-[#57a0b2] flex-1">
              <div className="w-full flex justify-between">
                {["Product Details", "Key Features", "Specification"].map(
                  (item, index) => (
                    <div key={index}>
                      <h1
                        onClick={() => setSelectedItem(item)}
                        className={`font-bold text-2xl cursor-pointer ${
                          selectedItem === item ? "" : ""
                        }`}
                      >
                        {item}
                      </h1>
                      <div
                        className={`${
                          selectedItem === item
                            ? "h-[4px] absolute w-[150px] mt-[10px] bg-[#0F282F]"
                            : ""
                        }`}
                      />
                    </div>
                  )
                )}
              </div>
              <div className="h-[4px] w-full mt-[10px] bg-[#c5dde3]" />
              <div className="w-full h-[300px] mt-8 drop-shadow-xl rounded-md border-[1px] border-[#57a0b2] ">
                <h1 className="text-2xl font-bold p-4">
                  {selectedItem === "Key Features"
                    ? "Key Features"
                    : selectedItem === "Product Details"
                    ? "Product Details"
                    : "Specification"}
                </h1>
                <div className="h-[1px] w-full mt-[4px] bg-[#57a0b2]" />
                <p className="p-4">
                  {selectedItem === "Key Features"
                    ? letter
                    : selectedItem === "Product Details"
                    ? letter
                    : letter}
                </p>
              </div>
            </div>
            <div className=" drop-shadow-xl rounded-md border-[1px] border-[#57a0b2] w-80">
              <h1 className="p-4 text-2xl font-bold">Seller’s Information</h1>
              <div className="h-[1px] w-full mt-[4px] bg-[#57a0b2]" />
              <p className="pl-4 pr-4 mt-2 mb-2">Apple 94%Seller Score</p>
              <h1 className="p-4 text-xl font-bold">Seller Performance</h1>
              <p className="pl-4 pr-4 mt-1">
                Order Fulfillment Rate: Excellent
              </p>
              <p className="pl-4 pr-4 mt-1">Quality Score: Excellent</p>
              <p className="pl-4 pr-4 mt-1">Customer Rating: Good</p>
              <h1 className="pl-4 pr-4 mt-2 font-bold text-lg">
                Chat With Seller?
              </h1>
              <p className="pl-4 pr-4 mt-2 font-bold cursor-pointer text-md ">
                Click here to chat with seller
              </p>
              <div className="h-[1px] w-full mt-[6px] bg-[#57a0b2]" />
              <h1 className="pl-4 pr-4 mt-2 text-lg font-bold">
                Have Something To Sell?
              </h1>
              <h1 className="pl-4 pr-4 mt-2 text-md font-bold">
                Click here to list your product
              </h1>
            </div>
          </div>
          <div className="mt-16">
            <div className="text-[#0F282F] flex justify-between w-full">
              <h1 className="font-bold text-3xl">
                People Who Viewed This Also Viewed{" "}
              </h1>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
