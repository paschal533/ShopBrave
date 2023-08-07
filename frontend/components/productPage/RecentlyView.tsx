import images from "../../assets";
import ItemCard from "../ItemCard";

const RecentlyView = () => {
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

  return (
    <div className="mt-16">
      <div className="text-[#0F282F] flex justify-between w-full">
        <h1 className="font-bold text-3xl">You Recently Viewed</h1>
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

export default RecentlyView;
