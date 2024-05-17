import React, { useRef, useState, useContext } from "react";
import HomeSoapCard from "../components/homeSoapCard.js";
import { DataContext } from "../hooks/dataContext.js";
import "../assets/css/home.css";
import { Link } from "react-router-dom";
import { filterProducts } from "../utils/filterProducts.js";

function Home() {
   const carouselRef = useRef(null);
   const [itemWidth, setItemWidth] = useState(300); // Initial width, adjust as needed
   const [search, setSearch] = useState(''); // Search for soap by name
   const dataProvider = useContext(DataContext);
   const data = dataProvider.data;
   const categories = dataProvider.categories;
   const soap_category_id = categories.find(category => category.name === 'Soap').id;
   const soaps = filterProducts(data, soap_category_id);

   const scrollLeft = () => {
      getImageWidth();
      console.log(itemWidth);
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
      console.log(itemWidth);
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
            <center>
               <img className="logo" src="http://northshoresoapworks.com/images/logo.png" alt="Logo" />
            </center>
            <center className="gallery">
               <h3>HAND MADE SOAP GALLERY</h3>
               <p>
                  Our soap is prized for its moisturizing properties, thanks to the presence of glycerine, which helps to maintain the skin's natural hydration levels. MORE...
               </p>
               <section className="soap-carousel">
                  <button onClick={scrollRight} className="arrow-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                     </svg>
                  </button>
                  <div className="carousel-content" ref={carouselRef} style={{ display: 'flex', overflowX: 'hidden' }}>

                     {
                        soaps.length === 0 ? <p className="text-center fs-3" style={{ width: '100%' }}>Error Getting Soaps</p> :
                           soaps.map((soap, index) => {
                              return (
                                 <HomeSoapCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                              )
                           })}

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
               <button className="sent-btn" onClick={() => setSearch("Lavender")}>Lavender</button>
               <button className="sent-btn" onClick={() => setSearch("Eucalyptus")}>Eucalyptus</button>
               <button className="sent-btn" onClick={() => setSearch("Citrus")}>Citrus</button>
               <button className="sent-btn" onClick={() => setSearch("Rose")}>Rose</button>
               <button className="sent-btn" onClick={() => setSearch("Peppermint")}>Peppermint</button>
               <button className="sent-btn" onClick={() => setSearch("Coconut")}>Coconut</button>
               <button className="sent-btn" onClick={() => setSearch("Sandalwood")}>Sandalwood</button>
            </div>
            <center className="sent-search-container">
               <label htmlFor="sent-search">Search For Your Favorite Fragrance: </label>
               <input type="text" className="fragrance-search" onInput={(event) => setSearch(event.target.value)} />
            </center>

            <div className="soap-search-results">

               {
                  search !== '' && (
                     <>
                        {
                           data.length === 0 ? <p>Error getting soaps.</p> :
                              (() => {
                                 const filteredSoaps = soaps.filter((soap) => {
                                    const { name, description } = soap.item_data;
                                    return name.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase());
                                 });

                                 return filteredSoaps.length === 0 ? <p>No search results found.</p> :
                                    filteredSoaps.map((soap, index) => (
                                       <HomeSoapCard key={index} soap={soap} index={index} related_objects={data.related_objects} />
                                    ));
                              })()
                        }
                     </>
                  )
               }
            </div>
         </section>

         <center className="category-header">
            <h2>
               We also have a wide range of household ideas, clothing and jewelry
            </h2>
         </center>

         <section className="category-container">
            <center>
               <div id="category-carousel" className="carousel home-carousel slide" data-bs-ride="carousel">
                  <div className="carousel-indicators">
                     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                     <div className="carousel-item active">
                        <img src="http://northshoresoapworks.com/images/slideshow_img_1.jpeg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>First slide label</h5>
                           <p>Some representative placeholder content for the first slide.</p>
                        </div>
                     </div>
                     <div className="carousel-item">
                        <img src="http://northshoresoapworks.com/images/slideshow_img_1.jpeg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>Second slide label</h5>
                           <p>Some representative placeholder content for the second slide.</p>
                        </div>
                     </div>
                     <div className="carousel-item">
                        <img src="http://northshoresoapworks.com/images/slideshow_img_1.jpeg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                           <h5>Third slide label</h5>
                           <p>Some representative placeholder content for the third slide.</p>
                        </div>
                     </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Next</span>
                  </button>
               </div>
            </center>

            <h1 className="categories-header" id="categories">Categories</h1>
            <hr />

            <center>
               <div className="categories">
                  {
                     categories.map(category => {
                        console.log(category);
                        const image_id = category.image_id;
                        const category_name = category.name;
                        const category_id = category.id;
                        let relatedObject = data.related_objects.find(obj => obj.type === 'IMAGE' && obj.id === image_id);

                        if (!relatedObject) {
                           relatedObject = {
                              "image_data": {
                                 "url": "http://northshoresoapworks.com/images/fancy_soap.webp",
                                 "name": "Fancy Soap"
                              }
                           }
                        }

                        const { url, image_name } = relatedObject.image_data;

                        let path;

                        if (category.name === 'Soap') {
                           path = '/soap';
                        } else {
                           path = "/display_items";
                        }

                        return (
                           <Link key={category.id} to={`/display_items/${category_id}`}>
                              <div className="category">
                                 <img src={url} alt={image_name} className="category-img" />
                                 <div className="title-container">
                                    <h4>{category_name}</h4>
                                 </div>
                              </div>
                           </Link>
                        );
                     })
                  }

               </div>
            </center>
         </section>

      </div>
   );
}

export default Home;