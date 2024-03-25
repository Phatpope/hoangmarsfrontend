import React from "react";
import {marked} from "marked";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { Tab } from '@headlessui/react';
import useSWR from 'swr'
import { fetchDataFromApi } from "../../utils/api";
import {
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { useRouter } from 'next/router'
const features = [
  { name: 'Màn Hình', description: 'Surface Pro 9 được Microsoft nâng cấp lên cấu hình chip Intel Core i5 thế hệ thứ 12 mới nhất với 10 nhân và 12 luồng xử lý thông tin, thay vì 4 nhân 8 luồng như trên Surface Pro 8. Chip có thể boost xung nhịp lên đến 4,7 Ghz thông qua công nghệ Turbo Boost giúp xử lý mượt mà các tác vụ nặng một cách trơn tru' },
  { name: 'Camera', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
  { name: 'Hiệu Năng Cpu', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Dung Lượng', description: 'Hand sanded and finished with natural oil' },
  { name: 'Hệ Điều Hành', description: 'Wood card tray and 3 refill packs' },
  { name: 'Đính Kèm', description: 'Made from natural materials. Grain and color vary with each item.' },
]

const richTextReducer = (rawRichText) =>{
  const parsedRichText = marked.parse(rawRichText)
  let styledRichText = parsedRichText.replace('<ul>',"<ul style='list-style-type: circle;'>")
  return styledRichText

}


const productData = {
  data: [
      {
          attributes: {
              name: "Example Product",
              subtitle: "A great product",
              price: 50.00,
              original_price: 60.00,
              size: {
                  data: [
                      { size: "SM", enabled: true },
                      { size: "M", enabled: true },
                      { size: "L", enabled: true },
                      { size: "XL", enabled: true },
                  ],
              },
              color: "yellow", // Color attribute set to yellow
              description: "This is an example product description.",
              image: {
                  data: [
                      // ... array of image URLs
                  ],
              },
          },
      },
  ],
};

const p = productData.data[0].attributes;




const ProductDetail = ()=>{
  
  const [selectedTab, setSelectedTab] = useState("description");
  const router = useRouter();

  const { data: data11, error }  = useSWR(`/api/products?populate=*&filters[slug][$eq]=${router.query.slug}`, fetchDataFromApi)


  const [selectedImage, setSelectedImage] = useState(data11?.data[0]?.attributes.image?.data[0]?.attributes.url || "");

  useEffect(() => {
    if (data11 && data11.data[0]?.attributes?.image?.data[0]?.attributes.url) {
      setSelectedImage(data11.data[0].attributes.image.data[0].attributes.url);
    }
  }, [data11]);


 
  if (error) return <div>Failed to load</div>
  if (!data11) return <div>Loading...</div>

  



    const handleImageClick = (newImage) => {
        setSelectedImage(newImage);
      };
      const { userId } = router.query;
      console.log("2222222",userId)



    return (
        
            <section className="py-12 sm:py-16 bg-white"> 
  <div className="container mx-auto px-4">
    <nav className="flex">
      <ol role="list" className="flex items-center">
        <li className="text-left">
          <div className="-m-1">
            <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Home </a>
          </div>
        </li>

        <li className="text-left">
          <div className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <div className="-m-1">
              <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"> Products </a>
            </div>
          </div>
        </li>

        <li className="text-left">
          <div className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <div className="-m-1">
              <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> Coffee </a>
            </div>
          </div>
        </li>
      </ol>
    </nav>

    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5">
            <div className="max-w-xl overflow-hidden rounded-lg">
              <img className="h-full w-full max-w-full object-cover" src={selectedImage} alt="" />
            </div>
          </div>

          <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
          {data11.data[0].attributes.image.data.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${
                    selectedImage === image.attributes.url ? "border-gray-900" : "border-transparent"
                  } text-center`}
                  onClick={() => handleImageClick(image.attributes.url)}
                >
                  <img className="h-full w-full object-cover" src={image.attributes.url} alt="" />
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{data11?.data[0].attributes.name}</h1>
        <div>
    </div>

        <div className="mt-5 flex items-center">
          <div className="flex items-center">
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
            </svg>
            <svg className="block h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
            </svg>
          </div>
          <p className="ml-2 text-sm font-medium text-gray-500">150 Buy.</p>
        </div>

        <h2 className="mt-8 text-base text-gray-900">Tình Trạng</h2>
        <div className="mt-3 flex select-none flex-wrap items-center gap-1">
          <label className="">
            <input type="radio" name="type" value="Powder" className="peer sr-only" checked />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">New</p>
          </label>
          <label className="">
            <input type="radio" name="type" value="Whole Bean" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">Like New</p>
          </label>
          <label className="">
            <input type="radio" name="type" value="Groud" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">98%</p>
          </label>
        </div>

        <h2 className="mt-8 text-base">Màu Sắc</h2>
        <div className="mt-3 flex select-none flex-wrap items-center gap-1">
        <div
                                className="border-2 border-black-500 rounded-full w-10 h-10"
                                style={{
                                  backgroundColor: p.color,
                              }}
                            ></div>
        </div>

        <h2 className="mt-8 text-base text-gray-900">Bảo Hành</h2>
        <div className="mt-3 flex select-none flex-wrap items-center gap-1">
          <label className="">
            <input type="radio" name="subscription" value="4 Months" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">4 Months</p>
            <span className="mt-1 block text-center text-xs">$80/mo</span>
          </label>
          <label className="">
            <input type="radio" name="subscription" value="8 Months" className="peer sr-only" checked />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">8 Months</p>
            <span className="mt-1 block text-center text-xs">$60/mo</span>
          </label>
          <label className="">
            <input type="radio" name="subscription" value="12 Months" className="peer sr-only" />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">12 Months</p>
            <span className="mt-1 block text-center text-xs">$40/mo</span>
          </label>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <div className="flex items-end">
            <h1 className="text-3xl font-bold">1tr</h1>
            <span className="text-base">/month</span>
          </div>

          <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to cart
          </button>
        </div>

        <ul className="mt-8 space-y-2">
          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
            </svg>
            Free shipping worldwide
          </li>

          <li className="flex items-center text-left text-sm font-medium text-gray-600">
            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
            </svg>
            Cancel Anytime
          </li>
        </ul>
      </div>

      <div className="lg:col-span-6">
        <div className="border-b border-gray-300">
        <Tab.Group>
                <nav className="flex gap-4">
                  <Tab
                    onClick={() => setSelectedTab("description")}
                    className={({ selected }) =>
                      `border-b-2 py-4 text-sm font-medium ${
                        selected ? "border-gray-900 text-gray-900" : "border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-800"
                      }`
                    }
                  >
                    Description
                  </Tab>

                  <Tab
                    onClick={() => setSelectedTab("chitiet")}
                    className={({ selected }) =>
                      `inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium ${
                        selected ? "border-gray-900 text-gray-900" : "text-gray-600 hover:border-gray-400 hover:text-gray-800"
                      }`
                    }
                  >
                    Chi Tiết
                  </Tab>
                </nav>
        </Tab.Group>
        </div>

        <div className="mt-8 flow-root sm:mt-12">
          {selectedTab === "description" && (
            <>
              <h1 className="text-2xl font-bold">ĐẶC ĐIỂM NỔI BẬT</h1>
              <div>
            
            {/* The Role */}
            <div className="prose my-10">
            <BlocksRenderer content={data11?.data[0].attributes.dacdiem} />;

            </div>
            
            
          </div>
          <hr className='my-6 border-t border-slate-200' />
              <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia accusantium nesciunt fuga.</p>
              <h1 className="mt-8 text-3xl font-bold">From the Fine Farms of Brazil</h1>
              <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio numquam enim facere.</p>
              <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
              <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Thông Số Kĩ Thuật</h2>
          <p className="mt-4 text-gray-500">
            PRODUCT DESCRIPTION
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
      <div className="flex justify-center">
  <iframe
    width="688"
    height="387"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>            </>
          )}

          {selectedTab === "chitiet" && (
            <div>
  <div className="mx-auto">
  <div className="inline-block px-4 py-2 bg-black rounded-lg">
    <h3 className="text-base font-semibold leading-7 text-white">Màn Hình</h3>
  </div>
</div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Kích Thước</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">15 inch</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Độ Phân Giải</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">20 megapixel</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Công Nghệ Màn Hình</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Lcd</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Tần Số Quét</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">120 hz</dd>
      </div>
    </dl>
  </div>
  <div className="mx-auto">
  <div className="inline-block px-4 py-2 bg-black rounded-lg">
    <h3 className="text-base font-semibold leading-7 text-white">Ram và Lưu Trữ</h3>
  </div>
</div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Dung Lượng Ram</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">64gb</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Bộ Nhớ Trong</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">128GB</dd>
      </div>

    </dl>
  </div>
  <div className="px-4 sm:px-0">
    <h3 className="text-base font-semibold leading-7 text-gray-900">Camera</h3>
  </div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Camera Trước</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Camera Sau</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Quay Video</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Tính Năng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
      </div>

    </dl>
  </div>

  <div className="mx-auto">
  <div className="inline-block px-4 py-2 bg-black rounded-lg">
    <h3 className="text-base font-semibold leading-7 text-white">Camera</h3>
  </div>
</div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Camera Trước</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Camera Sau</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Quay Video</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Tính Năng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
      </div>

    </dl>
  </div>

  <div className="mx-auto">
  <div className="inline-block px-4 py-2 bg-black rounded-lg">
    <h3 className="text-base font-semibold leading-7 text-white">Vi Xử Lí và Đồ Hoạ</h3>
  </div>
</div>


  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Kích Thước</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Trọng Lượng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Chất Liệu Mặc lưng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Chất liệu khung viến </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
      </div>

    </dl>
  </div>

  <div className="mx-auto">
  <div className="inline-block px-4 py-2 bg-black rounded-lg">
    <h3 className="text-base font-semibold leading-7 text-white">Pin và Công Nghệ Sạc</h3>
  </div>
</div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Pin</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Công Nghệ Sạc</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Cổng Sạc</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Tính Năng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
      </div>

    </dl>
  </div>

  <div className="mx-auto">
  <div className="inline-block px-4 py-2 bg-black rounded-lg">
    <h3 className="text-base font-semibold leading-7 text-white">Thiết Kế và Trọng Lượng</h3>
  </div>
</div>
  <div className="mt-6 border-t border-gray-100">
    <dl className="divide-y divide-gray-100">
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Kích Thước</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Trọng Lượng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Chất Liệu Mặc lưng</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Chất Liệu Khung Viền </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
      </div>

    </dl>
  </div>
</div>

          )}
        </div>
      </div>
    </div>
  </div>
</section>

        
    )

}
export default ProductDetail