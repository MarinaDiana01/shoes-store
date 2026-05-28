import { useState, useEffect } from "react";
import ProductsFilter from "../ProductsFilter/ProductsFilter";
import ProductCard from "../ProductCard/ProductCard";
import { Spinner } from "react-bootstrap";
import productsError from "../../assets/images/errors/products-error.png";
import noResults from "../../assets/images/search/no-results.svg";

const ProductsList = ({ searchText, addToCart }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const getProductsData = async () => {
    try {
      setLoading(true);
      const [womens, mens] = await Promise.all([
        fetch("https://dummyjson.com/products/category/womens-shoes").then(
          (serverResponse) => serverResponse.json(),
        ),
        fetch("https://dummyjson.com/products/category/mens-shoes").then(
          (serverResponse) => serverResponse.json(),
        ),
      ]);

      const addProductStatus = (productsList) =>
        productsList.map((product, index) => {
          const isSale = product.price > 100;
          const isNew = index < 2;

          return {
            ...product,
            oldPrice: isSale ? (product.price * 1.2).toFixed(2) : null,
            tag: isSale ? "Sale" : isNew ? "New" : null,
          };
        });

      const products = [
        ...addProductStatus(womens.products),
        ...addProductStatus(mens.products),
      ];
      setProducts(products);
    } catch (error) {
      setError("Could not load products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (activeFilter === "new" || activeFilter === "sale") {
      filteredProducts = filteredProducts.filter((product) =>
        product.tag ? product.tag.toLowerCase() === activeFilter : null,
      );
    }

    if (activeFilter === "womens-shoes" || activeFilter === "mens-shoes") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === activeFilter,
      );
    }

    if (activeFilter === "low") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (activeFilter === "high") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (searchText.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return filteredProducts;
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div className="p-5">
      <ProductsFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        displayedProducts={displayedProducts}
      />
      <div className="row row-gap-4">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="grow" variant="secondary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className="text-center">
            <img
              src={productsError}
              alt="Unable to load products"
              height={190}
            />
            <h4 className="mb-1">Unable to load products</h4>
            <p className="mb-0">Please try again later</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="col-12 p-0">
            <div className="text-center">
              <img
                className="mt-5 mb-4"
                src={noResults}
                alt="No products found"
                height={160}
                loading="lazy"
              />
              <h3 className="m-1">No Products Found</h3>
              <p className="text-secondary m-0">
                Your search did not match any products
              </p>
              <p className="text-secondary fw-medium m-0">Please try again</p>
            </div>
          </div>
        ) : (
          displayedProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-sm-6 col-md-4">
              <ProductCard
                product={product}
                addToCart={() => addToCart(product)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsList;
