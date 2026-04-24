import type { ReactNode } from 'react';
import WrapperImpl from '../assets/wrappers/StatItem';

const Wrapper = WrapperImpl as React.ComponentType<{
  color: string;
  bcg: string;
  children?: ReactNode;
}>;

interface Props {
  count: number;
  title: string;
  icon: ReactNode;
  color: string;
  bcg: string;
}

const StatItem = ({ count, title, icon, color, bcg }: Props) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
