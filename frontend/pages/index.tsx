import {
  HomePage,
  NavBar,
  Footer,
  Brands,
  Services,
  Banner,
} from "@/components";
import "../flow/config";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <Banner />
      <HomePage />
      <Brands />
      <Services />
      <Footer />
    </div>
  );
}
