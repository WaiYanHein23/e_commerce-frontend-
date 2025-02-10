import { Link } from "react-router-dom";
import img1 from "../assets/th (8).jpg";
import CartStore from "../store/CartStore";

const Header = () => {
  const { carts } = CartStore();
  const token = localStorage.getItem("token");

  return (
    <div>
      <nav className="p-6 border shadow-lg">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src={img1} alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Navigation Links */}
          <div>
            <ul className="flex space-x-4 justify-end items-center">
              <li>
                <Link to="/" className="text-sm hover:text-blue-300">
                  Mens
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-blue-300">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-blue-300">
                  Kids
                </Link>
              </li>

              {/* Conditional Rendering Based on Token */}
              {token ? (
                <li className="relative">
                  <Link
                    to="/myCart"
                    className="border border-black px-3 py-2 relative"
                  >
                    My Cart
                    {carts.length > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-600 px-2 py-1 text-xs text-white rounded-full">
                        {carts.length}
                      </span>
                    )}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/register"
                    className="border border-black px-3 py-2 text-white bg-blue-600 rounded-md"
                  >
                    Register
                  </Link>
                </li>
              )}
              {token ? (
                <li>
                  <Link
                    to="/profile"
                    className="border border-red-600 rounded-md bg-blue-600 text-white px-3 py-2"
                  >
                    Profile
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="border border-black px-3 py-2 text-white bg-blue-600 rounded-md"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
