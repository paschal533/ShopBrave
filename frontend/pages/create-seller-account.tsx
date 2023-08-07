import { NavBar } from "@/components";
import { useState } from "react";
import {
  TbSquareRoundedNumber1,
  TbSquareRoundedNumber2,
  TbSquareRoundedNumber3,
} from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  PersonalInfo,
  BusinessInfo,
  SetUpStore,
} from "@/components/createSellerPage";
import { useFormik } from "formik";
import { createSellerValidate } from "../lib/validate";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";

const CreateSellerAccount = () => {
  const [fileUrl, setFileUrl] = useState<string>("");

  const onSubmit = async () => {
    console.log("working..");

    const credentials = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      password: formik.values.password,
      zipCode: formik.values.postalCode,
      address: formik.values.address,
      phoneNumber: formik.values.phone,
      description: formik.values.description,
      businessEmail: formik.values.businessEmail,
      category: formik.values.category,
      businessName: formik.values.businessName,
      city: formik.values.city,
      profileImage: fileUrl,
      deliveryDays: formik.values.deliveryDays,
      sellerWalletAddress: formik.values.sellerWalletAddress,
    };

    axios
      .post(`${server}/shop/create-shop`, credentials, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      description: "",
      phone: "",
      businessEmail: "",
      businessName: "",
      category: "",
      deliveryDays: "",
      sellerWalletAddress: "",
    },
    validate: createSellerValidate,
    onSubmit,
  });

  const options = [
    { icon: TbSquareRoundedNumber1, name: "Personal Details", id: 1 },
    { icon: TbSquareRoundedNumber2, name: "Business Information ", id: 2 },
    { icon: TbSquareRoundedNumber3, name: "Set Up Store", id: 3 },
  ];
  return (
    <div>
      <NavBar />
      <div className="bg-[#B8D8E0] space-x-4 flex w-full h-36 justify-center text-center ">
        {options.map((item, index) => (
          <div
            key={index}
            className={`mt-20 ${
              currentPhase == item.id
                ? " font-bold text-xl text-[#0F282F]"
                : "font-bold text-xl text-[#337282]"
            } flex items-center justify-center space-x-1`}
          >
            {currentPhase > item.id ? (
              <IoMdCheckmarkCircleOutline size={30} />
            ) : (
              <item.icon size={30} />
            )}{" "}
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="justify-center mb-8 pb-4 mt-6 align-middle items-center flex">
        <div className="max-w-[800px]  mt-3 w-full  flex flex-col">
          <h1 className="text-2xl font-bold text-[#0F282F]">
            Seller Registration Form
          </h1>
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            {currentPhase == 1 ? (
              <PersonalInfo
                formik={formik}
                setFileUrl={setFileUrl}
                fileUrl={fileUrl}
                setCurrentPhase={setCurrentPhase}
                currentPhase={currentPhase}
              />
            ) : currentPhase == 2 ? (
              <BusinessInfo
                formik={formik}
                setCurrentPhase={setCurrentPhase}
                currentPhase={currentPhase}
              />
            ) : (
              <SetUpStore formik={formik} onSubmit={onSubmit} />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSellerAccount;
