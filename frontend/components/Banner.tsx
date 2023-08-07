import Image from "next/image";
import BannerImage from "../assets/bannerImage.png";
import { useRouter } from "next/router";
import ButtonGroup from "./ButtonGroup";
import { RiHandbagLine } from "react-icons/ri";

const Banner = () => {
  const router = useRouter();
  return (
    <div className="bg-[#B8D8E0] text-[#0F282F] w-full mt-16 h-[420px] absolute justify-center align-middle items-center flex">
      <div className="   max-w-[1200px]  mt-6 w-full h-[420px] justify-between items-center flex">
        <div className="justify-between items-center flex flex-row">
          <div className=" space-y-6 w-3/5">
            <h1 className="text-6xl font-poppins font-extrabold">
              Your Amazing Online Shopping Mall
            </h1>
            <p className="text-xl font-md">
              Multi-Vendor Ecommerce Dapp like no other, Buy and sell your
              products easily using Flow token and wallet, no limits on what you
              can do.
            </p>
            <div className="">
              <ButtonGroup
                btnName="Shop now"
                handleClick={() => router.push("/products")}
                icon={<RiHandbagLine />}
              />
            </div>
          </div>
          <div className="right-4 bottom-0">
            <Image src={BannerImage} height={435} alt="banner-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
