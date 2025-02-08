import BreadCrumb from "../components/Breadcrumb";
import CartSection from "../components/CartSection";

const MyCart = () => {
  return (
    <div>
      <BreadCrumb currentPage="My Cart" />
      <CartSection />
    </div>
  );
};

export default MyCart;
