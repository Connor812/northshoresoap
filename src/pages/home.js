import React, { useRef, useState, useContext } from "react";
import HomeSoapCard from "../components/homeSoapCard.js";
import HomeCarousel from "../components/homeCarousel.js";
import { DataContext } from "../hooks/dataContext.js";
import { Link } from "react-router-dom";
import { filterProducts } from "../utils/filterProducts.js";
import Spinner from "react-bootstrap/Spinner";

import "../assets/css/home.css";

function Home() {

   const carouselRef = useRef(null);
   const [itemWidth, setItemWidth] = useState(300); // Initial width, adjust as needed
   const [search, setSearch] = useState(''); // Search for soap by name
   const dataProvider = useContext(DataContext);
   const data = dataProvider.data;
   const loading = dataProvider.loading;
   const categories = dataProvider.categories;

   const soap_category_id = "OLETSRZV2TEPVL3SALMWIC6Y";
   const soaps = loading ? [] : filterProducts(data, soap_category_id);

   const scrollLeft = () => {
      getImageWidth();
      if (carouselRef.current) {
         carouselRef.current.scrollTo({
            top: 0,
            left: carouselRef.current.scrollLeft + itemWidth,
            behavior: 'smooth'
         });
      }
   };

   const scrollRight = () => {
      getImageWidth();
      if (carouselRef.current) {
         carouselRef.current.scrollTo({
            top: 0,
            left: carouselRef.current.scrollLeft - itemWidth,
            behavior: 'smooth'
         });
      }
   };

   function getImageWidth() {
      const firstImage = document.querySelector('.soap-card');
      if (firstImage) {
         setItemWidth(firstImage.clientWidth);
      }
   }

   return (
      <div>
         <section className="soap-search-wrapper">
            <div className="logo-container">
               <img
                  loading="lazy"
                  src="https://northshoresoapworks.com/images/bird.png"
                  className="bird-img bird-1"
                  alt="Bird"
               />
               <img
                  loading="lazy"
                  src="https://northshoresoapworks.com/images/logo.webp"
                  className="aboutus-logo"
                  width="1018"
                  height="255"
                  alt="Logo"
               />
               <img
                  loading="lazy"
                  src="https://northshoresoapworks.com/images/bird.png"
                  className="bird-img"
                  alt="Bird"
               />
            </div>
            <center className="gallery">
               <h1>HAND MADE SOAP GALLERY</h1>
               <p className="arial">
                  At North Shore Soapworks we specialize in handcrafted artesian soap made on site with high-quality, ethically, sourced and sustainable ingredients. We offer a unique selection of specialty soaps along with a large selection of complementary bath and body products for both men and women as well as children and pets. We also curate a variety of gift sets to treat yourself or someone special.

               </p>
               <hr />
               <h2>
                  Scroll To See Our Soap Collection
               </h2>
               <section className="soap-carousel">
                  <button onClick={scrollRight} className="arrow-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                     </svg>
                  </button>
                  <div className="carousel-content" ref={carouselRef} style={{ display: 'flex', overflowX: 'scroll' }}>
                     {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: "248.4px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                           <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                           </Spinner>
                        </div>
                     ) : (
                        soaps.length === 0 ? (
                           <p className="text-center fs-3" style={{ width: '100%' }}>Error Getting Soaps</p>
                        ) : (
                           soaps.map((soap, index) => (
                              <HomeSoapCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                           ))
                        )
                     )}
                  </div>
                  <button onClick={scrollLeft} className="arrow-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                     </svg>
                  </button>
               </section>
            </center>

            <p className="text-center">SELECT A SOAP TO LEARN ABOUT ITS GOODNESS & YOU CAN MIX AND MATCH</p>
            <div className="sent-btn-container">
               <button className="sent-btn" onClick={() => setSearch("lavender")}>Lavender</button>
               <button className="sent-btn" onClick={() => setSearch("eucalyptus")}>Eucalyptus</button>
               <button className="sent-btn" onClick={() => setSearch("citrus")}>Citrus</button>
               <button className="sent-btn" onClick={() => setSearch("rose")}>Rose</button>
               <button className="sent-btn" onClick={() => setSearch("peppermint")}>Peppermint</button>
               <button className="sent-btn" onClick={() => setSearch("coconut")}>Coconut</button>
               <button className="sent-btn" onClick={() => setSearch("sandalwood")}>Sandalwood</button>
            </div>
            <center className="sent-search-container">
               <label htmlFor="sent-search">Search For Your Favorite Fragrance: </label>
               <input type="text" aria-label="Search For Soap" className="fragrance-search" onInput={(event) => setSearch(event.target.value)} />
            </center>

            <div className="soap-search-results">
               {search !== '' && (
                  <>
                     {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                           <Spinner animation="border" role="status" style={{ color: "var(--mocha)" }}>
                              <span className="visually-hidden">Loading...</span>
                           </Spinner>
                        </div>
                     ) : (
                        data.length === 0 ? (
                           <p>Error getting soaps.</p>
                        ) : (
                           (() => {
                              const filteredSoaps = soaps.filter((soap) => {
                                 const { name, description } = soap.item_data;
                                 return name.toLowerCase().includes(search.toLowerCase()) ||
                                    (description && description.toLowerCase().includes(search.toLowerCase()));
                              });

                              return filteredSoaps.length === 0 ? (
                                 <p>No search results found.</p>
                              ) : (
                                 filteredSoaps.map((soap, index) => (
                                    <HomeSoapCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                 ))
                              );
                           })()
                        )
                     )}
                  </>
               )}
            </div>
         </section>

         <center className="category-header">
            <h3>
               We also have a wide range of household ideas, clothing and jewelry
            </h3>
         </center>

         <section className="category-container">
            <center>
               {loading ? (
                  <div className="home-carousel-placeholder">
                     <Spinner animation="border" role="status" style={{ color: "var(--mocha)" }}>
                        <span className="visually-hidden">Loading...</span>
                     </Spinner>
                  </div>
               ) : (
                  <HomeCarousel />
               )}
            </center>

            <h1 className="categories-header" id="categories">Categories</h1>
            <hr />

            <center>
               <div className="categories">
                  {loading ? (
                     <div className="d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
                        <Spinner animation="border" role="status" style={{ color: "var(--mocha)" }}>
                           <span className="visually-hidden">Loading...</span>
                        </Spinner>
                     </div>
                  ) : (
                     categories.map(category => {
                        const image_id = category.image_id;
                        const category_name = category.name;
                        const category_id = category.id;
                        let relatedObject = data.related_objects.find(obj => obj.type === 'IMAGE' && obj.id === image_id);

                        if (!relatedObject) {
                           relatedObject = {
                              "image_data": {
                                 "url": "https://northshoresoapworks.com/images/fancy_soap.webp",
                                 "name": "Fancy Soap"
                              }
                           }
                        }

                        const { url } = relatedObject.image_data;

                        return (
                           <Link className="category" key={category.id} to={`/display_items/${category_id}`}>
                              {category_name}
                           </Link>
                        );
                     })
                  )}
               </div>
            </center>
         </section>
      </div>
   );
}

export default Home;