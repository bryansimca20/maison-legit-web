import { Hero } from "@/components/site/hero";
import { HowToOrder } from "@/components/site/how-to-order";
import { Collection } from "@/components/site/collection";
import { FeatureBand } from "@/components/site/feature-band";
import { JsonLd } from "@/components/seo/json-ld";
import { collectionSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowToOrder />
      <Collection />
      <FeatureBand />
      <JsonLd data={collectionSchema()} />
    </>
  );
}
