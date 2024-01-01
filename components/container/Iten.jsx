'use client';
import Link from "next/link";
import React from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import ProductCard from "../../sections/ProductCard";

// HelloWorld.js


const Item = () => {
    const [products, setProducts] = useState([]);
    const [selectedGen, setSelectedGen] = useState([]);
    const [priceRange, setPriceRange] = useState({ from: '', to: '' });
    const [sortBy, setSortBy] = useState(''); // Add the selected sort option here

    useEffect(() => {
        // Fetch product data from the API with sort and filter parameters
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/products?populate=*', {
                    params: {
                        selectedGen, // Pass selected generation(s) for filtering
                        priceRange, // Pass price range for filtering
                        sortBy, // Pass the selected sort option
                    },
                });
                setProducts(response.data);
                console.log(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, [selectedGen, priceRange, sortBy]); // F

    console.log(products)
  return (
    <div>
      <h1 className="px-3 text-xl">Items</h1>
      <div className="mt-4 grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
                {products?.data?.map((product) => (
                    <ProductCard key={product?.id} data={product} />
                ))}
            </div>
    </div>
  );
};

export default Item;
