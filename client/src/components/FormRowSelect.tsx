import type { ChangeEventHandler } from 'react';

interface Props {
  name: string;
  labelText?: string;
  list: readonly string[];
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
}: Props) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
