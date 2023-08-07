import { useState, useMemo, useCallback } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import images from "@/assets";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const PersonalInfo = ({
  setCurrentPhase,
  currentPhase,
  formik,
  setFileUrl,
  fileUrl,
}: any) => {
  const uploadToInfura = async (file: any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://shopbrave.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const onDrop = useCallback(async (acceptedFile: any) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    //@ts-ignore
    accept: "image/*",
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () =>
      `bg-white border border-[#618b95] mt-4 rounded-md flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? " border-file-active " : ""} 
       ${isDragAccept ? " border-file-accept " : ""} 
       ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="border-[1px] p-4 border-[#618b95] rounded-md mt-4">
      <InputGroup
        className={`${
          formik.errors.email && formik.touched.email
            ? "border-rose-600 border-[1px]"
            : "border-[1px] border-[#618b95]"
        } rounded-md w-full h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="email"
          name="email"
          className="text-[#0F282F] bg-white"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
      </InputGroup>
      {formik.errors.email && formik.touched.email ? (
        <span className="text-rose-500">{formik.errors.email}</span>
      ) : (
        <></>
      )}

      <div className="w-full mt-5 space-x-2  flex">
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.firstName && formik.touched.firstName
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <AiOutlineUser className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="firstName"
              className="text-[#0F282F] bg-white"
              placeholder="First name"
              {...formik.getFieldProps("firstName")}
            />
          </InputGroup>
          {formik.errors.firstName && formik.touched.firstName ? (
            <span className="text-rose-500">{formik.errors.firstName}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.lastName && formik.touched.lastName
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <AiOutlineUser className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="lastName"
              className="text-[#0F282F] bg-white"
              placeholder="Last name"
              {...formik.getFieldProps("lastName")}
            />
          </InputGroup>
          {formik.errors.lastName && formik.touched.lastName ? (
            <span className="text-rose-500">{formik.errors.lastName}</span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="w-full mt-5 space-x-2  flex">
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.address && formik.touched.address
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <MdOutlineLocationOn className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="Address"
              className="text-[#0F282F] bg-white"
              placeholder="Address"
              {...formik.getFieldProps("address")}
            />
          </InputGroup>
          {formik.errors.address && formik.touched.address ? (
            <span className="text-rose-500">{formik.errors.address}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.city && formik.touched.city
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <FaCity className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="City"
              className="text-[#0F282F] bg-white"
              placeholder="City"
              {...formik.getFieldProps("city")}
            />
          </InputGroup>
          {formik.errors.city && formik.touched.city ? (
            <span className="text-rose-500">{formik.errors.city}</span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="w-full mt-5 space-x-2  flex">
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.postalCode && formik.touched.postalCode
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <MdOutlineLocationOn className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="postalCode"
              className="text-[#0F282F] bg-white"
              placeholder="Postal Code"
              {...formik.getFieldProps("postalCode")}
            />
          </InputGroup>
          {formik.errors.postalCode && formik.touched.postalCode ? (
            <span className="text-rose-500">{formik.errors.postalCode}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.phone && formik.touched.phone
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              name="phone"
              className="text-[#0F282F] bg-white"
              placeholder="Phone"
              {...formik.getFieldProps("phone")}
            />
          </InputGroup>
          {formik.errors.phone && formik.touched.phone ? (
            <span className="text-rose-500">{formik.errors.phone}</span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <h1 className="mt-5 text-xl font-semibold text-[#98b3b8]">
        Upload your Logo
      </h1>

      <div {...getRootProps()} className={fileStyle}>
        <input {...getInputProps()} />
        <div className="flexCenter flex-col text-center">
          <p className="font-poppins text-[#98b3b8] font-semibold text-xl">
            JPG, PNG, GIF, SVG, WEBM, Max 100mb.
          </p>

          <div className="my-12 w-full flex justify-center">
            <Image
              src={images.upload}
              width={100}
              height={100}
              objectFit="contain"
              alt="file upload"
              className={"filter invert"}
            />
          </div>

          <p className="font-poppins text-[#98b3b8] font-semibold text-sm">
            Drag and Drop File
          </p>
          <p className="font-poppins text-[#98b3b8] font-semibold text-sm mt-2">
            Or browse media on your device
          </p>
        </div>
      </div>
      {fileUrl && (
        <div className="mt-4 justify-center w-full items-center align-middle flex">
          <div>
            <img
              src={fileUrl}
              alt="Asset_file"
              className="rounded-full h-30 w-30"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setCurrentPhase(currentPhase + 1)}
        className="shadow-lg mt-4 font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] float-right p-1 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl"
      >
        <span className="mr-2">Next step</span> <FiArrowRight size={20} />
      </button>
    </div>
  );
};

export default PersonalInfo;
