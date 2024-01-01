import axios from './client';
import qs from 'qs';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProductsColors = async () => {
  const query = qs.stringify(
    {
      fields: ['color'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
    const res = await axios.get(`${apiUrl}/products?${query}`);
    return res.data.data.map((rawColor) => rawColor.attributes.color);
  } catch (error) {
    console.error('Error fetching product colors:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};



export const searchProducts = async (query) => {
  const strapiQuery = {
    populate: '*',
    filters: {},
  };

  // Add Boolean Query Filters
  if (query.likeNew) strapiQuery['filters']['likenew'] = { $eq: true };
  if (query.colors) strapiQuery['filters']['color'] = { $in: query.colors };

  if (query.featuredJobsOnly)
    strapiQuery['filters']['likenew'] = { $eq: true };

  // Add Range Query Filters
  strapiQuery['filters']['price'] = {
    $gte: query.minPrice,
    $lte: query.maxPrice,
  };
  if (query.categories && query.categories.length)
    strapiQuery['filters']['category'] = {
      name: { $in: query.categories },
    };

  

  // Add Inclusion Query Filters
  strapiQuery['filters']['jobType'] = { $in: query.jobTypes };
  strapiQuery['filters']['experienceLevel'] = { $in: query.experienceLevels };

  //Add Nested Inclusion Query Filters
  if (query.selectedTags && query.selectedTags.length)
    strapiQuery['filters']['skillsTags'] = {
      name: { $in: query.selectedTags },
    };

  // Add Full Text Search Query
  if (query.searchBarText) {
    const searchFields = [
      'title',
      'jobCategory',
      'jobType',
      'jobDescription',
      'aboutYou',
      'jobResponsibilities',
      'remunerationPackage',
      // deep nested search fields
      'skillsTags.name',
      'company.name',
      'company.city',
    ];

    strapiQuery['filters']['$or'] = searchFields.map((field) => {
      const searchField = {};
      if (!field.includes('.')) {
        searchField[field] = { $containsi: query.searchBarText };
      } else {
        const [level1, level2] = field.split('.');
        const nestedSearchField = {};
        nestedSearchField[level2] = { $containsi: query.searchBarText };
        searchField[level1] = nestedSearchField;
      }
      return searchField;
    });
  }

  const strapiQueryStr = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  const res = await axios.get(`${apiUrl}/products?${strapiQueryStr}`);
  const products = res.data.data;

  return products;
};