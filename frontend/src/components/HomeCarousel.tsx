import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  {
    image: "/carousel/carousel1.jpg",
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: "/carousel/carousel2.jpg",
    caption: "Caption",
    description: "Description Here",
  },
  {
    image: "/carousel/carousel3.jpg",
    caption: "Caption",
    description: "Description Here",
  },
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={10000}>
      {data.map((slide, i) => {
        return (
          <Carousel.Item key={i}>
            <img className="d-block w-100" src={slide.image} alt="slider image" />
            <Carousel.Caption>
              <h3>{slide.caption}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default HomeCarousel;
