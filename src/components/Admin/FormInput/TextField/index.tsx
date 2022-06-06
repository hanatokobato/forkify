import React from 'react';
import { TextField, Grid, TextFieldProps } from '@mui/material';
import { Field } from 'react-final-form';

type Props = TextFieldProps & {
  name: string;
  label: string;
};

function AdminTextField({ name, label, required, ...props }: Props) {
  const isError = false;
  const requiredValidator = (value: any) =>
    !required || value ? undefined : 'Required';

  return (
    <Grid item xs={12} sm={6}>
      <Field name={name} label={label} validate={requiredValidator}>
        {({ input, meta, ...rest }) => (
          <TextField
            {...input}
            {...rest}
            {...props}
            fullWidth
            required={required}
            error={meta.touched && meta.error ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              input.onChange(event.target.value)
            }
            helperText={meta.touched ? meta.error : ''}
          />
        )}
      </Field>
    </Grid>
  );
}

export default AdminTextField;
