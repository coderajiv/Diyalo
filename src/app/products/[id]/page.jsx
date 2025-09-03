import { notFound } from "next/navigation";
import products from "@/data/product";
import ProductDisplay from "../../components/ProductDisplay"; // Correct import

// This is a Server Component (no "use client")
export default function ProductDetailPage({ params }) {
  const { id } = params; // Directly use params

  const product = products[id];

  if (!product) {
    notFound();
  }

  // Pass the product data into your client component
  return <ProductDisplay product={product} />;
}
