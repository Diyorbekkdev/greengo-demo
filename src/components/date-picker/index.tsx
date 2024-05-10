import React from 'react';
import { DatePicker } from 'antd';
import { FieldProps } from 'formik';
import dayjs from 'dayjs';
import { ControlError } from '..';

interface MainDatePickerProps extends FieldProps {
  label: string;
  format?: string;
  placeholder: string;
  size?: 'large' | 'small' | 'middle';
  labelClass?: string;
  value?: any
}

const MainDatePicker: React.FC<MainDatePickerProps> = ({
                                                         field,
                                                         form,
                                                         label,
                                                         format = 'YYYY-MM-DD',
                                                         placeholder,
                                                         size = 'large',
                                                         labelClass,
                                                       }) => {
  const handleChange = (dateString: string) => {
    form.setFieldValue(field.name, dateString);
  };

  return (
    <div style={{ marginTop: '8px', width: '100%' }}>
      <label className={`label ${labelClass}`}>
        {label}
      </label>
      <div style={{ marginTop: '5px' }} className={`input-container ${form.touched[field.name] && form.errors[field.name] ? 'shake' : ''}`}>
        <DatePicker
          value={field.value && dayjs(field.value, format)}
          onChange={handleChange}
          format={format}
          placeholder={placeholder}
          size={size}
          style={{ width: '100%' }}
        />
      </div>
      <ControlError form={form} field={field} />
    </div>
  );
};

export default MainDatePicker;
