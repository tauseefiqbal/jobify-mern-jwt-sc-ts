import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext, redirect } from 'react-router-dom';
import { Form } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import type { QueryClient } from '@tanstack/react-query';
import type { DashboardOutletContext } from '../types';

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch('/users/update-user', data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profile updated successfully');
      return redirect('/dashboard');
    } catch (error) {
      const msg = (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg;
      toast.error(msg ?? 'Something went wrong');
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext<DashboardOutletContext>();

  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>profile</h4>
        <div className='form-center'>
          <FormRow type='text' name='name' defaultValue={name} />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={lastName}
          />
          <FormRow type='email' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
