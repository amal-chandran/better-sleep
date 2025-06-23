"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/shadcn/ui/carousel";
import Image from "next/image";

// Define the type for carousel items from Contentful
interface CarouselSlide {
  title?: string;
  description?: string;
  image?: {
    url?: string;
  };
  ctaText?: string;
  ctaLink?: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[] | null;
}

const HeroCarousel = ({ slides = [] }: HeroCarouselProps) => {
  // If no slides are provided, don't render anything
  if (!slides || slides.length === 0) {
    return null;
  }

  // Debug: Log all slide data
  console.log("Carousel slides:", slides);

  return (
    <section className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((item, index) => {
            console.log(`Slide ${index} image URL:`, item.image?.url);
            return (
              <CarouselItem key={index}>
                <div className="relative h-[500px] w-full">
                  {/* Only show the image */}
                  {item.image?.url ? (
                    <div className="h-full w-full relative">
                      <Image
                        src={item.image.url}
                        alt={item.title || "Carousel image"}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <p className="text-white text-xl">No image available</p>
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute left-4 right-4 top-1/2 flex justify-between -translate-y-1/2 z-10">
          <CarouselPrevious className="relative left-0 translate-y-0" />
          <CarouselNext className="relative right-0 translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
