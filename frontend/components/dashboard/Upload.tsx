//@typescript-eslint/no-namespace
import { useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import {
  MdOutlineLocationOn,
  MdOutlinePriceChange,
  MdColorLens,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { TbTruckDelivery, TbResize } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { useFormik } from "formik";
import { createProductValidate } from "../../lib/validate";
import { Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createProduct } from "../../redux/actions/product";
import axios from "axios";
import { server } from "@/server";
import { toast } from "react-toastify";
import UploadImage from "./UploadImage";

const Upload = () => {
  const [fileUrl, setFileUrl] = useState<Array<string>>([]);
  const { seller } = useSelector((state: any) => state.seller);
  const { success, error } = useSelector((state: any) => state.products);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      router.push("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    try {
      const form = {
        shopId: seller._id,
        name: formik.values.name,
        description: formik.values.description,
        keyDetails: formik.values.keyDetails,
        specification: formik.values.specification,
        category: formik.values.category,
        colors: formik.values.colors,
        sizes: formik.values.sizes,
        deliveryDays: formik.values.deliveryDays,
        price: formik.values.price,
        images: fileUrl,
      };

      // @ts-ignore
      dispatch(createProduct(form));
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      keyDetails: "",
      specification: "",
      category: "",
      colors: "",
      sizes: "",
      deliveryDays: "",
      price: "",
    },
    validate: createProductValidate,
    onSubmit,
  });

  return (
    <div className="mt-20 p-4">
      <h1 className="text-[#0F282F] font-bold text-2xl">Upload Goods</h1>
      <div className="border-[1px] p-4 border-[#618b95] rounded-md mt-4">
        <InputGroup
          className={`${
            formik.errors.name && formik.touched.name
              ? "border-rose-600 border-[1px]"
              : "border-[1px] border-[#618b95]"
          } rounded-md w-full h-10`}
        >
          <InputLeftElement pointerEvents="none">
            <MdDriveFileRenameOutline className="text-[#9f9d9d]" />
          </InputLeftElement>
          <Input
            type="text"
            //@ts-ignore
            name="name"
            className="text-[#0F282F] bg-white"
            placeholder="Product Name"
            {...formik.getFieldProps("name")}
          />
        </InputGroup>
        {formik.errors.name && formik.touched.name ? (
          <span className="text-rose-500">{formik.errors.name}</span>
        ) : (
          <></>
        )}

        <div className="w-full flex space-x-2 justify-between">
          <div className="w-1/2">
            <InputGroup
              className={`${
                formik.errors.description && formik.touched.description
                  ? "border-rose-600 border-[1px]"
                  : "border-[1px] border-[#618b95]"
              } rounded-md w-full mt-4`}
            >
              <InputLeftElement pointerEvents="none"></InputLeftElement>
              <Textarea
                //@ts-ignore
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
          </div>
          <div className="w-1/2">
            <InputGroup
              className={`${
                formik.errors.keyDetails && formik.touched.keyDetails
                  ? "border-rose-600 border-[1px]"
                  : "border-[1px] border-[#618b95]"
              } rounded-md w-full mt-4`}
            >
              <InputLeftElement pointerEvents="none"></InputLeftElement>
              <Textarea
                //@ts-ignore
                name="keyDetails"
                className="text-[#0F282F] bg-white"
                placeholder="Key Details"
                {...formik.getFieldProps("keyDetails")}
              />
            </InputGroup>
            {formik.errors.keyDetails && formik.touched.keyDetails ? (
              <span className="text-rose-500">{formik.errors.keyDetails}</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <InputGroup
          className={`${
            formik.errors.specification && formik.touched.specification
              ? "border-rose-600 border-[1px]"
              : "border-[1px] border-[#618b95]"
          } rounded-md w-full mt-4`}
        >
          <InputLeftElement pointerEvents="none"></InputLeftElement>
          <Textarea
            //@ts-ignore
            name="specification"
            className="text-[#0F282F] bg-white"
            placeholder="Specification"
            {...formik.getFieldProps("specification")}
          />
        </InputGroup>
        {formik.errors.specification && formik.touched.specification ? (
          <span className="text-rose-500">{formik.errors.specification}</span>
        ) : (
          <></>
        )}

        <InputGroup
          className={`${
            formik.errors.category && formik.touched.category
              ? "border-rose-600 border-[1px]"
              : "border-[1px] border-[#618b95]"
          } rounded-md w-full mt-3 h-10`}
        >
          <InputLeftElement pointerEvents="none">
            <MdOutlineLocationOn className="text-[#9f9d9d]" />
          </InputLeftElement>
          <Input
            type="text"
            //@ts-ignore
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

        <div className="w-full flex space-x-2 justify-between">
          <div className="w-1/2">
            <InputGroup
              className={`${
                formik.errors.colors && formik.touched.colors
                  ? "border-rose-600 border-[1px]"
                  : "border-[1px] border-[#618b95]"
              } rounded-md w-full mt-3 h-10`}
            >
              <InputLeftElement pointerEvents="none">
                <MdColorLens className="text-[#9f9d9d]" />
              </InputLeftElement>
              <Input
                type="text"
                //@ts-ignore
                name="colors"
                className="text-[#0F282F] bg-white"
                placeholder="Colors Available"
                {...formik.getFieldProps("colors")}
              />
            </InputGroup>
            {formik.errors.colors && formik.touched.colors ? (
              <span className="text-rose-500">{formik.errors.colors}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="w-1/2">
            <InputGroup
              className={`${
                formik.errors.sizes && formik.touched.sizes
                  ? "border-rose-600 border-[1px]"
                  : "border-[1px] border-[#618b95]"
              } rounded-md w-full mt-3 h-10`}
            >
              <InputLeftElement pointerEvents="none">
                <TbResize className="text-[#9f9d9d]" />
              </InputLeftElement>
              <Input
                type="text"
                //@ts-ignore
                name="sizes"
                className="text-[#0F282F] bg-white"
                placeholder="sizes  Available"
                {...formik.getFieldProps("Sizes")}
              />
            </InputGroup>
            {formik.errors.sizes && formik.touched.sizes ? (
              <span className="text-rose-500">{formik.errors.sizes}</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-full flex space-x-2 justify-between">
          <div className="w-1/2">
            <InputGroup
              className={`${
                formik.errors.price && formik.touched.price
                  ? "border-rose-600 border-[1px]"
                  : "border-[1px] border-[#618b95]"
              } rounded-md w-full mt-3 h-10`}
            >
              <InputLeftElement pointerEvents="none">
                <MdOutlinePriceChange className="text-[#9f9d9d]" />
              </InputLeftElement>
              <Input
                type="text"
                //@ts-ignore
                name="price"
                className="text-[#0F282F] bg-white"
                placeholder="Price"
                {...formik.getFieldProps("price")}
              />
            </InputGroup>
            {formik.errors.price && formik.touched.price ? (
              <span className="text-rose-500">{formik.errors.price}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="w-1/2">
            <InputGroup
              className={`${
                formik.errors.deliveryDays && formik.touched.deliveryDays
                  ? "border-rose-600 border-[1px]"
                  : "border-[1px] border-[#618b95]"
              } rounded-md w-full mt-3 h-10`}
            >
              <InputLeftElement pointerEvents="none">
                <TbTruckDelivery className="text-[#9f9d9d]" />
              </InputLeftElement>
              <Input
                type="text"
                //@ts-ignore
                name="deliveryDays"
                className="text-[#0F282F] bg-white"
                placeholder="Delivery Days"
                {...formik.getFieldProps("deliveryDays")}
              />
            </InputGroup>
            {formik.errors.deliveryDays && formik.touched.deliveryDays ? (
              <span className="text-rose-500">
                {formik.errors.deliveryDays}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <h1 className="text-[#1a3841] mt-4 font-bold text-md">Upload Photo</h1>

        <div className="w-full mt-4 flex space-x-2 justify-center">
          <UploadImage
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            title="Front View"
            index={1}
          />
          <UploadImage
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            title="Back View"
            index={2}
          />
          <UploadImage
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            title="Side View"
            index={3}
          />
          <UploadImage
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            title="Side View"
            index={4}
          />
        </div>

        <button
          onClick={(e) => onSubmit(e)}
          className="shadow-lg mt-8 font-bold text-md hover:scale-110 text-white ease-out duration-300 shadow-indigo-500/40 bg-[#0F282F] p-1 pl-2 pr-2 flex justify-center space-x-2 items-center text-center rounded-xl"
        >
          <span className="mr-1">Publish</span> <IoMdSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Upload;
