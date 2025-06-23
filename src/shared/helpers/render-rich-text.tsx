import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Renders Contentful rich text document to React components
 * @param document - The rich text document from Contentful
 * @returns React components
 */
export const renderRichText = (document: Document | null | undefined) => {
  if (!document) {
    return null;
  }

  // Default renderers
  const defaultOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="px-1 py-0.5 bg-gray-100 rounded">{text}</code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: unknown, children: React.ReactNode) => (
        <p className="mb-4">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: unknown, children: React.ReactNode) => (
        <h1 className="text-4xl font-bold mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: unknown, children: React.ReactNode) => (
        <h2 className="text-3xl font-bold mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: unknown, children: React.ReactNode) => (
        <h3 className="text-2xl font-bold mb-2">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: unknown, children: React.ReactNode) => (
        <h4 className="text-xl font-bold mb-2">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: unknown, children: React.ReactNode) => (
        <h5 className="text-lg font-bold mb-2">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: unknown, children: React.ReactNode) => (
        <h6 className="text-base font-bold mb-2">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (node: unknown, children: React.ReactNode) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: unknown, children: React.ReactNode) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: unknown, children: React.ReactNode) => (
        <li className="mb-1">{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: unknown, children: React.ReactNode) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-6" />,
      [INLINES.HYPERLINK]: (node, children: React.ReactNode) => (
        <Link
          href={node.data.uri}
          className="text-blue-600 hover:underline"
          target={node.data.uri.startsWith("http") ? "_blank" : undefined}
        >
          {children}
        </Link>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node, children: React.ReactNode) => (
        <Link
          href={`/${node.data.target.sys.id}`}
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      ),
      [INLINES.ASSET_HYPERLINK]: (node, children: React.ReactNode) => (
        <Link
          href={node.data.target.fields.file.url}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          {children}
        </Link>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { url, title, width, height, description } =
          node.data.target.fields?.file || {};
        if (!url) return null;

        return (
          <div className="my-4">
            <Image
              src={url}
              alt={description || title || "Embedded asset"}
              width={width || 600}
              height={height || 400}
              className="rounded-lg"
            />
          </div>
        );
      },
    },
  };

  return documentToReactComponents(document, defaultOptions);
};
