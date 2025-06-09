import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaArrowRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "../styles/Category.css";
import api from "../API/index";

const Category = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/categories?page=${page}`);
      setCategories(res.data.categories);
      setTotalPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

 const fetchUserCategories = async () => {
  if (!userId) return;
  try {
    const res = await axios.get(`${api}/categories/user/${userId}`); 
    if (res.data.selectedCategories) {
      setSelectedCategories(res.data.selectedCategories.map((cat) => cat._id));
    }
  } catch (err) {
    console.log("Error fetching user categories", err);
  }
};


  useEffect(() => {
    fetchCategories(page);
    fetchUserCategories();
  }, [page]);

 const handleCheckboxChange = async (categoryId) => {
   console.log(userId,"??????");
   
    if (!userId) {
      setError("User ID is missing");
      return;
    }

    const updatedSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedSelected);

    try {
      await axios.post(`${api}/categories/select`, {
        userId,
        selectedCategoryIds: updatedSelected,
      });
    } catch (err) {
      setError("Error saving selected categories: " + err.message);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="category-container">
      <div className="category-title-box">
        <h2 className="category-heading">Please mark your interests!</h2>
        <span className="description">We will keep you notified.</span>
      </div>
      <hr className="horizontal-line" />
      {error && <p className="category-error">{error}</p>}

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="category-list-container">
          <h4 className="category-list-heading">My saved interests!</h4>
          <div className="category-list">
            {categories.map((cat) => (
              <div key={cat._id} className="category-list-item">
                <label htmlFor={cat._id}>
                  <input
                type="checkbox"
                className="check-box"
                    checked={selectedCategories.includes(cat._id)}
                    onChange={() => handleCheckboxChange(cat._id)}
                  />
                  {" " + cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="category-pagination">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="category-page-button"
          aria-label="First Page">
          <FaAngleDoubleLeft />
        </button>

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="category-page-button"
          aria-label="Previous Page">
          <FaArrowLeft />
        </button>

        {getPageNumbers().map((num, idx) =>
          num === "..." ? (
            <span key={idx} className="category-page-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => setPage(num)}
              className={`category-page-number ${
                page === num ? "active" : ""
              }`}>
              {num}
            </button>
          )
        )}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="category-page-button"
          aria-label="Next Page">
          <FaArrowRight />
        </button>

        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="category-page-button"
          aria-label="Last Page">
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Category;
