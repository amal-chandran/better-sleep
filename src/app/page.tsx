import { getHomePage } from "@/modules/home-page/actions/get-home-page";
import HeroCarousel from "@/modules/home-page/components/hero-carousel";
import { ImageAndTextComponent } from "@/modules/home-page/components/image-and-text-component";
import { ImageComponent } from "@/modules/home-page/components/image-component";
import { TextComponent } from "@/modules/home-page/components/text-component";
import { notFound } from "next/navigation";

export default async function Home() {
  const homePageCollection = await getHomePage();

  const homePage = homePageCollection;

  if (!homePage) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      {homePage.carouselCollection?.items &&
        homePage.carouselCollection.items.length > 0 && (
          <HeroCarousel slides={homePage.carouselCollection} />
        )}

      <div className="flex flex-col gap-8 mb-16">
        {homePage.sectionsCollection?.items &&
          homePage.sectionsCollection.items.map((section, index) => {
            if (!section) return null;

            switch (section.__typename) {
              case "TextImageSection":
                return (
                  <ImageAndTextComponent
                    title={section.title || ""}
                    content={section.content?.json || null}
                    imageSrc={section.image?.url || ""}
                    imageAlt={section.title || "Image"}
                    imagePosition={"left"}
                    key={`image-and-text-${index}`}
                  />
                );

              case "TextSection":
                return (
                  <TextComponent
                    key={`text-${index}`}
                    title={section.title || ""}
                    content={section.content?.json || null}
                    align={"center"}
                  />
                );

              case "ImageSection":
                return (
                  <ImageComponent
                    src={section.image?.url || ""}
                    alt={section.title || "Image"}
                    width={600}
                    height={400}
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
