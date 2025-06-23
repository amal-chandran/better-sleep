"use client";

import { ReactNode } from "react";

interface TextComponentProps {
  title?: string;
  content: ReactNode; // React components from documentToReactComponents
  align?: "left" | "center" | "right";
}

function TextComponent(props: TextComponentProps) {
  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const alignValue = props.align || "left";

  return (
    <div className={`max-w-4xl mx-auto py-8 px-4 ${textAlign[alignValue]}`}>
      {props.title && (
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{props.title}</h2>
      )}
      <div className="prose prose-lg max-w-none text-gray-700">
        {props.content}
      </div>
    </div>
  );
}

export { TextComponent };
