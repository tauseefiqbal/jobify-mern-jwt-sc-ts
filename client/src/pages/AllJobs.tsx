import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import type { JobsResponse, SearchValues } from '../types';

const allJobsQuery = (params: SearchValues) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ] as const,
    queryFn: async (): Promise<JobsResponse> => {
      const { data } = await customFetch.get<JobsResponse>('/jobs', { params });
      return data;
    },
  };
};

interface AllJobsLoaderData {
  searchValues: SearchValues;
}

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs): Promise<AllJobsLoaderData> => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]) as SearchValues;

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

interface AllJobsContextValue {
  data: JobsResponse;
  searchValues: SearchValues;
}

const AllJobsContext = createContext<AllJobsContextValue | undefined>(undefined);

const AllJobs = () => {
  const { searchValues } = useLoaderData() as AllJobsLoaderData;
  const { data } = useQuery(allJobsQuery(searchValues));
  if (!data) return null;
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = (): AllJobsContextValue => {
  const ctx = useContext(AllJobsContext);
  if (!ctx) throw new Error('useAllJobsContext must be used within AllJobsContext.Provider');
  return ctx;
};

export default AllJobs;
