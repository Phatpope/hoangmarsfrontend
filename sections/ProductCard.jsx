import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ data: { attributes: p, id } }) => {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer rounded-2xl"
      style={{ height: "400px" }} // Set the height of the container
    >
      <div className="group relative rounded-md">
      <Image
  src={p.thumbnail.data?.attributes.url}
  alt={p.name}
  className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 "
  layout="fixed"
  width={500}
  height={600}
/>

        <div className="mt-4 flex justify-between">
          <div className="ml-10">
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              Basic Tee
            </h3>
            <p className="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p className="text-sm font-medium text-gray-900 mr-10">$35</p>
        </div>
      </div>
    </Link> 
    
  );
};

export default ProductCard;

