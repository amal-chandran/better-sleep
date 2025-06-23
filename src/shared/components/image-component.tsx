import Image from "next/image";

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function ImageComponent(props: ImageComponentProps) {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width || 800}
        height={props.height || 600}
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
