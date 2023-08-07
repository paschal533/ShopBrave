import images from "../../assets";
import ItemCard from "../ItemCard";

const Products = () => {
  const TopObject = [
    {
      image: images.shopimage,
      title: "Iphone 7",
      decs: "5 Colours Available ",
      rating: "130",
      price: "90",
    },
    {
      image: images.shopimage1,
      title: "Iphone 8",
      decs: "Colours - Gold - Black ",
      rating: "100",
      price: "110",
    },
    {
      image: images.shopimage2,
      title: "Iphone 9",
      decs: "Full grain leather",
      rating: "90",
      price: "70",
    },
    {
      image: images.shopimage3,
      title: "Iphone 10",
      decs: "3 Versions ",
      rating: "110",
      price: "90",
    },
    {
      image: images.shopimage4,
      title: "Iphone 11",
      decs: "3 Versions ",
      rating: "150",
      price: "30",
    },
    {
      image: images.shopimage5,
      title: "Iphone 12",
      decs: "3 Versions ",
      rating: "140",
      price: "80",
    },
  ];
  return (
    <div className="w-full flex-1 rounded-md border-[1px] border-[#0F282F]">
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

export default Products;
