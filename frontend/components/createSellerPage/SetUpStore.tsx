import { IoMdSend } from "react-icons/io";
import { TbTruckDelivery, TbLiveView } from "react-icons/tb";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SetUpStore = ({ formik, onSubmit }: any) => {
  return (
    <div className="border-[1px] p-4 border-[#618b95] rounded-md mt-4">
      <InputGroup
        className={`${
          formik.errors.deliveryDays && formik.touched.deliveryDays
            ? "border-rose-600 border-[1px]"
            : "border-[1px] border-[#618b95]"
        } rounded-md w-full h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <TbTruckDelivery className="text-[#9f9d9d]" />
        </InputLeftElement>
        <Input
          type="text"
          name="deliveryDays"
          className="text-[#0F282F] bg-white"
          placeholder="Delivery Days"
          {...formik.getFieldProps("deliveryDays")}
        />
      </InputGroup>
      {formik.errors.deliveryDays && formik.touched.deliveryDays ? (
        <span className="text-rose-500">{formik.errors.deliveryDays}</span>
      ) : (
        <></>
      )}

      <div className="w-full mt-5 space-x-2  flex">
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.password && formik.touched.password
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <TbLiveView className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="password"
              name="password"
              className="text-[#0F282F] bg-white"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
          </InputGroup>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <TbLiveView className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="password"
              name="cpassword"
              className="text-[#0F282F] bg-white"
              placeholder="comfirm password"
              {...formik.getFieldProps("cpassword")}
            />
          </InputGroup>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-500">{formik.errors.cpassword}</span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <button
        onClick={() => onSubmit()}
        type="submit"
        className="shadow-lg mt-4 font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] float-right p-1 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl"
      >
        <span className="mr-1">Create</span> <IoMdSend size={20} />
      </button>
    </div>
  );
};

export default SetUpStore;
