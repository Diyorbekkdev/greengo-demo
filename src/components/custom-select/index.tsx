import { Select } from 'antd';
import { get, truncate } from 'lodash';
import { ControlError } from '..';
import { useState } from 'react';
import { httpClient } from '@/utils';


interface MainSelectProps {
  label: string;
  field: any;
  form: any;
  placeholder: string;
  options: { value: string; label: string }[];
  size?: 'large' | 'small' | 'middle';
  labelClass?: string;
  url: string;
  params?: any;
}

export const MainSelect = (props: MainSelectProps) => {
  const { url, params, label, field, form, placeholder, size = 'large', labelClass } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [focused, setFocused] = useState(false);
  const [defaultvalue, setDefaultValue] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await httpClient({
        method: "GET",
        url,
        params: params
          ? { page: 1, pageSize: 1000, ...params }
          : { page: 1, pageSize: 1000 },
      });
      if (data) {
        let newData;
        switch (url) {
          case 'locker/simcard/':
            newData = data?.simcards?.map((item: any) => ({
              value: item.id,
              label: truncate(item?.simcard || item?.simcard, {
                length: 30,
                omission: "...",
              }),
            }));
            break;
          case 'locker':
            newData = data?.lockers?.map((item: any) => ({
              value: item.id,
              label: truncate(item?.imei, {
                length: 30,
                omission: "...",
              }),
            }));
            break;
          case 'bicycle':
            newData = data?.bicycles?.map((item: any) => ({
              value: item.number,
              label: truncate(item?.number, {
                length: 30,
                omission: "...",
              }),
            }));
            break;
          default:
            newData = data.map((item: any) => ({
              value: item.id,
              label: truncate(item?.name || item?.simcard || item?.imei, {
                length: 30,
                omission: "...",
              }),
            }));
            break;
        }
        setData(newData);
        setDefaultValue(newData?.[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleFocus = () => {
    setFocused(true);
    if (!data.length && url) {
      fetchData();
    }
  };
  const handleChange = (option: any) => {
    form?.setFieldValue(field?.name, option);
  };

  console.log(focused);

  return (
    <div style={{ marginTop: '8px', width: '100%' }}>
      <label className={`label ${labelClass} ${get(form.touched, field.name) && get(form.errors, field.name) ? 'invalid_style' : ''}`}>{label}</label>
      <div style={{ marginTop: '5px' }} className={`input-container ${get(form.touched, field.name) && get(form.errors, field.name) ? 'shake' : ''}`}>
        <Select
          {...field}
          value={field?.value}
          loading={loading}
          size={size}
          allowClear
          onBlur={() => setFocused(false)}
          fieldNames={field?.name}
          placeholder={placeholder}
          defaultValue={defaultvalue}
          onFocus={handleFocus}
          style={{
            borderColor: `${get(form.touched, field.name) && get(form.errors, field.name) && 'red'}`,
            width: '100%'
          }}
          onChange={handleChange}
          options={data}
        />

      </div>
      <ControlError form={form} field={field} />
    </div>
  );
};