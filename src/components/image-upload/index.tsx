import React, { FC } from 'react';

import { Image, message } from "antd";

import { FieldProps } from 'formik';
import { ControlError } from "@/components";

import  upload_icon from '../../assets/icons/upload_icon.svg';
import './style.scss';
interface ImgUploadProps extends FieldProps {
  label?: string;
  imgURL: string;
}
const ImgUpload: FC<ImgUploadProps> = ({ field, form, label = '', imgURL }) => {
  const handleUpload = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append(`image_file`, image);
      // const { data } = await httpClient.post('category', formData);
      form.setFieldValue(field?.name, formData);
      console.log(formData);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event?.target?.files?.[0];
    if (selectedFile) {
      const allowedFileTypes = ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
      if (!allowedFileTypes.includes(selectedFile.type)) {
        message.error("Please select a file type for the uploaded");
        return;
      }
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        message.error("");
        return;
      }
      handleUpload(selectedFile);
    }
  };
  return (
    <div className="image__upload">
      <label>
        {label ? label : 'imageUpload'}
      </label>
      <div
        className={`${imgURL && 'border__green'
        } border__style`}
      >
        <img className="upload__icon" src={upload_icon} alt="" />
        <p className='text-gray-700  font-semibold'>Image Upload</p>
        <input
          className="image__upload__input"
          type="file"
          onChange={onInputChange}
          accept="image/*"
        />
      </div>
      {form?.values[field?.name] && (
        <div className="uploaded__image__wrapper">
          <Image
            width={100}
            height={100}
            className="uploaded__image"
            src={form?.values[field?.name]}
            alt="uploaded"
          />
        </div>
      )}
      <ControlError form={form} field={field} />
    </div>
  );
};

export default ImgUpload;
