import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job deleted successfully');
    } catch (error) {
      const msg = (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg;
      toast.error(msg ?? 'Something went wrong');
    }
    return redirect('/dashboard/all-jobs');
  };
