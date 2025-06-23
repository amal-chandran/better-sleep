"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface ImageAndTextComponentProps {
  title: string;
  content: ReactNode; // React components from documentToReactComponents
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
}

function ImageAndTextComponent(props: ImageAndTextComponentProps) {
  const isImageLeft = (props.imagePosition || "left") === "left";

  return (
    <div
      className={`flex flex-col ${
        isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-8 lg:gap-16`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-lg overflow-hidden">
          <Image src={props.imageSrc} alt={props.imageAlt} fill className="object-cover" />
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{props.title}</h2>
        <div className="prose prose-lg text-gray-600 mb-6">{props.content}</div>
      </div>
    </div>
  );
}

export { ImageAndTextComponent };
