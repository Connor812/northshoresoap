import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { filterProducts } from '../utils/filterProducts';
import { DataContext } from "../hooks/dataContext.js";
import ItemCard from '../components/itemCard';
import "../assets/css/display-items.css";

function DisplayItems() {
  const location = useLocation();
  const dataProvider = useContext(DataContext);
  const data = dataProvider.data;
  const category = location.state && location.state.category; // Access category from location state
  const categoryName = category.name;
  const categoryId = category.id;
  const childCategories = category.children_categories;

  console.log(category);

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

      {childCategories.map((childCategory) => {

        const childCategoryName = childCategory.name;
        const childCategoryId = childCategory.id;

        const categoryItems = filterProducts(data, childCategoryId);

        return (
          <section>
            <center>
              <h1>{childCategoryName}</h1>
              <hr />
            </center>

            <div className="display-item-container">

              {
                categoryItems.length === 0
                  ? <h3 className="no-items">No items in this category</h3>
                  :
                  categoryItems.map((item, index) => {

                    return (
                      <ItemCard key={index} soap={item} related_objects={data.related_objects} index={index} />
                    )

                  })}

            </div>
          </section>
        )
      })}
    </div>
  );
}

export default DisplayItems;