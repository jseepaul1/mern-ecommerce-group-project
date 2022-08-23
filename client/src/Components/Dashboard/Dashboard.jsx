import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Products from "../Products/Products";
import Pagination from "./Pagination/Pagination";
import { Search } from "react-bootstrap-icons";
import debounce from "lodash.debounce";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productsPerPage] = useState(9);
  const filters = [
    "Jeans",
    "Shirts",
    "Suits",
    "Coats",
    "Dresses",
    "Hoodies",
    "Hats",
    "Shoes",
    "Shorts",
    "Sweaters",
    "Gym clothes",
    "High heels",
    "Skirts",
    "Socks",
    "Tie",
    "Caps",
    "Scarfs",
    "Swimsuits",
    "Pajamas",
  ];

  const getProducts = async (category, productName) => {
    setLoading(true);
    let url = "http://localhost:8000/api/products";
    const searchParams = new URLSearchParams();
    if (category) {
      searchParams.append("category", category);
    }

    if (productName) {
      searchParams.append("productName", productName);
    }

    const urlSearchString = searchParams.toString();

    if (urlSearchString) {
      url += `?${urlSearchString}`;
    }

    const res = await axios.get(url, {
      withCredentials: true,
    });
    console.log(res.data);
    setProducts(res.data);
    setLoading(false);
  };

  // Get all products
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts(category, productName);
  }, [category, productName]);

  const updateCategory = (filter) => {
    filter === category ? setCategory("") : setCategory(filter);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Search for clothes here..."
        />
        <div className="search-icon-container">
          <Search size={30} />
        </div>
      </div>
      <h1 className="container mt-5">
        <div className="d-flex">
          <div className="filterBar px-5 py-2 me-5">
            {filters.map((filter, index) => (
              <h4 key={index} onClick={() => updateCategory(filter)}>
                <Link
                  className={`links ${
                    category === filter ? "active-link" : ""
                  }`}
                  to={""}
                >
                  {filter}
                </Link>
              </h4>
            ))}
          </div>
          <Products products={currentProducts} loading={loading} />
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      </h1>
    </div>
  );
};

export default Dashboard;
