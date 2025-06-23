"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/shadcn/ui/carousel";
import Image from "next/image";
import { HomePage } from "../actions/get-home-page";

interface HeroCarouselProps {
  slides: HomePage["carouselCollection"];
}

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  if (!slides || slides.items.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.items.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative h-[500px] w-full">
                  {item?.image?.url ? (
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
