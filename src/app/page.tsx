import { Hero } from "@/components/site/hero";
import { Collection } from "@/components/site/collection";
import { FeatureBand } from "@/components/site/feature-band";
import { StripeStrip } from "@/components/site/decor/stripe-strip";
import { JsonLd } from "@/components/seo/json-ld";
import { collectionSchema } from "@/lib/schema";
import { hasDecor } from "@/lib/occasion";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Collection />
      {hasDecor("stripeStrip") && <StripeStrip />}
      <FeatureBand />
      <JsonLd data={collectionSchema()} />
    </>
  );
}
