import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/product-catalog";
import { ProductDetail } from "@/components/product-detail";

type ProductPageProps = {
  params?: Promise<{ slug: string }> | { slug: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const routeParams = params ? await params : { slug: "" };
  const product = await getProductBySlug(routeParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
