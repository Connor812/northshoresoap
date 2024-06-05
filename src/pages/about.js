import React from "react";
import { Helmet } from "react-helmet";
import "../assets/css/aboutus.css";

function About() {
   return (
      <main>
         <section className="aboutus-wrapper">
            <div className="logo-container">
               <img
                  loading="lazy"
                  src="http://northshoresoapworks.com/images/bird.png"
                  className="bird-img bird-1"
                  alt=""
               />
               <img
                  loading="lazy"
                  src="http://northshoresoapworks.com/images/logo.png"
                  className="aboutus-logo"
                  alt=""
               />
               <img
                  loading="lazy"
                  src="http://northshoresoapworks.com/images/bird.png"
                  className="bird-img"
                  alt=""
               />
            </div>

            <div className="aboutus-description">
               <p>
                  <img
                     loading="lazy"
                     src="http://northshoresoapworks.com/assets/staff_images/group-img.jpg"
                     className="shop-img"
                     alt=""
                  />
                  When you walk through the screen door at North Shore Soap Works the first thing you
                  notice is the wonderful smell and you look around for what it could be. That's when
                  you realize that you have just entered a special place unlike anywhere you have been.
                  The beautiful aroma is the combination of handmade artisan soaps laid out like fancy
                  cakes and pastries amongst flowers and cozy cottage decor. You experience a true
                  harmony of the senses. What you don’t realize right away is that all this soap is made
                  in the soap works behind the little door with the blue flower curtain.
                  <br />
                  Soap is not all there is at the store, Stephanie has a flare for items that are tastefully
                  unique at every glance. You can also browse for jewelry, clothing, home decor, kids
                  stuff and fresh cut flowers. She even has introduced a pet care line made in-house.
                  The collection of thoughtfully curated items makes gift giving easy with beautiful
                  products anyone would be happy to receive. Many of Stephanie’s customers keep
                  going back just to experience another harmony of the senses.
               </p>
            </div>
         </section>

         <div className="separator">
            Our staff is dedicated to helping you find what you want and show you
            new ideas
         </div>

         <section className="worker-section">
            <div className="worker-container">
               <div className="worker">

                  <div className="worker-description">
                     <p>
                        <img
                           loading="lazy"
                           className="worker-img"
                           src="http://northshoresoapworks.com/assets/staff_images/stephanie.jpg"
                           alt="Worker"
                        />
                        <h4 className="worker-name">STEPHANIE MISENER</h4>
                        I’m Stephanie Misner, the owner and operator of North Shore Soap
                        Works. My husband, Scott and I were both born and raised in
                        beautiful Port Dover and just couldn’t think of raising our
                        family anywhere else! I have been lucky enough to have worked as
                        a dental hygienist in the community for over 30 years and
                        physically I was ready for change. My new venture as
                        owner/operator at North Shore Soapworks has continued to allow
                        me to be surrounded with wonderful people promoting wellness and
                        health. I am also still able to be creative which satisfies my
                        artistic side. and the best part is that I can bring my dog,
                        Daisy to work with me every day!
                     </p>

                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="http://northshoresoapworks.com/assets/staff_images/trish.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Trish</h4>
                     <p>
                        Our dynamic and creative soap maker here since day ONE! Most
                        days Trish can be found in our little soap factory, conjuring up
                        fresh new ideas for soaps and scents, and of course, keeping
                        your long time favourites well stocked. Before becoming a soap
                        maker, Trish was a Pharmacy Technician for 20 years, which in
                        turn has made her the most organized of our bunch by far. Aren't
                        we all so lucky she made the jump into soap making?! In her
                        spare time Trish enjoys cooking, spending time with family and
                        friends, and taking care of her beautiful home. Here at North
                        Shore Soapworks we are thankful for Trish every day, she keeps
                        us on task, she keeps us fed and our water glasses full!
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="http://northshoresoapworks.com/assets/staff_images/sarah.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Sarah</h4>
                     <p>
                        Hey, I’m Sarah- the newest face at North Shore soapworks.
                        Although my journey here has just begun, my history with
                        Stephanie goes back to day one. We are cousins and she played a
                        very large part in my childhood. The family vibe continues
                        through the entire staff as everyone has welcomed me with open
                        arms. I have always loved people and all things that smell good.
                        so whether I’m out in the front or in the factory, I’m in my
                        element!
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="http://northshoresoapworks.com/assets/staff_images/haley.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Hayley</h4>
                     <p>
                        Now that we’ve got her back, Hayley can be found helping our
                        guests in the store, brewing up our signature lotions, salts,
                        and even dabbling in the soap making! Before stepping into her
                        position here, Hayley was an International Flight Attendant
                        which has provided her with the ability to seamlessly jump into
                        any role needed here, and provide you a high standard of
                        customer service. As a new mom, outside of the soap store Hayley
                        enjoys slow mornings with her daughter rediscovering all the
                        little things in life, spending time in nature, and renovating
                        their little home with her husband. Here at North Shore
                        Soapworks we are grateful for Hayley and the energy she brings,
                        she keeps us laughing, and she makes sure our work playlists
                        spot on.
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="http://northshoresoapworks.com/assets/staff_images/rachelle.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Rachelle</h4>
                     <p>
                        Rachelle is our Jill of all trades. On any given day Rachelle
                        can be found organizing anything and everything because she is
                        slightly type A, in the best way possible. She’s hands-on in the
                        factory and she’s always refreshing the store with her detailed
                        merchandising skills. She’s curated our dreamy insta aesthetic
                        and sets the tone for each day with her inspirational quotes.
                        Outside the soap store you might run into Rachelle at Sayza 🧘🏼‍♀️.
                        She loves to spend time in her garden, playing sports, and on
                        adventures with her sweet growing family. At North Shore
                        Soapworks we love Rachelle for keeping it neat and tidy, her
                        tid-bits of important information, and her passion for snacks.{" "}
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="http://northshoresoapworks.com/assets/staff_images/emily.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Emily</h4>
                     <p>
                        Emily is our girl Saturday. You can find her wrapping soap,
                        restocking shelves and she is our resident tech-girl. Her
                        favourite Northshore soap is Sunny Day, a fresh punch of citrus.
                        She is a proud Waterford Wolf, a volleyball enthusiast, and
                        loves jigsaw puzzles. In her free time, you can find her
                        wandering in the woods or on her stand-up paddleboard.
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="http://northshoresoapworks.com/assets/staff_images/daisy.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Daisy</h4>
                     <p>
                        Meet Daisy -she’s a little girl with a big attitude! Daisy is an 8 year old Shih Tzu who can’t get enough of the “shop-dog life”-she lives for love, cuddles and treats (especially treats). Some believe that she is actually the owner of North Shore Soapworks and we all work for her!
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}

export default About;
