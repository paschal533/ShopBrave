import React, { useEffect, useState } from "react";
import Header from "../components/NavBar";
import styles from "../styles/style";
import Loader from "../components/layout/Loader";
import { useRouter } from "next/router";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state: any) => state.user);
  const [active, setActive] = useState(1);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[335px] mt-10 sticky 800px:mt-0 ">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <div className="mt-10 w-full flex-1">
              <ProfileContent active={active} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
