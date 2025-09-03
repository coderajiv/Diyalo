import Link from "next/link";
import Image from "next/image";
import products from "@/data/product";
//import { CURRENCY } from "@/config"; // Assuming you've set up '@/config' for currency

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Object.values(products).map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col" // Added flex-col
          >
            {/* Image Container - Fixed height for consistency */}
            <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl"> {/* Added bg-gray-100 for visual consistency on non-square images */}
              <Image
                src={product.image}
                alt={product.name}
                fill
                // Adjust sizes for better image optimization performance
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                // Added a priority prop for images above the fold for better LCP
                priority={true} // Consider adding this to the first few images only
              />
            </div>
            
            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow"> {/* flex-grow ensures this div takes available space */}
              <h2
                className="font-semibold text-lg text-gray-900 truncate mb-1"
                title={product.name}
              >
                {product.name}
              </h2>
              <p className="text-pink-600 font-bold text-xl mb-2 flex-shrink-0"> {/* flex-shrink-0 keeps price from shrinking */}
                $ {product.price}
              </p>
              <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2"> {/* line-clamp-2 limits description to 2 lines */}
                {product.desc}
              </p>
              {/* Optional: Add a rating or stock status here */}
              <div className="mt-auto pt-2 border-t border-gray-100 text-sm text-gray-500">
                <span className="font-medium text-yellow-500">ratings {product.rating || 'N/A'}</span>
                {/* You can add more info here like stock status if available in data */}
                {/* <span className="ml-2 text-green-600">In Stock</span> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}