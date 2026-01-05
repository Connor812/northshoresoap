import React from "react";

function hours() {
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
            </section>

            <h1 className="text-center mb-4 fs-1">Hours & Location</h1>
            <hr />
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

        </main>
    );
}

export default hours;
