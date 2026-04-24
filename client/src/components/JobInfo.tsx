import type { ReactNode } from 'react';
import Wrapper from '../assets/wrappers/JobInfo';

interface Props {
  icon: ReactNode;
  text: string;
}

const JobInfo = ({ icon, text }: Props) => {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
