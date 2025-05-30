import React, { useEffect, useState } from "react";
import { getSlider } from "../../../../services/Api";
import { getImageSlider } from "../../../ultils";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    getSlider({
      params: {
        sort: 1,
        limit: 10,
      },
    })
      .then(({ data }) => setSlider(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div id="slide" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ul className="carousel-indicators">
          {slider.map((item, index) => (
            <li
              data-target="#slide"
              data-slide-to={index}
              className={`${index === 0 ? "active" : ""}`}
            />
          ))}
        </ul>
        {/* The slideshow */}
        <div className="carousel-inner">
          {slider.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img src={getImageSlider(item.image)} alt="Vietpro Academy" />
            </div>
          ))}
        </div>
        {/* Left and right controls */}
        <a className="carousel-control-prev" href="#slide" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#slide" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
    </>
  );
};

export default Slider;
