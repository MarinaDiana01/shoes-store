import "./ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card-container text-center h-100 shadow">
      <div className="product-card-header position-relative overflow-hidden">
        <img
          className="img-fluid bg-light pb-4"
          src={product.images[0]}
          alt={product.title}
          width={400}
          height={300}
          loading="lazy"
          onMouseEnter={(e) =>
            (e.currentTarget.src = product.images[1] || product.images[0])
          }
          onMouseLeave={(e) => (e.currentTarget.src = product.images[0])}
        />
        <button
          className="product-card-cart position-absolute start-50 d-flex justify-content-center align-items-center border-0 rounded-circle"
          type="button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.title} to cart`}
        >
          <i className="bi bi-cart3 fs-5"></i>
        </button>

        {product.tag ? (
          <span
            className={`badge product-status ${
              product.tag === "New" ? "bg-success" : "bg-danger"
            } position-absolute fs-6`}
            aria-label={product.tag === "New" ? "New product" : "On sale"}
          >
            {product.tag}
          </span>
        ) : null}
      </div>

      <div className="product-card-content pt-3 pb-4 border-top">
        {product.tag === "Sale" ? (
          <div className="d-flex justify-content-center gap-2 fw-bold">
            <span className="text-muted text-decoration-line-through">{`$${product.oldPrice}`}</span>
            <span className="text-danger">{`$${product.price}`}</span>
          </div>
        ) : (
          <span className="fw-bold">{`$${product.price}`}</span>
        )}
        <h3 className="fs-6 fw-bold m-0">{product.title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
