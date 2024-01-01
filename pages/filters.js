'use client'

import React, {useState, useEffect} from 'react'
import Link from "next/link";
import Image from 'next/image';
import axios from 'axios'

import Filter from '../components/container/Filter'


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
                    console.log("response`;--------------",response.data.products[0].attributes.thumbnail.data.attributes.url)
                    setResponse(response.data.products)
                })
            }catch(error){
                console.log('error', error)
            }
        };
        fetchdata()
    }, [selectedCategories, selectedSize,selectedHexValues,price])

    return (
        <div className='bg-white flex mx-auto mx-4'>
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
            <h1 className='text-2xl font-medium'>Filtered Clothings</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-5'>
              {response.map((product) => (
                <div key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={product.attributes.thumbnail.data.attributes.url} 
                      alt={product.attributes.name}
                    />
                    <div className="p-4 text-black/[0.9]">
                      <h2 className="text-lg font-medium">{product.attributes.name}</h2>
                      <div className="flex items-center text-black/[0.5]">
                        <p className="mr-2 text-lg font-semibold">
                          &#8377;{product.attributes.price}
                        </p>
                        {product.attributes.original_price && (
                          <>
                            <p className="text-base  font-medium line-through">
                              &#8377;{product.attributes.original_price}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                              10
                              % off
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}
export default Page