import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData, productData } from "../static/data";
import { toast } from "react-toastify";
import styles from "../styles/style";
import DropDown from "./DropDown";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  ButtonGroup,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { backend_url } from "../server";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../redux/actions/cart";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

const NavBar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [dropDown, setDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>(null);
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const { isSeller, isLoading } = useSelector((state: any) => state.seller);
  const initialFocusRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data: any) => {
    //@ts-ignore
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart?.reduce(
    (acc: any, item: any) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data: any) => {
    //@ts-ignore
    dispatch(addTocart(data));
  };

  const handleSearchChange = (e: any) => {
    const term = e.target.value;

    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product: any) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    if (term.length == 0) {
      setSearchData("");
    } else {
      setSearchData(filteredProducts);
    }
  };

  const links = [
    {
      name: "Deals",
      href: "/products",
    },
    { name: "Products", href: "/products" },
    { name: "Delivery", href: "/products" },
  ];

  return (
    <div className="w-full h-16 fixed z-10 text-white p-4 bg-[#0F282F]">
      <div className="flex justify-between w-full">
        <div>
          <Link href="/">
            <h1 className="font-poppins text-2xl font-bold">ShopBrave</h1>
          </Link>
        </div>

        {/*Categorie*/}

        <div onClick={() => setDropDown(!dropDown)}>
          <div className="relative h-[60px] w-[230px] text-[#0F282F] 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
            >
              All Categories
            </button>
            {!dropDown ? (
              <IoIosArrowDown
                size={20}
                className="absolute ease-out duration-300 right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
            ) : (
              <IoIosArrowUp
                size={20}
                className="absolute duration-300 ease-out right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
            )}
            {dropDown ? (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>
        </div>

        <ul className="flex -mt-6 flex-row justify-center text-center items-center list-none ">
          {links.map((link) => (
            <li
              key={link.name}
              onClick={() => {
                //setIsOpen(false);
              }}
              className={`flex flex-row font-poppins font-light text-sm dark:hover:text-white hover:text-nft-dark mx-3
                ${
                  currentRoute === link.href
                    ? "dark:text-white text-nft-black-1"
                    : "dark:text-nft-gray-3 text-nft-gray-2"
                } 
                `}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/*Searchbar */}

        <div className="w-[400px] text-[#0F282F] relative">
          <div className="flex">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-4 bg-white rounded-l-2xl outline-none"
            />
            <div className="bg-[#B8D8E0] rounded-r-2xl w-[50px] justify-center flex align-middle text-center items-center">
              <AiOutlineSearch size={20} className="cursor-pointer" />
            </div>
          </div>

          {searchData && searchData.length !== 0 ? (
            <div className="absolute space-y-2 min-h-[30vh] mt-1 rounded-md bg-slate-50 shadow-sm-2 z-[9] p-4">
              {searchData &&
                searchData.map((i: any) => {
                  return (
                    <Link href={`/product/${i._id}`}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="w-[40px] rounded-full h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>

        {/* user */}

        <div className="ml-4 justify-center text-center space-x-2 flex">
          <div className="flex -mt-6 font-bold items-center align-middle space-x-2">
            {!isAuthenticated && !isSeller ? (
              <Popover
                //@ts-ignore
                initialFocusRef={initialFocusRef}
                placement="bottom"
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <div className="flex cursor-pointer font-bold items-center align-middle space-x-2">
                    <FaRegUser />
                    <p>Account</p>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  color="white"
                  bg="blue.800"
                  borderColor="blue.800"
                >
                  <PopoverHeader pt={4} fontWeight="bold" border="0">
                    Manage Your Accounts
                  </PopoverHeader>
                  <PopoverArrow bg="blue.800" />
                  <PopoverCloseButton />
                  <PopoverBody
                    border="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    pb={4}
                  >
                    <ButtonGroup size="sm">
                      <Link href="/login">
                        <Button colorScheme="green">Sign in as Buyer</Button>
                      </Link>
                      <Link href="/shop-login">
                        <Button colorScheme="blue">Sign in as Seller</Button>
                      </Link>
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : isAuthenticated ? (
              <Link
                className="flex font-bold items-center align-middle space-x-2"
                href="/profile"
              >
                <CgProfile fontSize={27} />
                <p>Profile</p>
              </Link>
            ) : (
              <Link
                className="flex font-bold items-center align-middle space-x-2"
                href="/dashboard"
              >
                <CgProfile fontSize={27} />
                <p>Dashboard</p>
              </Link>
            )}
          </div>
          <div className="flex -mt-6 font-bold items-center align-middle space-x-2">
            <div
              className="flex"
              //@ts-ignore
              ref={btnRef}
              onClick={onOpen}
            >
              <div className="relative cursor-pointer mr-[10px]">
                <AiOutlineShoppingCart
                  size={25}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
              <p className="cursor-pointer">Cart</p>
            </div>
          </div>
          <div>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              //@ts-ignore
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody>
                  <div className="fixed top-0 left-0 w-full h-screen z-10">
                    <div className="fixed top-0 right-0 h-full w-full flex flex-col overflow-y-scroll justify-between shadow-sm">
                      {cart || cart?.length === 0 || cart === null ? (
                        <div className="w-full h-screen flex items-center justify-center">
                          <div className="flex w-full justify-end top-3 pt-5 pr-5 fixed right-3">
                            <RxCross1
                              size={25}
                              className="cursor-pointer"
                              onClick={onClose}
                            />
                          </div>
                          <h5>Cart Items is empty!</h5>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="flex w-full justify-end pt-5 pr-5 fixed  right-3">
                              <RxCross1
                                size={25}
                                className="cursor-pointer"
                                onClick={onClose}
                              />
                            </div>
                            {/* Item length */}
                            <div className={`${styles.noramlFlex} p-4`}>
                              <IoBagHandleOutline size={25} />
                              <h5 className="pl-2 text-[20px] font-[500]">
                                {cart && cart.length} items
                              </h5>
                            </div>

                            {/* cart Single Items */}
                            <br />
                            <div className="w-full border-t">
                              {cart &&
                                cart.map((i: any, index: any) => (
                                  <CartSingle
                                    key={index}
                                    data={i}
                                    quantityChangeHandler={
                                      quantityChangeHandler
                                    }
                                    removeFromCartHandler={
                                      removeFromCartHandler
                                    }
                                  />
                                ))}
                            </div>
                          </div>
                          <div className="px-5 mb-3">
                            <Button colorScheme="blue">
                              Checkout Now (USD${totalPrice})
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
}: any) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data: any) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data: any) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default NavBar;
