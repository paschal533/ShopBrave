import Image from "next/image";
import images from "../assets";
import { Footer, NavBar } from "@/components";
import {
  AlsoLike,
  RecentlyView,
  SideBar,
  Products,
} from "@/components/productPage";

const ProductsPage = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full bg-[#B8D8E0]">
        <div className="h-[60px]" />
        <Image src={images.pageBanner} alt="bannerimage" />
      </div>
      <div className="justify-center mb-8 pb-4 mt-6 align-middle items-center flex">
        <div className="max-w-[1200px]  mt-6 w-full  flex flex-col">
          <div className="flex space-x-2 w-full">
            <SideBar />
            <Products />
          </div>
          <RecentlyView />
          <AlsoLike />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
