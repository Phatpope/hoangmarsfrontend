import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import ProductCard from "../../components/ProductCard";
import { fetchDataFromApi } from "../../utils/api";
import useSWR from "swr";
import { useRouter } from "next/router";
const maxResult = 3;
import Link from "next/link";
import Image from "next/image";
import { getDiscountedPricePercentage } from "../../utils/helper";

const Category = ({ category, products, slug }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedTag, setSelectedTag] = useState("all");

  const { query } = useRouter();

  useEffect(() => {
    setPageIndex(1);
    console.log("--------=======", query, "12345678xxxxxxxxxx", pageIndex, slug,category?.data?.[0]?.attributes?.name);
  }, [query]);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setPageIndex(1); // Reset page index when tag changes
  };

  const { data, error, isLoading } = useSWR(
    () => {
      return selectedTag === "all"
        ? `/api/products?populate=*&[filters][category][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`
        : `/api/products?populate=*&[filters][category][slug][$eq]=${slug}&[filters][gen][$eq]=${selectedTag}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`;
    },
    fetchDataFromApi
  );

  console.log("zzzzzzzzzzzz", data);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight text-white">
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>

        {/* products tag start */}
        <form className="max-w-sm mx-auto">
          <label htmlFor="tag_select" className="sr-only">
            Tag select
          </label>
          <select
            id="tag_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            onChange={(e) => handleTagChange(e.target.value)}
            value={selectedTag}
          >
            <option value="all">All</option>
            {products?.data?.map((product) => (
              <option key={product.attributes.gen} value={product.attributes.gen}>
                {product.attributes.gen}
              </option>
            ))}
          </select>
        </form>
        {/* products tag end */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-14 px-5 md:px-0">
  {data?.data?.map((product) => (
    <Link
      key={product?.id}
      href={`/product/${product.attributes.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer border-solid border-2 border-indigo-600 rounded-md"
    >
      <div className="relative border-indigo-600 rounded-md w-full" style={{  height: '250px' }}>
        <Image
          layout="fill"
          objectFit="cover"
          src={product.attributes.thumbnail.data.attributes.url}
          alt={product.attributes.name}
        />
      </div>
      <div className="p-4 text-black/[0.9] mt-4">
        <h2 className="text-sm md:text-base font-medium mb-2">{product.attributes.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <div className="flex-col">
          <p className="mr-2 text-sm md:text-base font-semibold">
            {product.attributes.price}
          </p>
          <p className="text-xs md:text-sm font-medium line-through">
                {product.attributes.original_price}
              </p>

          </div>
         

          {product.attributes.original_price && (
            <>
              
              <p className="ml-auto text-xs md:text-sm font-medium text-green-500">
                {getDiscountedPricePercentage(
                  product.attributes.original_price,
                  product.attributes.price
                )}
                % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  ))}
</div>


        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={
                pageIndex === (data && data.meta.pagination.pageCount)
              }
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function getServerSideProps({ params: { slug } }) {
  const pageIndex = 1; // or use the appropriate value here

  const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`);
  const products = await fetchDataFromApi(`/api/products?populate=*&[filters][category][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`);

  console.log("ppppppppppppppppppppppppppp",products)

  return {
    props: {
      category,
      products,
      slug,
    },
  };
}
