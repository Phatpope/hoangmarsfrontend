'use client';
import Link from "next/link";

import React, {useState, useEffect} from 'react'
import {BsSliders2Vertical, BsChevronUp} from "react-icons/bs"
import axios from 'axios'

type Props = {
    selectedCategories: string[]
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
    selectedSize:string[]
    setSelectedSize:React.Dispatch<React.SetStateAction<string[]>>  
    allHexValues:string[]
    setHexValues:React.Dispatch<React.SetStateAction<string[]>>
    selectedHexValues:string[]
    setSelectedHexValues:React.Dispatch<React.SetStateAction<string[]>>
    price: {min:number; max:number}
    setPrice: React.Dispatch<React.SetStateAction<{min:number; max:number}>>
}
const Filter = (props: Props) => {


    const [showFilter, setShowFilter] = useState(false)
    // const [selectedCategories, setSelectedCategories] = useState([])
    // const [selectedSize, setSelectedSize] = useState([])
    // const [allHexValues, setHexValues] = useState([])
    // const [selectedHexValues, setSelectedHexValues] = useState([])
    // const [price, setPrice] = useState({
    //     min:0,
    //     max:10000000,
    // })

    const handelMinChange = (e) => {
        console.log("minnnnnnnnn")
        const value = e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
        props.setPrice({
            ...props.price,
            [e.target.name]: value
        })
    }

    const handlMaxChange = (e) => {
        console.log("maxxxxxxx")

        const value = e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
        props.setPrice({
            ...props.price,
            [e.target.name]: value
        })
    }



    const toggleCategory = (category) => {
        props.setSelectedCategories((prevCategories) => 
            prevCategories.includes(category) 
            ? prevCategories.filter((c) => c !== category):
            [...prevCategories, category]
        )
    }

    const togglesize = (size) => {
        props.setSelectedSize((prevSize) => 
            prevSize.includes(size) 
            ? prevSize.filter((c) => c !== size):
            [...prevSize, size]
        )
    }

    const toggleColor = (color) => {
        props.setSelectedHexValues((prevColor) => 
        prevColor.includes(color) 
            ? prevColor.filter((c) => c !== color):
            [...prevColor, color]
        )
    }
    const getAllColors = async () => {
        try{
            const response = await axios.get('/api/color');
             console.log("Colors0000:", response.data.colors);
             return response.data.colors; // Return the colors here

        }
        catch(error){
            console.error("Error21323132", error)
            return null
        }
    }
    useEffect(() => {
        getAllColors().then((allColors) => {
            if(allColors){
                
                const hextSet = new Set<string>()
                allColors.forEach((color) => {
                        const hextValue = color.replace("#", "")
                        hextSet.add(hextValue)
                    })
                
                const uniqueHexValues :string[] = Array.from(hextSet)
                console.log("Colors00001111111:", uniqueHexValues);
                props.setHexValues(uniqueHexValues)
            }
        })
    }, [])
    


    const allHexValue = props.allHexValues
  return (
    <div className='relative border-solid border-2 border-indigo-600 rounded-lg'>
            <div className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${showFilter ? "max-md:w-[250px]":"w-0 max-md:invisible"}`}>
                <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px]'>
                        <h1 className='text-neutral-700 text-black'>Filters</h1>
                        <BsSliders2Vertical size={20} className = 'text-neutral-600' />
                </div>
                <div className='flex flex-col py-3 pb-5 tet-sm text-neutral-600 border-b-[0.5px]'>
                    <span
                        className={`py-3 px-5 ${props.selectedCategories.includes('iPhone') ? "bg-purple-50":""}`}
                        onClick={() => toggleCategory('iphone')}
                    >
                        iPhone
                    </span>
                    <span
                        className={`py-3 px-5 ${props.selectedCategories.includes('Mac') ? "bg-purple-50":""}`}
                        onClick={() => toggleCategory('Mac')}
                    >
                        Mac
                    </span>
                    <span 
                    className={`py-3 px-5 ${props.selectedCategories.includes('iPad') ? 'bg-purple-50' : ''}`}
                    onClick={() => toggleCategory('iPad')}
                    >
                        iPad
                    </span>
                    <span 
                        className={`py-3 px-5 ${props.selectedCategories.includes('Accessories') ? 'bg-purple-50' : ''}`}
                        onClick={() => toggleCategory('Accessories')}
                    >
                    Accessories
                    </span>
                    
                </div>
                <div className='border-b-[0.5px] pb-10'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-700 text-black'>Prices</h1>
                        <BsChevronUp size={18} className = 'text-neutral-500' />
                    </div>
                    <div className='grid grid-cols-2 gap-5 px-5 overflow-hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <label  className='text-[15px] text-black opacity-75'>Min</label>
                            <div className='relative'>
                                <input className='w-full outline-none border-[1px] rounded-lg px-2 text-center text-black py-[2px] '  type="number" name="min" onChange={handelMinChange} value={props.price.min} id="" />
                                <span className='absolute right-2 top-1 text-black'>Tr</span>

                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <label  className='text-[15px] text-black opacity-75'>Max</label>
                            <div className='relative'>
                                <input className='w-full outline-none border-[1px] rounded-lg px-2 text-center text-black py-[2px]' type="number" name="max" onChange={handlMaxChange} value={props.price.max} id="" />
                                <span className='absolute right-2 top-1 text-black'>Tr</span>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-[0.5px]'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-800 '>Colors</h1>
                    </div>
                    <ul className='grid grid-cols-4 px-5 gap-5 mb-4'>
                        {allHexValue.map((hexvalue, index) => (
                            <li
      key={index}
      className={`w-[40px] h-[40px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${props.selectedHexValues.includes(`#${hexvalue}`) ? "shadow-2xl opacity-25" : `bg-${hexvalue}`}`}
      onClick={() => toggleColor(`#${hexvalue}`)}
      style={{backgroundColor: `#${hexvalue}`}}

    >
    </li>
                        ))}
                    </ul>
                </div>
                <div className='sizes px-auto py-20'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-800 '>Sizes</h1>
                    </div>
                    <ul className='grid grid-cols-4 px-5 gap-5'>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-dark text-[14px] py-[2px] cursor-pointer ${props.selectedSize.includes('SM') ? 'bg-neutral-900 text-white':''}`}
                        onClick={() => togglesize('SM')}
                        >
                            16GB
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${props.selectedSize.includes('MD') ? 'bg-neutral-900 text-white':''}`}
                        onClick={() => togglesize('MD')}
                        >
                            32GB
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${props.selectedSize.includes('XL') ? 'bg-neutral-900 text-white':''}`}
                        onClick={() => togglesize('XL')}
                        >
                            64GB
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${props.selectedSize.includes('2XL') ? 'bg-neutral-900 text-white':''}`}
                        onClick={() => togglesize('2XL')}
                        >
                            128GB
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${props.selectedSize.includes('3XL') ? 'bg-neutral-900 text-white':''}`}
                        onClick={() => togglesize('3XL')}
                        >
                            256GB
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${props.selectedSize.includes('4XL') ? 'bg-neutral-900 text-white':''}`}
                        onClick={() => togglesize('2XL')}
                        >
                            512GB
                        </li>
                    </ul>
                </div>
            </div>
        <div onClick={() => setShowFilter(!showFilter)} className='absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer text-black'>Filters</div>
        </div>
  );
};

export default Filter;
