import {get} from "lodash";
interface IControlError{
    form: any;
    field: any;
}
export const ControlError = ({form, field}: IControlError) => {
  return (
    <>
      {get(form.touched, field.name) && get(form.errors, field.name) && (
        <div className='text-red-600'>
          {form.errors[field.name] && field.name && ('This field is required')}
        </div>
      )}
    </>
  );
};
