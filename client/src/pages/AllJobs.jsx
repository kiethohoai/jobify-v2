import customFetch from '../utils/customFetch';
import { JobsContainer, SearchContainer } from '../components';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

// eslint-disable-next-line
export const loader = async ({ request }) => {
  try {
    // convert queryParams to object
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get('/jobs', { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// context
const AllJobsContext = createContext();

// component
const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// eslint-disable-next-line
export const useAllJobsContext = () => {
  const context = useContext(AllJobsContext);
  if (context === undefined) {
    throw new Error(
      'Can not use AllJobsContext outside the AllJobsContext Provider',
    );
  }

  return context;
};

export default AllJobs;
