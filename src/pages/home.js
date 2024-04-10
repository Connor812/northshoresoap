import React, { useRef, useState, ReactFragment, useContext } from "react";
import Logo from "../assets/images/logo.png";
import soaps from "../assets/soaps/soaps.json";
import HomeSoapCard from "../components/homeSoapCard.js";
import { DataContext } from "../hooks/dataContext.js";
import "../assets/css/home.css";

function Home() {
   const carouselRef = useRef(null);
   const [itemWidth, setItemWidth] = useState(300); // Initial width, adjust as needed
   const [search, setSearch] = useState(''); // Search for soap by name
   const data = useContext(DataContext);

   console.log(search);

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
      const firstImage = document.querySelector('.soap-card img');
      if (firstImage) {
         setItemWidth(firstImage.clientWidth);
      }
   }

   return (
      <div>
         <section className="soap-search-wrapper">
            <center>
               <img className="logo" src={Logo} alt="Logo" />
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

                     {soaps.products.map((soap, index) => {
                        return (
                           <HomeSoapCard key={index} soap={soap} index={index} />
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

               {search !== '' && (
                  <div className="soap-search-results">
                     {soaps.products.map((soap, index) => {
                        if (soap.name.toLowerCase().includes(search.toLowerCase()) || soap.description.toLowerCase().includes(search.toLowerCase())) {
                           return (
                              <HomeSoapCard key={index} soap={soap} index={index} />
                           );
                        }
                        return null;
                     })}
                     {soaps.products.every((soap) => !soap.name.toLowerCase().includes(search.toLowerCase()) && !soap.description.toLowerCase().includes(search.toLowerCase())) && (
                        <p>No search results found.</p>
                     )}
                  </div>
               )}
            </div>
         </section>

         <center className="category-header">
            <h2>
               We also have a wide range of household ideas, clothing and jewelry
            </h2>
         </center>

         <section className="category-container">
            <center>
               <div id="category-carousel" className="carousel slide" data-bs-ride="carousel">
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


            <div className="categories">
               <div className="category">
                  <img src="http://northshoresoapworks.com/images/fresh_flower_cuts.jpg" alt="" className="category-img" />
                  <div className="title-container">
                     <h2>Daily Fresh Cut Flowers</h2>
                     <button>Order Ahead</button>
                  </div>
               </div>

               <div className="category">
                  <img src="http://northshoresoapworks.com/images/bath_skin_category.jpg" alt="" className="category-img" />
                  <div className="title-container">
                     <h2>Bath & Skin</h2>
                     <button>Order Ahead</button>
                  </div>
               </div>

               <div className="category">
                  <img src="http://northshoresoapworks.com/images/jewelery.jpg" alt="" className="category-img" />
                  <div className="title-container">
                     <h2>Jewelry</h2>
                     <button>Order Ahead</button>
                  </div>
               </div>

            </div>
            <div className="categories">
               <div className="category">
                  <img src="http://northshoresoapworks.com/images/clothing.jpg" alt="" className="category-img" />
                  <div className="title-container">
                     <h2>Clothing</h2>
                     <button>Order Ahead</button>
                  </div>
               </div>

               <div className="category">

               </div>

               <div className="category">

               </div>

            </div>
         </section>

      </div>
   );
}

export default Home;