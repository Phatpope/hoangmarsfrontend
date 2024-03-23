import Link from "next/link";
import React from "react";
import { getDiscountedPricePercentage } from "../utils/helper";


const ProductCard = ({ data: { attributes: p, id } }) => {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer rounded-2xl"
      style={{ height: "400px" }} // Set the height of the container
    >
      
<div className="h-64 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
  <img
  src={p.thumbnail.data?.attributes.url}
  alt="Picture of the author"
    className="h-full w-full object-cover object-center"
  />
  </div>

        <div className=" flex justify-between pt-14">
          <div className="ml-6">
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              Basic Tee
            </h3>
            <p className="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <div  className="mr-4">
          <p className="text-sm font-medium text-gray-900 ">$35</p>
          <p className="ml-auto text-base font-medium  text-sm text-green-500">
                               {getDiscountedPricePercentage(10000000, 900000)}
                                % off
      </p>

            
          </div>
        </div>
    </Link> 
    
  );
};

export default ProductCard;



