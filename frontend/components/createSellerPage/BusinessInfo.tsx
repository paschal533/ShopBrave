import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiWallet } from "react-icons/bi";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Textarea } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

const BusinessInfo = ({ setCurrentPhase, formik, currentPhase }: any) => {
  return (
    <div className="border-[1px] p-4 border-[#618b95] rounded-md mt-4">
      <InputGroup
        className={`${
          formik.errors.businessEmail && formik.touched.businessEmail
            ? "border-rose-600 border-[1px]"
            : "border-[1px] border-[#618b95]"
        } rounded-md w-full h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="email"
          name="businessEmail"
          className="text-[#0F282F] bg-white"
          placeholder="Business Email"
          {...formik.getFieldProps("businessEmail")}
        />
      </InputGroup>
      {formik.errors.businessEmail && formik.touched.businessEmail ? (
        <span className="text-rose-500">{formik.errors.businessEmail}</span>
      ) : (
        <></>
      )}

      <div className="w-full mt-5 space-x-2  flex">
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.businessName && formik.touched.businessName
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <AiOutlineUser className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="businessName"
              className="text-[#0F282F] bg-white"
              placeholder="Business name"
              {...formik.getFieldProps("businessName")}
            />
          </InputGroup>
          {formik.errors.businessName && formik.touched.businessName ? (
            <span className="text-rose-500">{formik.errors.businessName}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.category && formik.touched.category
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <AiOutlineUser className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="category"
              className="text-[#0F282F] bg-white"
              placeholder="Category"
              {...formik.getFieldProps("category")}
            />
          </InputGroup>
          {formik.errors.category && formik.touched.category ? (
            <span className="text-rose-500">{formik.errors.category}</span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <InputGroup
        className={`${
          formik.errors.sellerWalletAddress &&
          formik.touched.sellerWalletAddress
            ? "border-rose-600 border-[1px]"
            : "border-[1px]  border-[#618b95]"
        } rounded-md w-full mt-3 h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <BiWallet className="text-[#9f9d9d]" />
        </InputLeftElement>
        <Input
          type="text"
          name="sellerWalletAddress"
          className="text-[#0F282F] bg-white"
          placeholder="Seller Wallet Address"
          {...formik.getFieldProps("sellerWalletAddress")}
        />
      </InputGroup>
      {formik.errors.sellerWalletAddress &&
      formik.touched.sellerWalletAddress ? (
        <span className="text-rose-500">
          {formik.errors.sellerWalletAddress}
        </span>
      ) : (
        <></>
      )}

      <InputGroup
        className={`${
          formik.errors.description && formik.touched.description
            ? "border-rose-600 border-[1px]"
            : "border-[1px] border-[#618b95]"
        } rounded-md w-full mt-4`}
      >
        <InputLeftElement pointerEvents="none"></InputLeftElement>
        <Textarea
          type="text"
          name="description"
          className="text-[#0F282F] bg-white"
          placeholder="Business Description"
          {...formik.getFieldProps("description")}
        />
      </InputGroup>
      {formik.errors.description && formik.touched.description ? (
        <span className="text-rose-500">{formik.errors.description}</span>
      ) : (
        <></>
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

export default BusinessInfo;
