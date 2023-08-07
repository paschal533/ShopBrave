import { useSession } from "next-auth/react";
import { server } from "@/server";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import styles from "../styles/Form.module.css";

const LoginUser = () => {
  const router = useRouter();
  const [successful, setSuccessful] = useState(false);
  const { isAuthenticated } = useSelector((state: any) => state.user);

  const { data: session } = useSession();

  const onSubmit = async (values: any) => {
    await axios
      .post(
        `${server}/user/login-auth-user`,
        {
          name: values.user.name,
          email: values.user.email,
          password: values.user.email,
        },
        { withCredentials: true }
      )
      .then((res: any) => {
        toast.success("Login Success!");
        setSuccessful(true);
        //window.location.reload()
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        //window.location.reload();
        router.push("/login");
      });
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleSubmit = async () => {
      if (session && successful === false) {
        await onSubmit(session);
      }
    };

    handleSubmit();
  }, [session?.user?.email, successful]);

  const handleBack = () => {
    window.location.reload();
    router.push("/");
  };

  return (
    <div
      className={`relative w-full flex flex-col text-center items-center z-0 overflow-hidden bg-[#0F282F] justify-center  h-[100vh] p-12 `}
    >
      <p className="text-4xl text-center font-bold text-white">
        Login successfully
      </p>

      <div className="input-button">
        <button
          type="button"
          onClick={handleBack}
          className={`bg-[#B8D8E0] p-2 mt-8 justify-center text-center flex align-middle items-center text-[#0F282F] rounded-lg ${styles.button_custom}`}
        >
          Back to Home page <BiArrowBack />
        </button>
      </div>
      <div className="absolute w-48 h-48  rounded-full -top-9 -left-16 -z-5  bg-[#B8D8E0]" />
      <div className="absolute w-72 h-72  rounded-full -bottom-24 -right-14 -z-5 bg-[#B8D8E0]" />
      <div className="absolute w-20 h-20  rounded-full top-20 left-40 -z-5  bg-[#B8D8E0]" />
      <div className="absolute w-20 h-20  rounded-full bottom-28 right-56 -z-5 bg-[#B8D8E0]" />
    </div>
  );
};

export default LoginUser;
