import { MeiliSearch } from "meilisearch";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js

const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
const key = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY

const client = new MeiliSearch({
    host: host,
    apiKey: key,
});

const Search = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const clickPoint = useRef(null);

    const handleFocus = () => {
        if (clickPoint.current) {
            clickPoint.current.style.display = "none";
        }
    };

    const handleBlur = () => {
        if (clickPoint.current) {
            clickPoint.current.style.display = "block";
        }
    };

    useEffect(() => {
        client
            .index("product")
            .search(search)
            .then((results) => {
                setProducts(results.hits);
            });
    }, [search]);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="block p-2 pl-10 w-96 sm:w-120 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {products?.map((product) => (
                    <Link href={`/product/${product.slug}`} key={product.id}>
                        <div className="border border-gray-300 rounded-lg p-4 relative  group block  hover:bg-gray-200">
                            <div className="flex items-center justify-around h-full">
                                <div className="text-center flex flex-col">
                                    <h2 className="text-xl font-semibold mt-2 text-white group-hover:text-black">{product.name}</h2>
                                    <p className="text-white group-hover:text-green-500 mt-2">${product.price}</p>
                                </div>
                               
                                <div className="w-32 h-32 border border-gray-300 shadow-lg rounded-lg overflow-hidden relative">
                                    <Image
                                        src={product.thumbnail.url}
                                        layout="fill"
                                        objectFit="cover"
                                        alt={product.name}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </Link>
                    
                ))}
            </div>
        </div>
    );
};

export default Search;
