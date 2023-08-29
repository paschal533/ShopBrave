import React, { useState } from "react";
import styles from "../../styles/style";
import { Country, State } from "country-state-city";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { MdOutlineLocationOn, MdOutlinePayments } from "react-icons/md";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BiWallet } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { SendTokenTx } from "@/cadence/transactions/send_token";
import { useFormik } from "formik";
import { paymentValidate } from "../../lib/validate";
import "../../flow/config";
import * as fcl from "@onflow/fcl";
//@ts-ignore
import * as t from "@onflow/types";

const Checkout = () => {
  const { user } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.cart);
  const [country, setCountry] = useState("");
  const [walletUser, setWalletUser] = useState({ loggedIn: null });
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState<Number>(0);
  const router = useRouter();

  console.log(walletUser);

  //@ts-ignore
  useEffect(() => fcl?.currentUser.subscribe(setWalletUser), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = async () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {

       
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const order = { transactionId };

      await axios
        .post(`${server}/order/create-order`, order, config)
        .then((res) => {
          toast.success("Order successful!");
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("latestOrder", JSON.stringify([]));
          window.location.reload();
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      city: "",
      address1: "",
      address2: "",
      zipCode: "",
      couponCode: "",
      country: "",
    },
    validate: paymentValidate,
    onSubmit: paymentSubmit,
  });

  const subTotalPrice = cart?.reduce(
    (acc: any, item: any) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item: any) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc: any, item: any) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - Number(discountPercentenge)).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log(discountPercentenge);

  return (
    <div className="justify-center mb-8 p-4 mt-6 align-middle items-center flex">
      <div className="max-w-[1200px]  mt-6 w-full  flex">
        <div className="flex-1">
          <ShippingInfo formik={formik} walletUser={walletUser} />
        </div>
        <div className="w-[30%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            paymentSubmit={paymentSubmit}
            walletUser={walletUser}
          />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({ formik, walletUser }: any) => {
  return (
    <div className="border-[1px] p-4 border-[#618b95] rounded-md mt-4">
      <InputGroup
        className={`${
          formik.errors.country && formik.touched.country
            ? "border-rose-600 border-[1px]"
            : "border-[1px] border-[#618b95]"
        } rounded-md w-full h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <MdOutlineLocationOn className="text-[#9f9d9d]" />
        </InputLeftElement>
        <Input
          type="text"
          name="country"
          className="text-[#0F282F] bg-white"
          placeholder="Country"
          {...formik.getFieldProps("country")}
        />
      </InputGroup>
      {formik.errors.country && formik.touched.country ? (
        <span className="text-rose-500">{formik.errors.country}</span>
      ) : (
        <></>
      )}

      <div className="w-full mt-5 space-x-2  flex">
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.address1 && formik.touched.address1
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <MdOutlineLocationOn className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="address1"
              className="text-[#0F282F] bg-white"
              placeholder="Address1"
              {...formik.getFieldProps("address1")}
            />
          </InputGroup>
          {formik.errors.address1 && formik.touched.address1 ? (
            <span className="text-rose-500">{formik.errors.address1}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/2">
          <InputGroup
            className={`${
              formik.errors.address2 && formik.touched.address2
                ? "border-rose-600 border-[1px]"
                : "border-[1px] border-[#618b95]"
            } rounded-md w-full h-10`}
          >
            <InputLeftElement pointerEvents="none">
              <MdOutlineLocationOn className="text-[#9f9d9d]" />
            </InputLeftElement>
            <Input
              type="text"
              name="address2"
              className="text-[#0F282F] bg-white"
              placeholder="Address2"
              {...formik.getFieldProps("address2")}
            />
          </InputGroup>
          {formik.errors.address2 && formik.touched.address2 ? (
            <span className="text-rose-500">{formik.errors.address2}</span>
          ) : (
            <></>
          )}
        </div>
      </div>

      <InputGroup
        className={`${
          formik.errors.city && formik.touched.city
            ? "border-rose-600 border-[1px]"
            : "border-[1px]  border-[#618b95]"
        } rounded-md w-full mt-3 h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <FaCity className="text-[#9f9d9d]" />
        </InputLeftElement>
        <Input
          type="text"
          name="city"
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

      <InputGroup
        className={`${
          formik.errors.zipCode && formik.touched.zipCode
            ? "border-rose-600 border-[1px]"
            : "border-[1px]  border-[#618b95]"
        } rounded-md w-full mt-3 h-10`}
      >
        <InputLeftElement pointerEvents="none">
          <BiWallet className="text-[#9f9d9d]" />
        </InputLeftElement>
        <Input
          type="text"
          name="zipCode"
          className="text-[#0F282F] bg-white"
          placeholder="zipCode"
          {...formik.getFieldProps("zipCode")}
        />
      </InputGroup>
      {formik.errors.zipCode && formik.touched.zipCode ? (
        <span className="text-rose-500">{formik.errors.zipCode}</span>
      ) : (
        <></>
      )}

      {!walletUser.addr ? (
        <button
          onClick={fcl.logIn}
          className="shadow-lg mt-8 font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] float-right p-2 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl"
        >
          <span className="mr-2">Connect your wallet</span>{" "}
          <BiWallet size={20} />
        </button>
      ) : (
        <button
          onClick={fcl.unauthenticate}
          className="shadow-lg mt-8 font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] float-right p-2 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl"
        >
          <span className="mr-2">Disconnect your wallet</span>{" "}
          <BiWallet size={20} />
        </button>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  paymentSubmit,
  walletUser,
}: any) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600] text-[#000000a4]">
          ${subTotalPrice ? subTotalPrice : 300}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600] text-[#000000a4]">
          ${shipping ? shipping.toFixed(2) : 60}
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600] text-[#000000a4]">
          - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3 text-[#000000a4]">
        ${!Number.isNaN(totalPrice) ? 360 : totalPrice}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
        {walletUser.addr ? (
          <button
            onClick={paymentSubmit}
            className="shadow-lg mt-4 w-full font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] float-right p-2 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl"
          >
            <span className="mr-2">Make Payment</span>{" "}
            <MdOutlinePayments size={20} />
          </button>
        ) : (
          <button className="shadow-lg mt-4 w-full font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] float-right p-2 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl">
            <span className="mr-2">connect your wallet to proceed</span>{" "}
            <MdOutlinePayments size={20} />
          </button>
        )}
      </form>
    </div>
  );
};

export default Checkout;
