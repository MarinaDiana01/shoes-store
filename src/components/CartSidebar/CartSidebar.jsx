import "./CartSidebar.css";
import emptyCart from "../../assets/images/cart/empty-cart.svg";

const CartSidebar = ({
  isCartOpen,
  setIsCartOpen,
  cartItems,
  removeFromCart,
  totalPrice,
}) => {
  return (
    <div
      className={`${
        isCartOpen ? "open" : ""
      } cart-sidebar-container position-fixed top-0 z-2 vh-100 bg-white`}
    >
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="m-0">Your Cart</h5>
        <button
          className="bg-dark text-white px-2 py-1 rounded"
          type="button"
          onClick={() => setIsCartOpen(false)}
          aria-label="Close cart"
        >
          Close
        </button>
      </div>

      <div className="cart-body d-flex flex-column gap-3 p-3">
        {cartItems.length === 0 ? (
          <div className="d-flex flex-column align-items-center gap-4 mt-5">
            <img src={emptyCart} alt="Empty cart" width={184} height={184} />
            <div className="text-center">
              <h5 className="mb-1"> Your Cart is Empty</h5>
              <p className="text-secondary m-0">Time to pick your next pair!</p>
            </div>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="d-flex align-items-center gap-3">
              <img
                className="bg-light rounded"
                src={item.images[0]}
                alt={item.title}
                width={64}
                height={60}
                loading="lazy"
              />
              <div className="flex-grow-1">
                <h6 className="m-0">{item.title}</h6>
                <p className="m-0">{`$${item.price}`}</p>
              </div>

              <button
                className="cart-remove-button btn bg-dark text-white"
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.title} from cart`}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="d-flex flex-column gap-3 p-3 border-top">
          <h6 className="m-0">Total: {`$${totalPrice}`}</h6>
          <button className="btn bg-dark text-white" type="button">
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CartSidebar;
