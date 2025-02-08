import ProductStore from "../store/ProductStore";
import CartStore from "../store/CartStore";

const Cart = ({ cart: { id, productId, quantity } }) => {
  const { products } = ProductStore();
  const { increaseQuantity, decreaseQuantity, removeHandle } = CartStore();

  // Find the product details from products array
  const product = products.find((el) => el.id == productId);

  // Calculate total cost for this cart item
  const cost = product.price * quantity;

  const handleIncrease = () => {
    increaseQuantity(id);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseQuantity(id);
    } else {
      // Show confirmation before removing item
      if (window.confirm("Are you sure you want to remove this item?")) {
        removeHandle(id);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="grid grid-cols-6 gap-4 items-center">
        {/* Product Image */}
        <div className="col-span-1">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="col-span-2">
          <h4 className="font-semibold text-lg">{product.name}</h4>
          <p className="text-gray-600">Price: ${product.price}</p>
        </div>

        {/* Quantity Controls */}
        <div className="col-span-2">
          <p className="mb-2 ms-2 text-gray-600">Quantity</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              -
            </button>
            <span className="mx-2 font-medium">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Cost */}
        <div className="col-span-1 text-right">
          <p className="font-semibold text-lg">${cost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
