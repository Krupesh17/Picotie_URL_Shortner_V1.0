import React, { useEffect, useRef, useState } from "react";

const CarouselViewBox = ({
  children,
  contentListForDotNavigation = [],
  autoSlide = true,
  autoSlideDuration = 2500,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const mouseMoveX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (
      diff > threshold &&
      currentSlide < contentListForDotNavigation.length - 1
    ) {
      setCurrentSlide(currentSlide + 1);
    } else if (diff < -threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    mouseStartX.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    mouseMoveX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = mouseStartX.current - mouseMoveX.current;
    const threshold = 50;

    if (
      diff > threshold &&
      currentSlide < contentListForDotNavigation.length - 1
    ) {
      setCurrentSlide(currentSlide + 1);
    } else if (diff < -threshold && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!autoSlide) return;

    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= contentListForDotNavigation.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, autoSlideDuration);

    return () => clearInterval(autoSlideInterval);
  }, [autoSlide]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {children}
        </div>
      </div>

      {/* Dots Navigation */}
      {contentListForDotNavigation && (
        <div className="flex justify-center gap-2 mt-4">
          {contentListForDotNavigation.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? "w-8 bg-primary" : "w-2 bg-secondary"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselViewBox;
