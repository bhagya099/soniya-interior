import React from "react";
import IMAGES from "../image/img.js";
import Footer from "../Component/Footer";

export default function Home() {
  return (
    <>
      <div className="home-pics mb-4">
        {IMAGES.Home_image.map((slide, i) => (
          <img src={slide} alt="Home-pics" className="img" />
        ))}
      </div>

      <Footer />
    </>
  );
}
