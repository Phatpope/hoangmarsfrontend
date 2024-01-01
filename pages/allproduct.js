// pages/hello.js
import datasource from '../datalayer';
import JobsPage from '../components/ui/JobPage';
const AllProducts=()=> {
    return <JobsPage jobs={jobs} jobSkills={jobSkills} />;
  }


  export const getStaticProps = async (ctx) => {
    const jobs = await datasource.getJobs();
    const jobSkills = await datasource.getJobsSkills();
  
    return {
      props: {
        jobs,
        jobSkills,
      },
      revalidate: 5,
    };
  };
  
  export default AllProducts;

  
  