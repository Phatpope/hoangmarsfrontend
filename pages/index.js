import { Footer, Navbar} from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
// import AllProducts from '../sections/AllProducts';
import AllTest from '../sections/Alltest';

const Home = () => (
  <div className="bg-primary-black overflow-hidden">
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
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

export default Home;
