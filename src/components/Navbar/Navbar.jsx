import { useState, useEffect } from "react";
import CartSidebar from "../CartSidebar/CartSidebar";
import "./Navbar.css";

const Navbar = ({
  searchText,
  setSearchText,
  cartItems,
  removeFromCart,
  totalPrice,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isCartOpen]);

  return (
    <>
      <nav className="bg-light px-md-5 py-3">
        <div className="d-flex align-items-center gap-3 gap-md-4 px-3 px-md-5">
          <a className="fs-3 fw-bold text-decoration-none text-dark" href="/">
            Stride
          </a>
          <div className="d-flex justify-content-center flex-grow-1">
            <input
              className="navbar-search w-100 border border-gray rounded"
              type="text"
              value={searchText}
              placeholder="Search for products..."
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <button
            className="cart-icon position-relative bg-light border-0"
            type="button"
            onClick={() => setIsCartOpen(true)}
          >
            <i className="bi bi-bag fs-4"></i>
            <span className="cart-item-count position-absolute top-0 start-50 d-flex justify-content-center align-items-center bg-dark text-white rounded-circle">
              {cartItems.length}
            </span>
          </button>
        </div>
      </nav>

      {isCartOpen ? (
        <div
          className="cart-overlay position-fixed top-0 left-0 z-1 vw-100 vh-100"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        ></div>
      ) : null}

      <CartSidebar
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default Navbar;
