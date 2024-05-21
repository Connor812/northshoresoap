import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { filterProducts } from '../utils/filterProducts';
import { DataContext } from "../hooks/dataContext.js";
import ItemCard from '../components/itemCard';
import "../assets/css/display-items.css";

function DisplayItems() {

  // Set up the pages
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // set up the data
  const dataProvider = useContext(DataContext);
  const data = dataProvider.data;
  const relatedObjects = data.related_objects
  const categories = dataProvider.categories;
  const { categoryId } = useParams();
  const category = categories.find(category => category.id === categoryId);
  const categoryName = category.name;
  const childCategories = category.children_categories;

  const items = filterProducts(data, categoryId);

  // Set up the rest of the pages
  const [totalPages, setTotalPages] = useState(Math.ceil(items.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const [categoryItems, setCategoryItems] = useState(items);
  const [currentItems, setCurrentItems] = useState(items.slice(startIndex, startIndex + itemsPerPage));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    setCurrentItems(categoryItems.slice(startIndex, startIndex + itemsPerPage));
    window.scrollTo(0, 0);
  }

  const handleCategoryChange = (newCategoryId) => {
    const categoryItems = filterProducts(data, newCategoryId);
    setCategoryItems(categoryItems);
    setCurrentPage(1);
    setTotalPages(Math.ceil(categoryItems.length / itemsPerPage));
    setCurrentItems(categoryItems.slice(0, itemsPerPage));
  }

  return (
    <div className="display-items-wrapper">
      <center>
        <h1 className='display-items-category-title'>
          <Link className="back-button" to="/northshoresoap">
            <svg width="25" height="25" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            Back
          </Link>
          {categoryName}
        </h1>
        <hr />
      </center>

      <div className='categories-select-wrapper'>
        <div className="categories-select-container">
          <div>
            {childCategories.map((childCategory, index) => {
              return (
                <button key={index} value={childCategory.id} onClick={(event) => handleCategoryChange(event.target.value)}>{childCategory.name}</button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="display-item-container">

        {currentItems.length === 0
          ? <h2>No items found</h2>
          : currentItems.map((soap, index) => {
            return (
              <ItemCard key={index} soap={soap} related_objects={relatedObjects} index={index} />
            );
          })}

      </div>

      <div className="pagination">
        <img src="http://www.northshoresoapworks.com/images/small-arrow-left.png" alt="small arrow" />
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "pagination-btn pagination-active" : "pagination-btn"}
          >
            {index + 1}
          </button>
        ))}
        <img src="http://www.northshoresoapworks.com/images/small-arrow-right.png" alt="small arrow" />
      </div>
    </div>
  );
}

export default DisplayItems;