import { getPageBySlug } from "@/modules/custom-page/actions/get-page-by-slug";
import { ImageAndTextComponent } from "@/shared/components/image-and-text-component";
import { ImageComponent } from "@/shared/components/image-component";
import { TextComponent } from "@/shared/components/text-component";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription || "",
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-[50vh] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-4xl font-bold mb-6">{pageData.title}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {pageData.sectionsCollection?.items?.map((section, index: number) => {
          switch (section?.__typename) {
            case "TextSection":
              return (
                <TextComponent
                  key={index}
                  title={section?.title || ""}
                  content={section?.content?.json || null}
                  align="left"
                />
              );
            case "ImageSection":
              return (
                <ImageComponent
                  key={index}
                  src={section.image?.url || ""}
                  alt={section.title || ""}
                  width={800}
                  height={500}
                />
              );
            case "TextImageSection":
              return (
                <ImageAndTextComponent
                  key={index}
                  title={section?.title || ""}
                  content={section?.content?.json || null}
                  imageSrc={section?.image?.url || ""}
                  imageAlt={section?.title || ""}
                  imagePosition="right"
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
