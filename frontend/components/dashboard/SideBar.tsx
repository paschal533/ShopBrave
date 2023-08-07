import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { BsChatLeftText, BsCart3 } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";

const SideBar = ({ logoutHandler, setCurrentItem, currentItem }: any) => {
  const options = [
    { name: "Dashboard", icon: AiOutlineUser },
    { name: "My Products", icon: AiOutlineUser },
    { name: "Chat", icon: BsChatLeftText },
    { name: "Upload", icon: FaUpload },
    { name: "Orders", icon: BsCart3 },
    { name: "Customers", icon: BsCart3 },
    { name: "Payments", icon: BsCart3 },
    { name: "Drafts", icon: BsCart3 },
  ];
  return (
    <div className="bg-[#0F282F] fixed w-[15rem] h-[100vh] p-4">
      <h1 className="text-xl font-bold">ShopBrave</h1>

      <div className="mt-16 space-y-2">
        {options.map((item, index) => (
          <div
            onClick={() => setCurrentItem(item.name.toLowerCase())}
            className={`${
              currentItem === item.name.toLowerCase()
                ? "text-[#0F282F] bg-white p-2 rounded-md"
                : ""
            } w-full cursor-pointer text-lg font-bold align-middle flex`}
            key={index}
          >
            <item.icon className="mr-4 mt-1" /> {item.name}
          </div>
        ))}
      </div>

      <div className="bottom-4 absolute left-4">
        <button
          className="p-2 bg-white text-[#0F282F] rounded-md flex space-x-2 justify-center text-center items-center align-middle w-40"
          onClick={logoutHandler}
        >
          <AiOutlineLogout size={20} className="mr-2" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
