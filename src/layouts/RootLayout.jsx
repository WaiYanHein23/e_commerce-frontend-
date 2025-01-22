import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const RootLayout = () => {
  return (
    <div className="container mx-auto px-10 border">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
