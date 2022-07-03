import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from '@mui/material';
import React from 'react';

const FormAction = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 1.6rem',
        width: '27%',
        position: 'sticky',
        height: '100%',
        top: '7rem',
      }}
    >
      <Card sx={{ minWidth: 275, marginBottom: '2rem' }}>
        <CardContent>
          <Box sx={{ my: 3 }}>
            <Button variant="contained" type="submit" fullWidth>
              Save changes
            </Button>
          </Box>
          <Divider />
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={true} name="active" />}
                label="ACTIVE"
              />
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormAction;
