import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  labelText?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FormRow = ({ type, name, labelText, defaultValue, onChange }: Props) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default FormRow;
