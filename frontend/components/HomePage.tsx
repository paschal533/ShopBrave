import BestDeal from "./BestDeal";
import Brands from "./Brands";
import Category from "./Category";
import NewProduct from "./NewProduct";
import Services from "./Services";
import TopSelling from "./TopSelling";

const HomePage = () => {
  return (
    <div className=" w-full justify-center flex">
      <div className="max-w-[1200px] w-full">
        <Category />
        <TopSelling />
        <NewProduct />
        <BestDeal />
      </div>
    </div>
  );
};

export default HomePage;
