import datasource from "../../datalayer";

export default async function handler(req, res) {
  try {
    const allColors = await datasource.getProductsColors();

    res.status(200).json({ colors: allColors });
  } catch (error) {
    console.log('Error fetching all colors-----888888', error);
    res.status(500).json({ error: error});
  }
}
