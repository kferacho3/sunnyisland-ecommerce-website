"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

async function fetchGoogleImages(query: string): Promise<string[]> {
  try {
    const res = await fetch(
      `/api/serpapi/google_images?query=${encodeURIComponent(query)}`,
    );
    if (!res.ok) {
      console.error("Google Images search error", res.statusText);
      return [];
    }
    const data = await res.json();
    console.log("Google Images data:", data);
    // SerpAPI returns an array named "images_results"
    const images: string[] =
      data.images_results?.map((img: any) => img.thumbnail) || [];
    return images;
  } catch (error) {
    console.error("Google Images search failed", error);
    return [];
  }
}

type GoogleImagesProps = {
  query: string;
  alt: string;
  className?: string;
};

const GoogleImages: React.FC<GoogleImagesProps> = ({
  query,
  alt,
  className,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGoogleImages(query).then((imgs) => {
      setImages(imgs);
      setCurrentIndex(0);
    });
  }, [query]);

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        Loading…
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={images[currentIndex]}
        alt={alt}
        fill
        className={className || "object-cover"}
      />
      <button
        onClick={nextImage}
        className="absolute bottom-2 right-2 bg-white bg-opacity-75 text-xs p-1 rounded shadow"
      >
        Next
      </button>
    </div>
  );
};

export default GoogleImages;
