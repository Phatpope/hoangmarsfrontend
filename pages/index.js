import { Footer, Navbar} from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import Search from '../sections/Search';
// import AllProducts from '../sections/AllProducts';
import { fetchDataFromApi } from '../utils/api';
import useSWR from "swr";
import AllTest from '../sections/Alltest';

const Home = () => {
  const { data: categories, error } = useSWR(`/api/categories?populate=*`, fetchDataFromApi);

  console.log(categories);

  return (
    <div className="bg-primary-black overflow-hidden">
      <Hero />
      <div className="relative">
        <About />
        <div className="gradient-03 z-0" />
        <Explore />
      </div>
      <Search/>
      {/* <AllProducts/> */}
      <AllTest category={"Macbook"}/>
      <AllTest category={"Iphone"}/>
      <AllTest category={"Ipad"}/>
      <AllTest category={"Accessories"}/>

      <div className="relative">
        <GetStarted />
        <div className="gradient-04 z-0" />
        <WhatsNew />
      </div>
      <World />
      <div className="relative">
        <Insights />
        <div className="gradient-04 z-0" />
        <Feedback />
      </div>
    </div>
  );
};

export default Home;
