import { Input } from 'antd';
import { get, isFunction } from 'lodash';
import { ControlError } from "@/components";

interface MainTextAreaProps {
  label: string;
  placeholder: string;
  field: any;
  form: any;
  inputProps?: any;
  size?: 'large' | 'small' | 'middle';
  isValid?: (event: any) => boolean;
  labelClass?: string;
}

export const MainTextArea = (props: MainTextAreaProps) => {
  const {
    label,
    placeholder,
    field,
    form,
    inputProps,
    size = 'large',
    isValid = () => true,
    labelClass
  } = props;

  return (
    <div style={{ marginTop: '8px', width: '100%' }}>
      <label
        className={`label ${labelClass} ${get(form.touched, field.name) && get(form.errors, field.name) ? 'invalid_style' : ''}`}>
        {label}
      </label>
      <div style={{ marginTop: '5px' }}
           className={`input-container ${get(form.touched, field.name) && get(form.errors, field.name) ? 'shake' : ''}`}>
        <Input.TextArea
          {...field}
          size={size}
          style={{
            borderColor: `${get(form.touched, field.name) && get(form.errors, field.name) && 'red'}`,
          }}
          placeholder={placeholder}
          onChange={(event) => {
            if (isValid(event)) {
              isFunction(get(inputProps, 'onChange')) &&
              inputProps.onChange(event);
              field.onChange(event);
            }
          }}
        />
      </div>
      <ControlError form={form} field={field} />
    </div>
  );
};
