import React from "react";
import meter1 from "../assets/img/contact-new.svg";
import meter2 from "../assets/img/file-pencil.svg";
import meter3 from "../assets/img/wallet-new.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";

export const Steps = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <section
      className="steps"
      id="steps"
      style={{
        backgroundColor: "#000",
        padding: "50px 0",
        position: "relative",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <div className="container">
        <h2 style={{ background: "linear-gradient(135deg, #800080, #FF1493)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          How do I refer?
        </h2>
        <p>Follow these three steps to refer and earn rewards.</p>
        <Carousel
          responsive={responsive}
          infinite={true}
          className="steps-slider"
          arrows={false}  // 🔹 Removed side buttons
        >
          <div className="item">
            <img src={meter1} alt="Step 1" />
            <p>Submit referrals easily via our website's referral section.</p>
          </div>
          <div className="item">
            <img src={meter2} alt="Step 2" />
            <p>Earn rewards once your referral joins an Accredian program.</p>
          </div>
          <div className="item">
            <img src={meter3} alt="Step 3" />
            <p>Referrer receives a bonus 30 days after program enrollment.</p>
          </div>
        </Carousel>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Decoration" style={{ position: "absolute", bottom: 0, left: 0, width: "100px", opacity: 0.6 }} />
    </section>
  );
};
