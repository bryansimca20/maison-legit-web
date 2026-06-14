import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/site/product-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { singleProductSchema, breadcrumbSchema, productPath } from "@/lib/schema";
import { PRODUCTS, getProduct, type ProductKey } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.k }));
}

function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.k === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  const path = productPath(product);
  return {
    title: product.fullName,
    description: product.description,
    keywords: [
      product.fullName,
      `${product.name} lapis legit`,
      "lapis legit Jakarta",
      "pre-order lapis legit",
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${product.fullName} · Maison Legit`,
      description: product.description,
      url: path,
      images: [{ url: product.photos[0].src }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug as ProductKey);
  if (!findProduct(slug)) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <JsonLd
        data={[
          singleProductSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The collection", path: "/#collection" },
            { name: product.fullName, path: productPath(product) },
          ]),
        ]}
      />
    </>
  );
}
