import React from "react";
import "../assets/css/aboutus.css";

function About() {

   return (
      <main>
         <section className="aboutus-wrapper">
            <div className="logo-container">
               <img
                  loading="lazy"
                  src="https://northshoresoapworks.com/images/bird.png"
                  className="bird-img bird-1"
                  alt=""
               />
               <img
                  loading="lazy"
                  src="https://northshoresoapworks.com/images/logo.png"
                  className="aboutus-logo"
                  alt=""
               />
               <img
                  loading="lazy"
                  src="https://northshoresoapworks.com/images/bird.png"
                  className="bird-img"
                  alt=""
               />
            </div>

            <div className="aboutus-description">
               <p>
                  <img
                     loading="lazy"
                     src="https://northshoresoapworks.com/assets/staff_images/group-img.jpg"
                     className="shop-img"
                     alt=""
                  />
                  When you walk through the screen door at North Shore Soapworks the first thing you
                  notice is the wonderful smell and you look around for where it could be coming from. That's when
                  you realize that you have just entered a special place unlike anywhere you have ever been before.
                  The beautiful aroma is the combination of handmade artisan soaps laid out like fancy
                  cakes and pastries amongst flowers and cozy cottage decor. You experience a true
                  "harmony of the senses". What you don’t realize right away is that all this soap is made in the factory
                  on site behind the unassuming little door with a curtain.
                  <br />
                  <br />
                  Soap is not all there is at the store, Stephanie has a flare for items that are tastefully
                  unique at every glance. You can also browse for jewelry, clothing, home decor, baby & kids
                  goods and of course fresh cut flowers and plants. She even has introduced a pet care line made in-house.
                  The collection of thoughtfully curated items makes gift giving easy with beautifully packaged
                  products anyone would be happy to receive. Many of Stephanie’s customers keep
                  going back just to experience another "harmony of the senses".
               </p>
            </div>
         </section>

         <div className="separator">
            Our Hours And Where To Find Us
         </div>

         <section className="map-and-hours">
            <div>
               <iframe
                  className="map"
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d469031.33996050025!2d-80.28083160696865!3d42.75794635736395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d43.1984372!2d-80.1004636!4m5!1s0x882c5373d917aff9%3A0x6d596df7a4f1cf84!2s359%20Main%20St%2C%20Port%20Dover%2C%20ON%20N0A%201N0!3m2!1d42.7872164!2d-80.2044951!5e0!3m2!1sen!2sca!4v1723150853549!5m2!1sen!2sca"
                  width="100%"
                  height="600"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="hours">
               <h2>Hours Of Operation</h2>
               <hr />
               Monday: 10:00 AM – 5:00 PM <br />
               Tuesday: 10:00 AM – 5:00 PM <br />
               Wednesday: 10:00 AM – 5:00 PM <br />
               Thursday: 10:00 AM – 5:00 PM <br />
               Friday: 10:00 AM – 5:00 PM <br />
               Saturday: 10:00 AM – 5:00 PM <br />
               Sunday & Holidays: 12:00 – 4:00 PM <br />

            </div>
         </section>

         <div className="separator">
            Our knowledgeable staff are always happy to help you find the perfect gift or treat for yourself
         </div>

         <section className="worker-section">
            <div className="worker-container">
               <div className="worker">

                  <div className="worker-description">
                     <p>
                        <img
                           loading="lazy"
                           className="worker-img"
                           src="https://northshoresoapworks.com/assets/staff_images/stephanie.jpg"
                           alt="Worker"
                        />
                        <h4 className="worker-name">STEPHANIE MISNER</h4>
                        Meet Stephanie Misner, the owner and operator of North Shore Soapworks. She and her husband Scott, were both born and raised in
                        beautiful Port Dover and just couldn’t think of raising their
                        family anywhere else! Stephanie has been lucky enough to have worked as
                        a dental hygienist in the community for over 30 years and
                        physically she was ready for change. Her new venture as
                        owner/operator at North Shore Soapworks has continued to allow
                        her to be surrounded with wonderful people while still promoting wellness and
                        health. She is still able to be creative which satisfies her
                        artistic side. The best part is that she can bring her dog,
                        Daisy to work with her every day!
                     </p>

                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="https://northshoresoapworks.com/assets/staff_images/trish.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Trish</h4>
                     <p>
                        Our dynamic and creative soap maker that has been here since day ONE! Most
                        days Trish can be found in our little soap factory, conjuring up
                        fresh new ideas for soaps and scents, and of course, keeping
                        your long time favourites well stocked. Before becoming a soap
                        maker, Trish was a Pharmacy Technician for 20 years, which in
                        turn has made her the most organized of our bunch by far. Aren't
                        we all so lucky she made the jump into soap making?! In her
                        spare time Trish enjoys cooking, spending time with family and
                        friends, and taking care of her beautiful home. Here at North
                        Shore Soapworks we are thankful for Trish every day as she keeps
                        us on task, keeps us fed and keeps our water glasses full!
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="https://northshoresoapworks.com/assets/staff_images/sarah.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Sarah</h4>
                     <p>
                        The newest face at North Shore Soapworks.
                        Although her journey here has just begun, her history with
                        Stephanie goes back to day one. They are cousins and Steph played a
                        very large part in Sarah's childhood. The family vibe continues
                        through the entire staff as everyone has welcomed Sarah with open
                        arms. She has always loved people and all things that smell good
                        so whether she's out in the front or in the factory, she's in her
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
                        src="https://northshoresoapworks.com/assets/staff_images/haley.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Hayley</h4>
                     <p>
                        Now that we’ve got her back, Hayley can be found helping our
                        guests in the store, brewing up our signature lotions, salts,
                        and even dabbling in the soap making! Before stepping into her
                        position here, Hayley was an international flight attendant
                        which has provided her with the ability to seamlessly jump into
                        any role needed here and provide a high standard of
                        customer service. As a new mom, outside of the soap store Hayley
                        enjoys slow mornings with her daughter rediscovering all the
                        little things in life, spending time in nature, and renovating
                        their little home with her husband. Here at North Shore
                        Soapworks we are grateful for Hayley and the energy she brings.
                        She keeps us laughing, and she makes sure that our work playlists are spot on.
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="https://northshoresoapworks.com/assets/staff_images/rachelle.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Rachelle</h4>
                     <p>
                        Rachelle is our "Jill of all trades". On any given day Rachelle
                        can be found organizing anything and everything because she is
                        slightly type A, in the best way possible. She’s hands-on in the
                        factory and she’s always refreshing the store with her detailed
                        merchandising skills. She’s curated our dreamy Insta-aesthetic
                        and sets the tone for each day with her inspirational quotes.
                        Outside the soap store you might run into Rachelle at Sayza 🧘🏼‍♀️.
                        She loves to spend time in her garden, playing sports, and going on
                        adventures with her sweet growing family. At North Shore
                        Soapworks we love Rachelle for keeping it neat and tidy, her
                        tid-bits of important information, and her passion for snacks.
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="https://northshoresoapworks.com/assets/staff_images/emily.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Emily</h4>
                     <p>
                        Emily is our "girl Saturday". You can find her wrapping soap,
                        restocking shelves and she is our resident tech-girl. Her
                        favourite Northshore soap is Sunny Day, a fresh punch of citrus.
                        She is a proud Waterford Wolf, a volleyball enthusiast, and
                        loves jigsaw puzzles. In her free time, you can find her
                        wandering in the woods or on her stand-up paddleboard or playing with her new puppy.
                     </p>
                  </div>
               </div>
            </div>

            <div className="worker-container">
               <div className="worker">
                  <div className="worker-description">
                     <img
                        loading="lazy"
                        src="https://northshoresoapworks.com/assets/staff_images/daisy.jpg"
                        alt="Worker"
                     />
                     <h4 className="worker-name">Daisy</h4>
                     <p>
                        Meet Daisy -she’s a little girl with a big attitude! Daisy is an 9 year old Shih Tzu who can’t get enough of the “shop-dog life”-she lives for love, cuddles and treats (especially treats). Some believe that she is actually the owner of North Shore Soapworks and we all work for her!
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}

export default About;
