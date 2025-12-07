import "./ProductsFilter.css";

const ProductsFilter = ({
  activeFilter,
  setActiveFilter,
  displayedProducts,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap mb-5">
      <p className="products-filter-info text-muted mb-sm-0">
        Showing <strong>{displayedProducts.length}</strong> Products for "All"
      </p>
      <div>
        <label className="visually-hidden" htmlFor="product-filter">
          Filter products
        </label>
        <select
          id="product-filter"
          className="product-filter form-select bg-light py-2 fs-6 border-0"
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          aria-label="Filter products"
        >
          <option value="all">All products</option>
          <option value="new">New products</option>
          <option value="sale">Sale products</option>
          <option value="womens-shoes">Women's shoes</option>
          <option value="mens-shoes">Men's shoes</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsFilter;
