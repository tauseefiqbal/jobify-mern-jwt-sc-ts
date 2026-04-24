import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import type { Job } from '../types';

interface JobResponse {
  job: Job;
}

const singleJobQuery = (id: string) => {
  return {
    queryKey: ['job', id] as const,
    queryFn: async (): Promise<JobResponse> => {
      const { data } = await customFetch.get<JobResponse>(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id as string));
      return params.id;
    } catch (error) {
      const msg = (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg;
      toast.error(msg ?? 'Something went wrong');
      return redirect('/dashboard/all-jobs');
    }
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job edited successfully');
      return redirect('/dashboard/all-jobs');
    } catch (error) {
      const msg = (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg;
      toast.error(msg ?? 'Something went wrong');
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData() as string;

  const { data } = useQuery(singleJobQuery(id));
  if (!data) return null;
  const { job } = data;

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
