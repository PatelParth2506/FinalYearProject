import { ShoppingCart, Plus, Minus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const cartItems = useSelector((state) => state.cart.items);

  // Find the current product
  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="font-sans container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found!</h2>
        <Link to={"/store"} className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    );
  }

  // ✅ Get product quantity in cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // ✅ Find Related Products (Same Category but Different ID)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Link
          to={"/store"}
          className="mb-4 inline-block text-blue-500 hover:underline"
        >
          Back to Products
        </Link>

        {/* ✅ Product Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div className="shadow-md p-4 rounded w-full max-w-lg mx-auto">
            <img
              src={product.photo}
              alt={product.description.substring(0,20)}
              className="w-full h-auto rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full max-w-xl mx-auto text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-4">{product.description.substring(0,20)}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm">
                {product.category}
              </span>
            </div>

            {/* ✅ Add to Cart UI with Quantity Buttons */}
            {quantity > 0 ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-red-600 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-bold">{quantity}</span>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="w-full sm:w-auto bg-zinc-200 px-8 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-300 transition"
              >
                <ShoppingCart />
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* ✅ Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-xl font-bold mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/store/product/${item._id}`}
                  className="border p-4 rounded-md shadow hover:shadow-lg transition bg-white flex flex-col items-center text-center"
                  style={{
                    height: "340px",
                  }}
                >
                  <div className="w-full h-[200px] flex justify-center items-center overflow-hidden">
                    <img
                      src={item.photo}
                      alt={item.description.substring(0,20)}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
