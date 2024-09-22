import { useState, useEffect } from "react";
import "../css/carousel.css";

const images = [
    // "/carousel-photos/pexels-fotios-photos-1161547.jpg",
    "/carousel_photos/pexels-janetrangdoan-1092730.jpg",
    "/carousel_photos/pexels-janetrangdoan-1132047.jpg",
    "/carousel_photos/pexels-lovefoodart-1437598.jpg",
    "/carousel_photos/pexels-lum3n-44775-1028599.jpg",
    "/carousel_photos/pexels-mali-142520.jpg",
    "/carousel_photos/pexels-pixabay-65256.jpg",
];

function Carousel() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };
    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 1500); // Slide every 1 second

        // Cleanup interval on component unmount
        return () => clearInterval(autoSlide);
    }, [current]); // Dependency array includes `current` to reset the interval on each slide change

    return (
        <>
            <div className="carousel-container" >
                <div className="left-arrow" onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div className="carousel-image">
                    {images.map((item, index) =>
                        current === index && <img key={index} src={item} alt="Carousel Slide" />
                    )}
                </div>
                <div className="right-arrow" onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </>
    );
}

export default Carousel;
