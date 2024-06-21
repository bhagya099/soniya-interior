import React from "react";
import IMAGES from "../image/img.js";

export default function Home() {
  return (
    <div className="home-pics mb-4">
      {IMAGES.Home_image.map((slide, i) => (
        <img src={slide} alt="Home-pics" className="img" />
      ))}
    </div>
  );
}
