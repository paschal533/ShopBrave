import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import images from "../assets";

const FooterRow = ({ title, items }: any) => {
  return (
    <div className="w-full flex flex-col">
      <h1 className="font-bold text-xl mb-3">{title}</h1>
      {items.map((item: string, index: any) => (
        <p className="text-md text-[#265866]" key={index}>
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className=" text-[#0F282F] justify-center mb-8 pb-8 align-middle items-center flex">
      <div className="   max-w-[1200px]  mt-6 w-full  flex flex-col">
        <div className="flex w-full">
          <FooterRow
            title="Product"
            items={[
              "Employee database",
              "Payroll",
              "Absences",
              "Time tracking",
              "Shift planner",
              "Recruiting",
            ]}
          />
          <FooterRow title="Information" items={["FAQ", "Blog", "Support"]} />
          <FooterRow
            title="Company"
            items={["About us", "Careers", "Contact us", "Lift Media"]}
          />
          <div className="flex-auto w-66 p-4 rounded-md bg-[#B8D8E0]">
            <h1 className="text-md font-bold">Subscribe</h1>
            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Email address"
                className="h-[40px] w-64 px-4 bg-white rounded-l-xl outline-none"
              />
              <div className="bg-[#0F282F] -ml-4 text-white rounded-l-xl rounded-r-xl w-[50px] justify-center flex align-middle text-center items-center">
                <FiArrowRight size={20} className="cursor-pointer" />
              </div>
            </div>
            <p className="mt-4 text-[#265866]">
              Hello, we are Lift Media. Our goal is to translate the positive
              effects from revolutionizing how companies engage with their
              clients & their team.
            </p>
          </div>
        </div>

        <div className="h-1 mt-4 w-full bg-[#B8D8E0]" />

        <div className="mt-4 flex justify-between w-full">
          <h1 className="text-3xl font-bold">ShopBrave</h1>
          <div className="flex space-x-3 justify-center text-center font-bold text-xl">
            <p>Terms</p>
            <p>Privacy</p>
            <p>Cookies</p>
          </div>
          <div className="flex space-x-2 justify-center text-center">
            <Image src={images.twitter} alt="footer-image" height={50} />
            <Image src={images.facebook} alt="footer-image" height={50} />
            <Image src={images.linkedin} alt="footer-image" height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
