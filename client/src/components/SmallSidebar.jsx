import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { useDashboardContext } from '../pages/DashboardLayout.jsx';

const SmallSidebar = () => {
  const data = useDashboardContext();
  console.log(`🚀CHECK > data:`, data);

  return <Wrapper>SmallSidebar</Wrapper>;
};
export default SmallSidebar;
