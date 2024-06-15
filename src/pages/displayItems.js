import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { filterProducts } from '../utils/filterProducts';
import { DataContext } from "../hooks/dataContext.js";
import ItemCard from '../components/itemCard';
import "../assets/css/display-items.css";
import "../assets/css/soap.css";
import SoapCarousel from '../components/soapCarousel.js';
import Spinner from 'react-bootstrap/Spinner';

function DisplayItems() {
  // Set up the pages
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);

  // set up the data
  const dataProvider = useContext(DataContext);
  const data = dataProvider.data;
  const loading = dataProvider.loading;
  const relatedObjects = data.related_objects;
  const categories = dataProvider.categories;
  const { categoryId } = useParams();

  const [category, setCategory] = useState(categories.find(category => category.id === categoryId));
  const [categoryName, setCategoryName] = useState(category ? category.name : '');
  const [childCategories, setChildCategories] = useState(category ? category.children_categories : []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [items, setItems] = useState([]);

  // Set up the rest of the pages
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const [categoryItems, setCategoryItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (!loading) {
      const category = categories.find(category => category.id === categoryId);
      if (category) {
        setCategory(category);
        setCategoryName(category.name);
        setChildCategories(category.children_categories);

        const items = filterProducts(data, categoryId);
        setItems(items);

        setTotalPages(Math.ceil(items.length / itemsPerPage));
        setCategoryItems(items);
        setCurrentItems(items.slice(0, itemsPerPage));
      } else {
        setCategory(null);
        setCategoryName('');
        setChildCategories([]);
        setItems([]);
        setTotalPages(0);
        setCategoryItems([]);
        setCurrentItems([]);
      }
    }
  }, [categoryId, loading, data, categories]); // dependency array

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    setCurrentItems(categoryItems.slice(startIndex, startIndex + itemsPerPage));
    window.scrollTo(0, 0);
  };

  const handleCategoryChange = (newCategoryId) => {
    if (newCategoryId === "") {
      setSelectedCategory(newCategoryId);
      setCategoryItems(items);
      setCurrentPage(1);
      setTotalPages(Math.ceil(items.length / itemsPerPage));
      setCurrentItems(items.slice(0, itemsPerPage));
      return;
    }

    setSelectedCategory(newCategoryId);
    const categoryItems = filterProducts(data, newCategoryId);
    setCategoryItems(categoryItems);
    setCurrentPage(1);
    setTotalPages(Math.ceil(categoryItems.length / itemsPerPage));
    setCurrentItems(categoryItems.slice(0, itemsPerPage));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="display-items-wrapper">
        <center>
          <h1 className='display-items-category-title'>
            <Link className="back-button" to="/northshoresoap">
              <svg width="20" height="20" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
              Back
            </Link>
            Category not found
          </h1>
        </center>
      </div>
    );
  }

  return (
    <div className="display-items-wrapper">
      {categoryName === 'Soap' ?
        <center style={{ padding: "10px" }}>
          <h1 className="display-items-soap-title">
            North Shore SoapWorks Artisan Soaps
          </h1>
          <p className="display-items-soap-description">
            All of our artesian made soaps at North Shore Soapworks are made right here in the factory by our soap maker. We use a glycerine soap base which is 100% vegetable based making them biodegradable and free of animal testing. This formula results in a smooth creamy texture as well as offering a skin nourishing lather that is highly moisturizing. Each soap has a PH between 9.5 and 10.5, each is safe for use on all skin types, and each is said to leave a thin humectant film of glycerine on the skin after it has been rinsed off. This beneficial layer helps to attract moisture from the air to the skin, maintaining the look and feel of skin that is healthy and supple.
            Essential oils and/or fragrance oils as well as natural mineral pigments and mica or food and cosmetic grade dye maybe added to some soaps to enhance their cosmetic appeal and truly make them a work of art.
          </p>
          <h1 className='display-items-category-title'>
            {categoryName === 'Soap' ? null : categoryName}
          </h1>
          <SoapCarousel />
        </center>
        :
        <center>
          <h1 className='display-items-category-title'>
            {categoryName}
          </h1>
        </center>}

      <div className='categories-nav-wrapper'>
        <div className="categories-nav-container">
          <div>
            <button
              value=""
              onClick={(event) => handleCategoryChange(event.target.value)}
              className={selectedCategory === "" ? 'selected' : ''}
            >
              View All
            </button>
            {childCategories.map((childCategory, index) => {
              return (
                <button
                  key={index}
                  value={childCategory.id}
                  onClick={(event) => handleCategoryChange(event.target.value)}
                  className={selectedCategory === childCategory.id ? 'selected' : ''}
                >
                  {childCategory.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className='categories-select-container'>
        <select className='categories-select' onChange={(event) => handleCategoryChange(event.target.value)}>
          <option value="">View All</option>
          {childCategories.map((childCategory, index) => {
            return (
              <option key={index} value={childCategory.id}>{childCategory.name}</option>
            )
          })}
        </select>
      </div>

      {categoryName === "soap" ? <hr /> : null}

      <center>
        <div className="display-item-container">
          {currentItems.length === 0
            ? <h2>No items found</h2>
            : currentItems.map((soap, index) => {
              return (
                <ItemCard key={index} soap={soap} related_objects={relatedObjects} index={index} />
              );
            })}
        </div>
      </center>

      <div className="pagination">
        <img loading="lazy" src="http://www.northshoresoapworks.com/images/small-arrow-left.png" alt="small arrow" />
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "pagination-btn pagination-active" : "pagination-btn"}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <img loading="lazy" src="http://www.northshoresoapworks.com/images/small-arrow-right.png" alt="small arrow" />
      </div>
    </div>
  );
}

export default DisplayItems;
