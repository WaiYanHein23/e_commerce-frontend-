import { Link } from "react-router-dom";
import img1 from "../assets/th (8).jpg";
import CartStore from "../store/CartStore";

const Header = () => {
  const { carts } = CartStore();
  return (
    <div>
      <nav className=" p-6 border  border:shadow-lg ...">
        <div className="flex justify-between items-center">
          <div>
            <img src={img1} alt="" />
          </div>
          <div>
            <ul className="flex space-x-4 justify-end items-center">
              <>
                <li>
                  <Link to="" className=" text-sm hover:text-blue-300">
                    Mens
                  </Link>
                </li>
                <li>
                  <Link to="" className=" text-sm hover:text-blue-300">
                    Women
                  </Link>
                </li>

                <li>
                  <Link to="" className=" text-sm hover:text-blue-300">
                    Kids
                  </Link>
                </li>
              </>
              <Link to="/myCart" className="border border-black px-3 py-2">
                My Cart
                <span className=" absolute top-6 right-13 -translate-x-0 -translate-y-1 bg-red-600  px-1 py-1 text-xs">
                  {carts.length}
                </span>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
