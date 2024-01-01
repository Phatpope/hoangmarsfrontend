let datasource = {}



import * as strapiJobAPI from './strapi/job';
import * as strapiCompanyAPI from './strapi/company';
import * as strapiProductAPI from './strapi/product';

datasource = { ...strapiCompanyAPI, ...strapiJobAPI,...strapiProductAPI };

export default datasource



