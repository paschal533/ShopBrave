import { NavBar } from "@/components";
import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import Checkout from "@/components/Checkout/Checkout";

const CheckOutPage = () => {
  return (
    <div>
      <NavBar />
      <div className="h-10" />
      <Checkout />
    </div>
  );
};

export default CheckOutPage;
