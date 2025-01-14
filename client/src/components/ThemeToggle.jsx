import Wrapper from '../assets/wrappers/ThemeToggle';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDashboardContext } from '../pages/DashboardLayout';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillMoonFill /> : <BsFillSunFill />}
    </Wrapper>
  );
};
export default ThemeToggle;
