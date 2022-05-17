import React from 'react';
import { TextField, Grid } from '@mui/material';
import { Field } from 'react-final-form';

interface Props {
  name: string;
  label: string;
  required: boolean;
}

function FormInput({ name, label, required }: Props) {
  const isError = false;
  const requiredValidator = (value: any) => (!required || value ? undefined : 'Required');

  return (
    <Grid item xs={12} sm={6}>
      <Field name={name} label={label} validate={requiredValidator} required>
        {({ input, meta, ...rest }) => (
          <TextField
            {...input}
            {...rest}
            fullWidth
            error={meta.touched && meta.error ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => input.onChange(event.target.value)}
            helperText={meta.touched ? meta.error : ''}
          />
        )}
      </Field>
    </Grid>
  );
}

export default FormInput;
