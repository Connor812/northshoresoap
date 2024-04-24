import React from "react";
import "../assets/css/aboutus.css";

function About() {

   function handleWorkerChange(workerName) {

      // Remove the worker-active class from active-worker
      const activeWorker = document.querySelector(".worker-active");
      activeWorker.classList.remove("worker-active");


      // Add the worker-active class to the clicked worker
      const worker = document.getElementById(workerName);
      worker.classList.add("worker-active");

   }



   return (
      <main className="aboutus-wrapper">
         <div style={{ padding: '5%' }}>
            <center>
               <img className="logo" src="http://northshoresoapworks.com/images/logo.png" alt="Logo" />
            </center>

            <h1 className="aboutus-title p-4">About Us</h1>

            <section className="aboutus-container">
               <img className="shop-img" src="http://northshoresoapworks.com/images/shop_img.jpg" alt="Shop" />

               <div className="aboutus-description">
                  Cottage North soapworks is located at <a href="https://www.google.com/maps/place/359+Main+St,+Port+Dover,+ON+N0A+1N0/@42.787218,-80.204493,16z/data=!3m1!4b1!4m6!3m5!1s0x882c5373d9a321ed:0xec7dd0170266e4b0!8m2!3d42.787218!4d-80.204493!16s%2Fg%2F11csnz9ppx?entry=ttu">359 Main St. Port Dover Ontario Canada.</a>
                  Robin Laing started cottage North soapworks at the first location in 2000 and then the current location in 2002. It was her vision to have natural and attractive, handmade soaps available.
                  <br />
                  The second owners, Dori Lynne and John Shrubb purchased the business from Robin and continue to run cottage north soapworks in the same location for the next 14 years.
                  In January 2024 Stephanie Misner purchased cottage North Soapworks which is currently operating as north shore soapworks due to being forced to rebrand April 2024.
                  Since conception, Trish Peets has continued to be the main soap maker continues to this day turning out beautiful and functional works of art!
                  <br />
                  What is the soap made of?
                  <br />
                  Our soap is made of premium, natural, glycerine base, essential oils and or fragrance oils, natural mineral, pigments, and mica. Occasionally, food grade products are added to the soap, such as oatmeal or poppyseeds which aid in exfoliation and aesthetics
                  <br />
                  Who makes the soap?
                  <br />
                  Trish Peets continues to be the soap maker and began at day one working for Robin
                  Why is it premium soap?
                  Our soap is vegetable and vegan friendly. It contains no alcohol or harmful products to dry your skin. Glycerine makes it naturally hydrating and it gently cleanses without stripping the pH. Natural ingredient allows the soap to rinse clean, leaving no residue.
                  <br />
                  What kind of soap do you make?
                  <br />
                  We make all glycerine soaps in a variety of scents and colours. we do also carry some cold. Processed soap from Canadian made Wild Prairie, Love Fresh Stormy Acres as well as pet soap.
                  <br />
                  What else do you sell?
                  <br />
                  We make and sell a variety of our own natural bath and body care products from bubbles and salts to lotions and creams, including facial care products. We recently introduced a line of pet care products made in-house.
                  Who do you appeal to? Anyone looking to care for their body’s biggest organ with premium natural products
                  Describe the store in a few words-
                  Our top priority is creating a positive vibe-
                  An interesting collection of thoughtfully, curated products for your home, pets and personal style we make gift giving easy with beautiful products. Anyone would be happy to receive. The harmony of senses as you walk through the screen door creates an uplifting and positive experience.
                  <br />
                  What is it like to have a store in Port Dover?
                  <br />
                  I am fortunate enough to have grown up, raised my family and worked in Port Dover for my entire life. I am a true Doverite! It is so great to see friends, families, former classmates, and previous patients come through the screen door daily, as well as meeting all the new people either visiting Port Dover or recently relocated. I love people-all people-so I am right in my element!
                  <br />
                  What is your favourite item in the store?
                  <br />
                  Trish-carrot cream. It provides the perfect amount of moisture, even on my mature skin. It is a product I have consistently used and loved for years.
                  Rachelle-soap. I love trying a new scent and how fragrant they become when you use them. They leave your skin feeling soft and clean!
                  Hayley-salts. I love a salty ritual bath!
                  Steph-a mineral scrub, followed by body butter! Heaven!
                  <br />
                  Our customers
                  <br />
                  We see an eclectic mix of young and old, and from far away and from all walks of life. The common thread is that they all come for a feel good and happy uplifting vibe!
               </div>
            </section>





         </div>
         <section className="about-workers">

            <h1 className="text-center">Get To Know Our Employees</h1>

            <div className="worker-container worker-active" id="steph">
               <div className="worker" onClick={() => handleWorkerChange("steph")}>
               </div>
               <div className="worker-name-container">
                  <div className="worker-name">
                     Steph
                  </div>
               </div>
               <div className="worker-description-container">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <div className="worker-description">

                     <p>
                        <h1 className="">Stephanie Misner</h1>
                        <br />
                        I’m Stephanie Misner, the owner and operator of North Shore Soapworks . My husband, Scott and I were both born and raised in beautiful Port Dover and just couldn’t think of raising our family anywhere else! I have been lucky enough to have worked as a dental hygienist in the community for over 30 years and physically I was ready for change. My new venture as owner/operator at North Shore Soapworks has continued to allow me to be surrounded with wonderful people promoting wellness and health. I am also still able to be creative which satisfies my artistic side. and the best part is that I can bring my dog, Daisy to work with me every day! Life is good. </p>
                  </div>
               </div>
            </div>
            <div className="worker-container" id="sarah">
               <div className="worker" onClick={() => handleWorkerChange("sarah")}></div>
               <div className="worker-name-container">
                  <div className="worker-name">
                     Sarah
                  </div>
               </div>
               <div className="worker-description-container">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <div className="worker-description">

                     <p>
                        <h1 className="">Sarah</h1>
                        <br />
                        Hey, I’m Sarah- the newest face at North Shore soapworks. Although my journey here has just begun, my history with Stephanie goes back to day one. We are cousins and she played a very large part in my childhood. The family vibe continues through the entire staff as everyone has welcomed me with open arms. I have always loved people and all things that smell good. so whether I’m out in the front or in the factory, I’m in my element!</p>
                  </div>
               </div>
            </div>
            <div className="worker-container" id="emily">
               <div className="worker" onClick={() => handleWorkerChange("emily")}>

               </div>
               <div className="worker-name-container">
                  <div className="worker-name">
                     Emily
                  </div>
               </div>
               <div className="worker-description-container">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <div className="worker-description">

                     <p>
                        <h1 className="">Emily</h1>
                        <br />
                        Emily is our girl Saturday. You can find her wrapping soap, restocking shelves and she is our resident tech-girl. Her favourite Northshore soap is Sunny Day, a fresh punch of citrus. She is a proud Waterford Wolf, a volleyball enthusiast, and loves jigsaw puzzles. In her free time, you can find her wandering in the woods or on her stand-up paddleboard.</p>
                  </div>
               </div>
            </div>
            <div className="worker-container" id="hayley">
               <div className="worker" onClick={() => handleWorkerChange("hayley")}>

               </div>
               <div className="worker-name-container">
                  <div className="worker-name">
                     Hayley
                  </div>
               </div>
               <div className="worker-description-container">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <div className="worker-description">

                     <p>
                        <h1 className="">Hayley</h1>
                        <br />
                        Now that we’ve got her back, Hayley can be found helping our guests in the store, brewing up our signature lotions, salts, and even dabbling in the soap making!
                        Before stepping into her position here, Hayley was an International Flight Attendant which has provided her with the ability to seamlessly jump into any role needed here, and provide you a high standard of customer service.
                        As a new mom, outside of the soap store Hayley enjoys slow mornings with her daughter rediscovering all the little things in life, spending time in nature, and renovating their little home with her husband.
                        Here at North Shore Soapworks we are grateful for Hayley and the energy she brings, she keeps us laughing, and she makes sure our work playlists spot on.</p>
                  </div>
               </div>
            </div>
            <div className="worker-container" id="rachelle">
               <div className="worker" onClick={() => handleWorkerChange("rachelle")}>

               </div>
               <div className="worker-name-container">
                  <div className="worker-name">
                     Rachelle
                  </div>
               </div>
               <div className="worker-description-container">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <div className="worker-description">

                     <p>
                        <h1 className="">Rachelle</h1>
                        <br />
                        Rachelle is our Jill of all trades. On any given day Rachelle can be found organizing anything and everything because she is slightly type A, in the best way possible. She’s hands-on in the factory and she’s  always refreshing the store with her detailed merchandising skills. She’s curated our dreamy insta aesthetic and sets the tone for each day with her inspirational quotes.
                        Outside the soap store you might run into Rachelle at Sayza 🧘🏼‍♀️. She loves to spend time in her garden, playing sports, and on adventures with her sweet growing family.
                        At North Shore Soapworks we love Rachelle for keeping it neat and tidy, her tid-bits of important information, and her passion for snacks. </p>
                  </div>
               </div>
            </div>
            <div className="worker-container" id="trish">
               <div className="worker" onClick={() => handleWorkerChange("trish")}>

               </div>
               <div className="worker-name-container">
                  <div className="worker-name">
                     Trish
                  </div>
               </div>
               <div className="worker-description-container">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <div className="worker-description">

                     <p>
                        <h1 className="">Trish</h1>
                        <br />
                        Our dynamic and creative soap maker here since day ONE!
                        Most days Trish can be found in our little soap factory, conjuring up fresh new ideas for soaps and scents, and of course, keeping your long time favourites well stocked.
                        Before becoming a soap maker, Trish was a Pharmacy Technician for 20 years, which in turn has made her the most organized of our bunch by far.
                        Aren't we all so lucky she made the jump into soap making?!
                        In her spare time Trish enjoys cooking, spending time with family and friends, and taking care of her beautiful home.
                        Here at North Shore Soapworks we are thankful for Trish every day, she keeps us on task, she keeps us fed and our water glasses full!</p>
                  </div>
               </div>
            </div>




         </section>
      </main>
   );
}

export default About;