import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import styles from "../styles/Form.module.css";
import { registerValidate } from "../lib/validate";
import { server } from "@/server";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const SignUp = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });

  const onSubmit = async (values: any) => {
    toast.info("Creating user...");
    axios
      .post(
        `${server}/user/create-user`,
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      )
      .then((res: any) => {
        toast.success(res.data.message);
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden h-[100vh] bg-[#0F282F] justify-start p-12 `}
    >
      <section className="justify-center w-full flex items-center align-middle">
        <div className="w-[500px]">
          {/* form */}
          <h1 className="text-white text-center text-xl font-bold">Sign Up</h1>
          <p className="text-white text-center text-md mb-6 font-light">
            Enter your information to create your account
          </p>
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <div
              className={`${styles.input_group} ${
                formik.errors.username && formik.touched.username
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type="text"
                //@ts-ignore
                name="Username"
                placeholder="Username"
                className={styles.input_text}
                {...formik.getFieldProps("username")}
              />
              <span className="icon flex items-center px-4">
                <HiOutlineUser size={25} />
              </span>
            </div>
            {formik.errors.username && formik.touched.username ? (
              <span className="text-rose-500">{formik.errors.username}</span>
            ) : (
              <></>
            )}
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
                type={`${show.password ? "text" : "password"}`}
                //@ts-ignore
                name="password"
                placeholder="password"
                className={styles.input_text}
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <span className="text-rose-500">{formik.errors.password}</span>
            ) : (
              <></>
            )}

            <div
              className={`${styles.input_group} ${
                formik.errors.cpassword && formik.touched.cpassword
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <input
                type={`${show.cpassword ? "text" : "password"}`}
                //@ts-ignore
                name="cpassword"
                placeholder="Confirm Password"
                className={styles.input_text}
                {...formik.getFieldProps("cpassword")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {formik.errors.cpassword && formik.touched.cpassword ? (
              <span className="text-rose-500">{formik.errors.cpassword}</span>
            ) : (
              <></>
            )}

            {formik.errors.password && formik.touched.password ? (
              <span className="text-rose-500">{formik.errors.password}</span>
            ) : (
              <></>
            )}
            {/* login buttons */}
            <div className="input-button">
              <button type="submit" className={styles.button}>
                Sign up
              </button>
            </div>
            <div className="flex text-white justify-between w-full">
              <p>Already have an account?</p>
              <Link className="underline underline-offset-1" href="/login">
                Login
              </Link>
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

export default SignUp;
