import { useState } from "react";
import { Link } from "react-router-dom";
import CartStore from "../store/CartStore";
import ProductStore from "../store/ProductStore";
import CategoryShow from "./category/CategoryShow";
import BrandShow from "./brand/BrandShow";
import Shipping from "./shipping/Shipping";
import Overview from "./overview/Overview";
import Product from "./product/Product";
import SizeShow from "./size/SizeShow";
import ColorShow from "./color/ColorShow";
import ProductPriceShow from "./product-price/ProductPriceShow";

const Dashboard = () => {
  const { carts } = CartStore();
  const { products } = ProductStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate total revenue
  const totalRevenue = carts.reduce((total, cart) => {
    const product = products.find((p) => p.id === cart.productId);
    return total + (product?.price * cart.quantity || 0);
  }, 0);

  // Get total orders
  const totalOrders = carts.length;

  // Get total products
  const totalProducts = products.length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      change: "+12.5%",
      icon: "💰",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      change: "+8.2%",
      icon: "📦",
    },
    {
      title: "Total Products",
      value: totalProducts,
      change: "+3.1%",
      icon: "🏷️",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+15.3%",
      icon: "👥",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Side Navigation */}
      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">{stat.title}</p>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {stat.value}
                    </h2>
                    <span className="text-green-500 text-sm">
                      {stat.change} from last month
                    </span>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="border-b">
              <nav className="flex flex-wrap">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "overview"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "orders"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "products"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab("customers")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "customers"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Customers
                </button>
                <button
                  onClick={() => setActiveTab("categories")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "categories"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveTab("brands")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "brands"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Brands
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "shipping"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Shipping
                </button>
                <button
                  onClick={() => setActiveTab("sizes")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "sizes"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sizes
                </button>
                <button
                  onClick={() => setActiveTab("colors")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "colors"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Colors
                </button>
                <button
                  onClick={() => setActiveTab("product_prices")}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "product_prices"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Product Prices
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <Overview
                activeTab={activeTab}
                carts={carts}
                products={products}
              />

              <Product activeTab={activeTab} />

              {/* Category List */}
              <CategoryShow activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Brand List */}
              <BrandShow activeTab={activeTab} setActiveTab={setActiveTab} />
              {/* Shipping */}
              <Shipping activeTab={activeTab} />
              <SizeShow activeTab={activeTab} />
              <ColorShow activeTab={activeTab} />
              <ProductPriceShow activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
