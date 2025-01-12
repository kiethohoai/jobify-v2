import Wrapper from '../assets/wrappers/Dashboard.js';
import { Outlet } from 'react-router-dom';
import { SmallSidebar, BigSidebar, Navbar } from '../components';
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

// DashboardContext
const DashboardContext = createContext();

// DashboardLayout
const DashboardLayout = () => {
  // user temp
  const user = { name: 'john' };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleSidebar = () => {
    alert('toggleSidebar');
  };

  const toggleDarkTheme = () => {
    alert('toggleDarkTheme');
  };

  const logoutUser = async () => {
    alert('logoutUser');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
        setShowSidebar,
        setIsDarkTheme,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />

          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// useDashboardContext
const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error(
      'Can not use Dashboard Context outside the DashboardContext Provider',
    );

  return context;
};

// eslint-disable-next-line
export { useDashboardContext };
export default DashboardLayout;
