import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { ChartsContainer, StatsContainer } from '../components';

// eslint-disable-next-line
export const loader = async () => {
  try {
    const resp = await customFetch.get(`/jobs/stats`);
    return resp.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  // data
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      {/* stats */}
      <StatsContainer defaultStats={defaultStats} />

      {/* monthly */}
      {monthlyApplications.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
