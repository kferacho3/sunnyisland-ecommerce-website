"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

async function fetchPinterestImages(query: string): Promise<string[]> {
  try {
    // Call your own API route to bypass CORS issues
    const url = `/api/pinterest?query=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Pinterest search error", res.statusText);
      return [];
    }
    const data = await res.json();
    console.log("Pinterest data:", data); // Check the structure in the console
    // Map the response data – adjust the path if needed
    const images: string[] =
      data.items?.map(
        (item: any) =>
          item.pin?.media?.images?.original?.url ||
          item.media?.images?.original?.url,
      ) || [];
    return images;
  } catch (error) {
    console.error("Pinterest search failed", error);
    return [];
  }
}

type PinterestImageProps = {
  query: string;
  alt: string;
  className?: string;
};

const PinterestImage: React.FC<PinterestImageProps> = ({
  query,
  alt,
  className,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchPinterestImages(query).then((imgs) => {
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
        className="absolute bottom-2 right-2 bg-white bg-opacity-75 text-xs p-1 shadow"
      >
        Next
      </button>
    </div>
  );
};

export default PinterestImage;
