import { get, isBoolean, isFunction } from 'lodash';
import * as yup from 'yup';

interface FieldValidation {
  type: string;
  params?: any[];
}

interface Field {
  name: string;
  value?: any;
  validationType?: string;
  validations?: FieldValidation[];
  lazy?: (validator: any, yup: any) => any;
  isLanguageSchema?: boolean;
  onSubmitValue?: (value: any, values: any) => any;
  disabled?: boolean;
}

interface FormValues {
  [key: string]: any;
}

const createYupSchema = (field: Field, languages: string[]): yup.Schema<any> => {
  const { validationType = 'string', validations = [], lazy, isLanguageSchema } = field;

  let validator = (yup as any)[validationType]();
  validations.forEach(({ type, params }: FieldValidation) => {
    switch (type) {
      case 'typeError':
        validator = validator.typeError(params ? params : `Invalid ${validationType}`);
        break;
      case 'address':
        validator = validator.required(
          params ? params : 'Вы должны указать здесь свой адрес! Он не должен быть пустым!'
        );
        break;
      case 'required':
        validator = validator.required(params ? params : 'Вы должны заполнить это поле!');
        break;
      case 'passwordLength':
        validator = validator.min(8, params || '');
        break;
      default:
        break;
    }
  });

  if (isFunction(lazy)) {
    validator = lazy(validator, yup);
  }

  if (isBoolean(isLanguageSchema)) {
    validator = validator.shape(
      languages.reduce(
        (prev, item) => ({
          ...prev,
          [item]: yup.string().typeError('Invalid'),
        }),
        {}
      )
    );
  }
  return validator;
};

export const createFormSchema = (fields: Field[]) => {
  const initialValues: FormValues = {};
  const validationSchema: Record<string, yup.Schema<any>> = {};
  fields.forEach((item) => {
    if ('value' in item && item.value !== undefined) {
      initialValues[item.name] = item.value;
    } else initialValues[item.name] = '';

    validationSchema[item.name] = createYupSchema(item, ['uz', 'en', 'ru']);
  });
  return {
    initialValues,
    validationSchema: yup.object().shape(validationSchema),
  };
};

const mapFormValues = (values: FormValues, fields: Field[]) => {
  const formValues: FormValues = {};

  fields.forEach((field) => {
    if (isFunction(field.onSubmitValue)) {
      formValues[field.name] = field.onSubmitValue(values[field.name], values);
    } else formValues[field.name] = values[field.name];
    if (field.disabled) delete formValues[field.name];
  });

  return formValues;
};

const getFormValues = (
  values: FormValues,
  fields: Field[],
  isFormData: boolean,
  normalizeData?: (createdValues: FormValues) => FormValues
) => {
  const createdValues = mapFormValues(values, fields);
  let formValues = isFormData ? serialize(createdValues) : createdValues;
  if (isFunction(normalizeData)) formValues = normalizeData(createdValues);

  return formValues;
};

const gerErrorMessage = (error: any) => {
  const defaultMessage = get(error, 'response.data.error.message');
  const customMessage = get(Object.values(get(error, 'response.data.message', {})), '0');

  return customMessage || defaultMessage;
};

export const formHelpers = {
  createFormSchema,
  gerErrorMessage,
  getFormValues,
};

declare const serialize: (data: any) => any;
