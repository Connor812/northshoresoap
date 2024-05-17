import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { filterProducts } from '../utils/filterProducts';
import { DataContext } from "../hooks/dataContext.js";
import ItemCard from '../components/itemCard';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../assets/css/display-items.css";

function DisplayItems() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShow(true);
  }

  const dataProvider = useContext(DataContext);
  const data = dataProvider.data;
  const categories = dataProvider.categories;
  const { categoryId } = useParams();
  const category = categories.find(category => category.id === categoryId);
  const categoryName = category.name;
  const childCategories = category.children_categories;

  return (
    <div className="display-items-wrapper">

      <Offcanvas className="sub-categories" show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header>
          <Offcanvas.Title className='sub-categories-title-container'>
            <h1>
              Categories
            </h1>
            <button className='sub-categories-close-btn' onClick={() => { handleClose() }}>
              <svg width="40" height="40" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          {childCategories.map((childCategory) => {

            const childCategoryName = childCategory.name;
            const childCategoryId = childCategory.id;

            return (
              <div className="sub-category">
                <a className="sub-category-link" href={`#${childCategoryId}`} onClick={() => handleClose()} >
                  {childCategoryName}
                </a>
              </div>
            )
          })}


        </Offcanvas.Body>
      </Offcanvas>

      <button className="show-sub-categories-btn" onClick={(event) => handleShow(event)}>
        <svg width="15" height="15" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>

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
          <section id={childCategoryId}>
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