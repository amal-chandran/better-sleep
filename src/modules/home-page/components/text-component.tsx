"use client";

import { renderRichText } from "@/shared/helpers/render-rich-text";
import { Document } from "@contentful/rich-text-types";

interface TextComponentProps {
  title?: string;
  content: Document | null;
  align?: "left" | "center" | "right";
}

function TextComponent(props: TextComponentProps) {
  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const alignValue = props.align || "left";
  const renderedContent = renderRichText(props.content);

  return (
    <div className={`max-w-4xl mx-auto py-8 px-4 ${textAlign[alignValue]}`}>
      {props.title && (
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{props.title}</h2>
      )}
      <div className="prose prose-lg text-justify max-w-none text-gray-700">
        {renderedContent}
      </div>
    </div>
  );
}

export { TextComponent };
