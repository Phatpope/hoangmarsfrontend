'use client'

import React, {useState, useEffect} from 'react'
import Link from "next/link";
import Image from 'next/image';
import axios from 'axios'

import Filter from '../components/container/Filter'
const products2 = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

const Page = (props) => {
    const [showFilter, setShowFilter] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [allHexValues, setHexValues] = useState([])
    const [selectedHexValues, setSelectedHexValues] = useState([])
    const [price, setPrice] = useState({
        min:0,
        max:10000000,
    })
    const [response, setResponse] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            try{
                const response = await axios.get('/api/filterproduct',{
                    params:{
                        categories:selectedCategories,
                        size:selectedSize,
                        price:{
                            min:price.min,
                            max:price.max
                        },
                        colors: selectedHexValues
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then((response) => {
                    console.log("response`;--------------",response.data.products)
                    setResponse(response.data.products)
                })
            }catch(error){
                console.log('error', error)
            }
        };
        fetchdata()
    }, [selectedCategories, selectedSize,selectedHexValues,price])

    return (
        <div className='bg-white flex mx-auto mx-4 border-solid border-2 border-indigo-600 rounded-lg'>
            {/* Filter Component */}
            <Filter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              allHexValues={allHexValues}
              setHexValues={setHexValues}
              selectedHexValues={selectedHexValues}
              setSelectedHexValues={setSelectedHexValues}
              price={price}   
              setPrice={setPrice}
              className='ml-4'
            />
    
          <div className='p-4'>
            {/* Product List */}
            <h1 className='text-2xl font-medium'>Tất Cả Sản Phẩm</h1>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {response.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.attributes.thumbnail.data.attributes.url}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/product/${product.attributes.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.attributes.name}
                    </a>
                  </h3>
                  <div
          className="w-[40px] h-[40px] mt-4 rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer"
          style={{ backgroundColor: `${product.attributes.color}` }}
        ></div>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.attributes.price}</p>
              </div>
            </div>
          ))}
        </div>
          </div>
        </div>
      );
}
export default Page