import Link from "next/link";
import React from "react";
import { getDiscountedPricePercentage } from "../utils/helper";
import Image from "next/image";

const ProductCard = ({ data: { attributes: p, id } }) => {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer rounded-2xl block"
      style={{ minHeight: "400px" }}
    >
      <div className="relative h-64 overflow-hidden rounded-lg w-full">
        <Image
          layout="fill"
          objectFit="cover"
          src={p.thumbnail.data?.attributes.url}
          alt={p.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex justify-between pt-4">
        <div className="ml-6">
          <h3 className="text-sm text-gray-700">{p.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{p.price}đ</p>
        </div>
        <div className="mr-4 flex flex-col justify-end">
          <p className="text-sm font-medium text-gray-900 line-through">{p.original_price}đ</p>
          <p className="text-base font-medium text-sm text-green-500">
            {getDiscountedPricePercentage(10000000, 900000)}% off
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
