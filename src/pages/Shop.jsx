// ... existing imports and code ...
import { Link } from "react-router-dom";
import ProductStore from "../store/ProductStore";

const Shop = () => {
  const { products } = ProductStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          {/* Categories Section */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {["Men", "Women", "Kids", "Accessories"].map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <input type="checkbox" className="accent-blue-500" />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands Section */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-4">Brands</h2>
            <div className="space-y-2">
              {[
                "Nike",
                "Adidas",
                "Puma",
                "Under Armour",
                "New Balance",
                "Reebok",
              ].map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <input type="checkbox" className="accent-blue-500" />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
              </Link>
              <p className="text-gray-600">{product.desc}</p>
              <p className="text-blue-500 font-semibold">${product.price}</p>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
