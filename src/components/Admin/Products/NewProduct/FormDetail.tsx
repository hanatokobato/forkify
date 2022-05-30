import styled from '@emotion/styled';
import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import TextField from '../../FormInput/TextField';
import UploadImages from '../../FormInput/UploadImages';

const PREFIX = 'FormDetail';

const classes = {
  inputWrapper: `${PREFIX}-inputWrapper`,
};

const InputWrapper = styled(Box)(({ theme }) => ({
  [`&.${classes.inputWrapper}`]: {
    marginBottom: '1rem',
  },
}));

interface Props {
  fileChangeHandler: (files: any) => void;
}

const FormDetail = ({ fileChangeHandler }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 1.6rem',
        width: '55%',
      }}
    >
      <Card sx={{ minWidth: 275, marginBottom: '2rem' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="header"
            sx={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1.6rem' }}
          >
            DETAILS
          </Typography>
          <InputWrapper className={classes.inputWrapper}>
            <TextField required name="name" label="Name" />
          </InputWrapper>
          <InputWrapper
            className={classes.inputWrapper}
            sx={{ display: 'flex' }}
          >
            <Box sx={{ width: '50%' }}>
              <TextField name="sku" label="SKU" />
            </Box>
            <Box sx={{ width: '50%', marginLeft: '1rem' }}>
              <TextField name="inventory" label="Inventory available" />
            </Box>
          </InputWrapper>
          <InputWrapper className={classes.inputWrapper}>
            <TextField
              name="description"
              label="Description"
              rows={5}
              multiline
            />
          </InputWrapper>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275, marginBottom: '2rem' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="header"
            sx={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1.6rem' }}
          >
            PRICE
          </Typography>
          <InputWrapper className={classes.inputWrapper}>
            <TextField required name="price" label="Price" type="number" />
          </InputWrapper>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275, marginBottom: '2rem' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="header"
            sx={{ fontSize: '1rem', fontWeight: 900, marginBottom: '1.6rem' }}
          >
            IMAGES GALLERY
          </Typography>
          <UploadImages onFileChange={fileChangeHandler} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormDetail;
