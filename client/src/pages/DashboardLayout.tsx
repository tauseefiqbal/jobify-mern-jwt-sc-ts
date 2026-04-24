import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import { checkDefaultTheme } from '../App';
import type { User } from '../types';

interface UserResponse {
  user: User;
}

const userQuery = {
  queryKey: ['user'] as const,
  queryFn: async (): Promise<UserResponse> => {
    const { data } = await customFetch.get<UserResponse>('/users/current-user');
    return data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch {
    return redirect('/');
  }
};

interface DashboardContextValue {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

interface Props {
  queryClient: QueryClient;
}

const DashboardLayout = ({ queryClient }: Props) => {
  const { user } = useQuery(userQuery).data as UserResponse;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', String(newDarkTheme));
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
  };

  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    void logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContextValue => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboardContext must be used within DashboardContext.Provider');
  return ctx;
};

export default DashboardLayout;
