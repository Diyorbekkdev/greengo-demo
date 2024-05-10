import { Radio } from 'antd';
import { get } from 'lodash';
import { ControlError } from '..';

const { Group } = Radio;

interface MainRadioProps {
  label: string;
  field: any;
  form: any;
  options: { value: string; label: string }[];
  labelClass?: string;
}

export const MainRadio = (props: MainRadioProps) => {
  const { label, field, form, options, labelClass } = props;
  return (
    <div style={{ marginTop: '8px', width: '100%' }}>
      <label className={`label ${labelClass} ${get(form.touched, field.name) && get(form.errors, field.name) ? 'invalid_style' : ''}`}>{label}</label>
      <div style={{ marginTop: '5px' }} className={`input-container ${get(form.touched, field.name) && get(form.errors, field.name) ? 'shake' : ''}`}>
        <Group
          {...field}
        >
          {options?.map((option) => (
            <Radio onChange={(e) => {
              form.setFieldValue(field.name, e.target.value);
            }} key={option.value} defaultChecked value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Group>
      </div>
      <ControlError form={form} field={field} />
    </div>
  );
};