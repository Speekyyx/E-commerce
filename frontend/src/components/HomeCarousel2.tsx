import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const data = [
  {
    image: "/carousel2/CPU.jpg",
    caption: "Central Processing Unit",
    description: "The central processing unit (CPU) is often referred to as the brain of the computer. It executes instructions and performs calculations necessary for a computer to function.",
    link: "/products/cpu" // Ajoutez l'URL de la page correspondante ici
  },
  {
    image: "/carousel2/GPU.jpg",
    caption: "Graphics Processing Unit",
    description: "The graphics processing unit (GPU) is responsible for rendering images, videos, and animations. It is essential for gaming, video editing, and other graphic-intensive tasks.",
    link: "/products/gpu" // Ajoutez l'URL de la page correspondante ici
  },
  {
    image: "/carousel2/motherboard.jpg",
    caption: "Motherboard",
    description: "The motherboard is the main circuit board of a computer. It houses the CPU, GPU, RAM, and other essential components, allowing them to communicate and work together.",
    link: "/products/motherboards" // Ajoutez l'URL de la page correspondante ici
  },
  {
    image: "/carousel2/RAM.jpg",
    caption: "Random Access Memory",
    description: "Random access memory (RAM) is a type of computer memory that allows data to be stored and retrieved quickly by the CPU. It is essential for multitasking and running applications smoothly.",
    link: "/products/ram" // Ajoutez l'URL de la page correspondante ici
  },
  {
    image: "/carousel2/ssd.jpg",
    caption: "Solid State Drive",
    description: "A solid state drive (SSD) is a storage device that uses flash memory to store data. It is faster and more reliable than traditional hard disk drives (HDDs), making it ideal for operating systems and frequently used programs.",
    link: "/products/ssd" // Ajoutez l'URL de la page correspondante ici
  },
  {
    image: "/carousel2/watercooling.jpg",
    caption: "Water Cooling System",
    description: "A water cooling system is a method of cooling computer components using liquid coolant. It is more efficient than air cooling and allows for quieter operation, making it popular among enthusiasts and overclockers.",
    link: "/products/cooling" // Ajoutez l'URL de la page correspondante ici
  }
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={10000}>
      {data.map((slide, i) => {
        return (
          <Carousel.Item key={i}>
            <Link href={slide.link}>
              <img className="d-block w-100" style={{ maxHeight: "400px" }} src={slide.image} alt="slider image" />
            </Link>
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
