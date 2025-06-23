import { getHomePage } from "@/modules/home-page/actions/get-home-page";
import HeroCarousel from "@/modules/home-page/components/hero-carousel";
import { ImageAndTextComponent } from "@/modules/home-page/components/image-and-text-component";
import { ImageComponent } from "@/modules/home-page/components/image-component";
import { TextComponent } from "@/modules/home-page/components/text-component";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { notFound } from "next/navigation";

export default async function Home() {
  // Fetch home page content from Contentful using the new action
  const homePageCollection = await getHomePage();

  // If no data is returned, show a fallback
  if (!homePageCollection || homePageCollection.items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold">Welcome to Better Sleep</h1>
        <p className="mt-4">
          Content is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  const homePage = homePageCollection.items[0];

  if (!homePage) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      {/* Hero Carousel Section */}
      {homePage.carouselCollection?.items &&
        homePage.carouselCollection.items.length > 0 && (
          <HeroCarousel slides={homePage.carouselCollection.items} />
        )}

      <div className="flex flex-col gap-8 mb-16">
        {/* Render sections from Contentful */}
        {homePage.sectionsCollection?.items &&
          homePage.sectionsCollection.items.map((section, index) => {
            // Determine section type based on __typename
            if (!section) return null;

            switch (section.__typename) {
              case "TextImageSection":
                return (
                  <ImageAndTextComponent
                    title={section.title || ""}
                    content={
                      section.content?.json
                        ? documentToReactComponents(section.content.json)
                        : null
                    }
                    imageSrc={section.image?.url || ""}
                    imageAlt={section.title || "Image"}
                    imagePosition={"left"} // Default to left as it's not specified in the GraphQL response
                  />
                );

              case "TextSection":
                return (
                  <TextComponent
                    key={`text-${index}`}
                    title={section.title || ""}
                    content={
                      section.content?.json
                        ? documentToReactComponents(section.content.json)
                        : null
                    }
                    align={"center"} // Default to center as it's not specified in the GraphQL response
                    className="py-16"
                  />
                );

              case "ImageSection":
                return (
                  <ImageComponent
                    src={section.image?.url || ""}
                    alt={section.title || "Image"}
                    width={600} // Default width
                    height={400} // Default height
                    key={`image-${index}`}
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
