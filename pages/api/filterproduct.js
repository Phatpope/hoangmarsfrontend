

import datasource from "../../datalayer";


export default async function handler(req, res) {
  try {


    const searchParams = new URLSearchParams(req.query);

    const categories = searchParams.getAll("categories[]");
    const colors = searchParams.getAll("colors[]");
    const sizes = searchParams.getAll("size[]");

    const minPrice = parseInt(searchParams.get("price[min]") || "0");
    const maxPrice = parseInt(searchParams.get("price[max]") || "100000");



    console.log("répasdsdasdasd---------------------:", minPrice,maxPrice,categories,sizes,colors,searchParams);

    const query = {
       minPrice,
       maxPrice,
       colors,
       sizes,
       categories
      };
    const products = await datasource.searchProducts(query);

    res.status(200).json({ products: products });
  } catch (error) {
    console.log('Error fetching all colors', error);
    res.status(500).json({ error: error});
  }
}
