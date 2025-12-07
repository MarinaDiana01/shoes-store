import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductsList from "./components/ProductsList/ProductsList";
import { ToastContainer, toast, Slide } from "react-toastify";
import "./App.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find((p) => p.id === product.id);
    if (!exists) {
      setCartItems((prevCartItems) => [...prevCartItems, product]);
      toast.success(
        <span>
          <strong>{product.title}</strong> added to your cart!
        </span>
      );
    } else {
      toast.info(
        <span>
          <strong>{product.title}</strong> is already in your cart!
        </span>
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <Navbar
        searchText={searchText}
        setSearchText={setSearchText}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
      <ProductsList searchText={searchText} addToCart={addToCart} />
      <ToastContainer
        className="p-3 p-sm-0"
        toastClassName="custom-toast gap-1 rounded-2"
        pauseOnHover
        closeOnClick
        position="top-right"
        autoClose={1500}
        transition={Slide}
      />
    </>
  );
};

export default App;
