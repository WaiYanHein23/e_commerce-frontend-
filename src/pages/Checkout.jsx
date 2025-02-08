import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CartStore from "../store/CartStore";
import ProductStore from "../store/ProductStore";
import Breadcrumb from "../components/Breadcrumb";

const Checkout = () => {
  const { carts } = CartStore();
  const { products } = ProductStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const calculateTotal = () => {
    return carts.reduce((pv, cv) => {
      const product = products.find((p) => p.id == cv.productId);
      return pv + product.price * cv.quantity;
    }, 0);
  };

  const shipping = 10;
  const subtotal = calculateTotal();
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    console.log("Order submitted:", { data, carts, total });
  };

  const paymentMethod = watch("paymentMethod");

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb currentPage="Checkout" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <textarea
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className="w-full p-2 border rounded-md"
                    rows="3"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      {...register("postalCode", {
                        required: "Postal Code is required",
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                {/* payment method */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register("paymentMethod", {
                          required: "Payment method is required",
                        })}
                        value="stripe"
                        className="mr-2"
                      />
                      Credit/Debit Card (Stripe)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        {...register("paymentMethod", {
                          required: "Payment method is required",
                        })}
                        value="cod"
                        className="mr-2"
                      />
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>
                {paymentMethod === "stripe" && (
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      {...register("cardNumber", {
                        required: "Card Number is required",
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {carts.map((cart) => {
                  const product = products.find((p) => p.id == cart.productId);
                  return (
                    <div key={cart.id} className="flex justify-between">
                      <div>
                        <img
                          src={product.images[0]}
                          className="w-16"
                          alt={product.name}
                        />
                        <p className="font-medium">{product.name}</p>
                        <p className="text-gray-600">
                          Quantity: {cart.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(product.price * cart.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
                <Link
                  to="/shop"
                  className="block text-center text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
