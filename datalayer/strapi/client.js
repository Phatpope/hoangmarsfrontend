import axios from 'axios';
const strapiAPIKey = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${strapiAPIKey}`;

export default axios;