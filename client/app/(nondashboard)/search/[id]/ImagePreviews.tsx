"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrev = () => {
        setCurrentImageIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => Math.min(images.length - 1, prev + 1));
    };

    return (
        <div className="relative h-[450px] w-full">
            {images.map((image, index) => (
                <div
                    key={image}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={image}
                        alt={`Property Image ${index + 1}`}
                        fill
                        priority={index == 0}
                        className="object-cover cursor-pointer transition-transform duration-500 ease-in-out"
                    />
                </div>
            ))}
            {currentImageIndex > 0 && (
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary-700 bg-opacity-50 p-2 rounded-full focus:outline-none focus:ring focus:ring-secondary-300 z-10"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="text-white" />
                </button>
            )}
            {currentImageIndex < images.length - 1 && (
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-700 bg-opacity-50 p-2 rounded-full focus:outline-none focus:ring focus:ring-secondary-300 z-10"
                    aria-label="Next image"
                >
                    <ChevronRight className="text-white" />
                </button>
            )}
        </div>
    );
};

export default ImagePreviews;