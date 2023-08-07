import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";
import GoogleLogo from "../assets/google.svg";
import GithubLogo from "../assets/github.svg";
import Image from "next/image";
import styles from "../styles/Form.module.css";
import Link from "next/link";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: any) => {
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      )
      .then((res: any) => {
        toast.success("Login Success!");
        window.location.reload();
        router.push("/");
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "https://shopbrave.netlify.app/login-user" });
  }

  // Github Login
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "https://shopbrave.netlify.app/login-user" });
  }

  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden bg-[#0F282F] justify-start  h-[100vh] p-12 `}
    >
      <section className="justify-center w-full flex items-center align-middle">
        <div className="w-[500px]">
          {/* form */}
          <h1 className="text-white text-center text-xl font-bold">
            Hi, Welcome Back!
          </h1>
          <p className="text-white text-center text-md mb-6 font-light">
            Login to your account
          </p>
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="email"
                //@ts-ignore
                name="email"
                placeholder="Email"
                className={styles.input_text}
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <span className="text-rose-500">{formik.errors.email}</span>
            ) : (
              <></>
            )}

            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type={`${show ? "text" : "password"}`}
                //@ts-ignore
                name="password"
                placeholder="password"
                className={styles.input_text}
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
            {/* login buttons */}
            <div className="input-button">
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
            <div className="flex text-white justify-between w-full">
              <p>Don’t have an account yet?</p>
              <Link className="underline underline-offset-1" href="/signup">
                Create account
              </Link>
            </div>
            <p className="w-full text-center text-white font-light">Or</p>
            <div className="input-button">
              <button
                type="button"
                onClick={handleGoogleSignin}
                className={`bg-white rounded-lg text-[#0F282F] ${styles.button_custom}`}
              >
                Sign In with Google{" "}
                <Image
                  alt="googlrlogo"
                  src={GoogleLogo}
                  width="20"
                  height={20}
                ></Image>
              </button>
            </div>
            <div className="input-button">
              <button
                type="button"
                onClick={handleGithubSignin}
                className={`bg-[#B8D8E0] text-[#0F282F] rounded-lg ${styles.button_custom}`}
              >
                Sign In with Github{" "}
                <Image
                  alt="githublogo"
                  src={GithubLogo}
                  width={25}
                  height={25}
                ></Image>
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className="absolute w-48 h-48  rounded-full -top-9 -left-16 -z-5  bg-[#B8D8E0]" />
      <div className="absolute w-72 h-72  rounded-full -bottom-24 -right-14 -z-5 bg-[#B8D8E0]" />
      <div className="absolute w-20 h-20  rounded-full top-20 left-40 -z-5  bg-[#B8D8E0]" />
      <div className="absolute w-20 h-20  rounded-full bottom-28 right-56 -z-5 bg-[#B8D8E0]" />
    </div>
  );
};

export default Login;
