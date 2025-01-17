import Wrapper from '../assets/wrappers/Dashboard.js';
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { SmallSidebar, BigSidebar, Navbar } from '../components';
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { checkDefaultTheme } from '../App.jsx';
import customFetch from '../utils/customFetch.js';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    console.log(`🚀CHECK > error:`, error?.response?.data?.msg);
    return redirect('/');
  }
};

// DashboardContext
const DashboardContext = createContext();

// DashboardLayout
const DashboardLayout = () => {
  // user data
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => checkDefaultTheme());

  const toggleSidebar = () => {
    setShowSidebar((show) => !show);
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme((c) => !c);
    document.body.classList.toggle('dark-theme', isDarkTheme);
    localStorage.setItem('darkTheme', isDarkTheme);
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
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />

          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
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
