import images from "../assets";
import Image from "next/image";

const BrandObject = [
  { image: images.bevmo, title: "Bevmo", decs: "Delivery within 24 hours" },
  {
    image: images.stone,
    title: "Mollie Stones",
    decs: "Delivery within 24 hours",
  },
  { image: images.tesla, title: "Tesla", decs: "Delivery within 24 hours" },
  { image: images.sprout, title: "Sprouts", decs: "Delivery within 24 hours" },
  { image: images.apple, title: "Apple", decs: "Delivery within 24 hours" },
  { image: images.staple, title: "Staples", decs: "Delivery within 24 hours" },
  { image: images.hp, title: "HP", decs: "Delivery within 24 hours" },
  { image: images.dior, title: "Dior", decs: "Delivery within 24 hours" },
];

const Brands = () => {
  return (
    <div className="bg-[#ebf4f6] text-[#0F282F] justify-center mt-8 mb-8 pb-16 align-middle items-center flex">
      <div className="   max-w-[1200px]  mt-6 w-full justify-between items-center flex flex-col">
        <h1 className="mt-6 text-4xl font-bold">Choose By Brand</h1>
        <div className="mt-4 flex  flex-wrap w-full">
          {BrandObject.map((item, index) => (
            <div
              key={index}
              className="w-[285px] mt-3 ml-3 drop-shadow-xl bg-[#fff] p-2 flex justify-center items-center cursor-pointer rounded-md"
            >
              <Image src={item.image} height={90} alt="deal-image" />
              <div className="ml-2">
                <h1 className="text-xl font-bold">{item.title}</h1>
                <p className="">{item.decs}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
