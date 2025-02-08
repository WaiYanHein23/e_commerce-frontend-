import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductStore from "../store/ProductStore";

const Product = () => {
  const { id } = useParams();
  const { products } = ProductStore();

  // Find product by id
  const product = products.find((p) => p.id === id);

  // If product not found, show an error message
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb currentPage={product.name} />

      <Link to="/shop">
        <button className=" hover:bg-blue-700  font-bold py-2 px-4 rounded">
          Back to Shop
        </button>
      </Link>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden cursor-pointer border-2 hover:border-blue-500"
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-red-500 mt-2">
                  ${product.price}
                </p>
              </div>

              <p className="text-gray-1000 text-xl">Description</p>
              <span className="text-gray-600">{product.description}</span>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="w-12 h-12 border-2 rounded-md hover:border-blue-500"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-4 py-2 border-2 rounded-md hover:border-blue-500"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>

              {/* Additional Information */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>100% Cotton material</li>
                  <li>Machine washable</li>
                  <li>Regular fit</li>
                  <li>Button-down collar</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
