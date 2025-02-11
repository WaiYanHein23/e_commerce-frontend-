import { useState } from "react";
import { Link } from "react-router-dom";
import CartStore from "../store/CartStore";
import ProductStore from "../store/ProductStore";
import CategoryShow from "./category/CategoryShow";
import BrandShow from "./brand/BrandShow";
import useSWR from "swr";

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

  const brands = [
    { id: 1, name: "Brand A", productCount: 45 },
    { id: 2, name: "Brand B", productCount: 30 },
    { id: 3, name: "Brand C", productCount: 25 },
  ];

  // Mock data for shipping
  const shippingInfo = [
    { id: 1, orderId: 1001, status: "Shipped", trackingNumber: "TN123456789" },
    {
      id: 2,
      orderId: 1002,
      status: "In Transit",
      trackingNumber: "TN987654321",
    },
    {
      id: 3,
      orderId: 1003,
      status: "Delivered",
      trackingNumber: "TN456789123",
    },
  ];

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
              <nav className="flex">
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
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {carts.map((cart) => {
                          const product = products.find(
                            (p) => p.id === cart.productId
                          );
                          return (
                            <tr key={cart.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                #{cart.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                John Doe
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Completed
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                ${(product?.price * cart.quantity).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "products" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Products List</h3>
                    <Link
                      to="/admin/add-product"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Add New Product
                    </Link>
                  </div>
                  {/* Products table or grid here */}
                </div>
              )}

              {/* Category List */}
              <CategoryShow activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Brand List */}
              <BrandShow
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                brands={brands}
              />

              {activeTab === "shipping" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Shipping Information
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Shipping ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Tracking Number
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {shippingInfo.map((shipping) => (
                          <tr key={shipping.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              #{shipping.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              #{shipping.orderId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {shipping.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {shipping.trackingNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
