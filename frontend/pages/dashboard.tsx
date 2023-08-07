import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  NavBar,
  SideBar,
  Upload,
  AllProducts,
  DashboardMessages,
} from "@/components/dashboard";

const Dashboard = () => {
  const router = useRouter();
  const [currentItem, setCurrentItem] = useState("upload");
  const { isSeller, isLoading } = useSelector((state: any) => state.seller);

  useEffect(() => {
    if (!isSeller) {
      router.push("./shop-login");
    }
  }, [isSeller, isLoading]);

  const logoutHandler = () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
        router.push("./shop-login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full flex">
      <div className="w-[15rem]">
        <SideBar
          setCurrentItem={setCurrentItem}
          currentItem={currentItem}
          logoutHandler={logoutHandler}
        />
      </div>
      <div className="flex-1">
        <NavBar />
        <div className="justify-center align-middle flex items-center w-full">
          {currentItem === "upload" ? (
            <Upload />
          ) : currentItem === "my products" ? (
            <AllProducts />
          ) : currentItem === "chat" ? (
            <DashboardMessages />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
