import Image from "next/image";
import images from "../assets";

const BestDeal = () => {
  return (
    <div>
      <p className="text-[#21444e] text-xl mt-4 font-semibold">
        Get Up To 50% Off
      </p>
      <h1 className="mt-4 text-[#0F282F] text-4xl font-bold">
        Today's Best Deals For You
      </h1>
      <div className="mt-4 flex flex-wrap space-x-3">
        {[images.deal1, images.deal2, images.deal3, images.deal4].map(
          (item, index) => (
            <div key={index} className="w-[290px] cursor-pointer rounded-md">
              <Image src={item} alt="deal-image" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BestDeal;
