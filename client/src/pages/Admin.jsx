import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';

// eslint-disable-next-line
export const loader = async () => {
  try {
    const resp = await customFetch(`/users/admin/app-stats`);
    return resp.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const { jobs, users } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current user"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />

      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
