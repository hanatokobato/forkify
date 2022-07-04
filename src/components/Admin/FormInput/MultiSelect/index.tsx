import { FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const MultiSelect = ({
  input: { value, name, onChange, ...restInput },
  meta,
  ...rest
}: any) => (
  <FormControl className={rest.styling} fullWidth>
    <InputLabel id="select-multiple-chip">{rest.labelname}</InputLabel>
    <Select
      labelId="select-multiple-chip"
      label={rest.labelname}
      MenuProps={MenuProps}
      multiple
      displayEmpty
      {...rest}
      name={name}
      inputProps={restInput}
      error={meta.error && meta.touched}
      onChange={onChange}
      value={[...value]}
    />
  </FormControl>
);

export default MultiSelect;
