import styled from '@emotion/styled';
import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import TextField from '../../FormInput/TextField';
import UploadImages from '../../FormInput/UploadImages';
import { Product as ProductType } from '../../../../generated/graphql';
import { Image as ImageType } from '../../FormInput/UploadImages';
import { getDownloadUrl } from '../../../../utils/uploadImage';

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
  product?: ProductType;
  fileChangeHandler: (files: any) => void;
}

const FormDetail = ({ fileChangeHandler, product }: Props) => {
  const [imageInfos, setImageInfos] = useState<ImageType[]>([]);

  const getImageUrls = useCallback(async () => {
    const images = await Promise.all(
      product?.images?.map(async (i) => {
        return {
          name: `image${i.id}`,
          url: await getDownloadUrl(i.photoLink),
        };
      }) || []
    );
    if (images) setImageInfos(images);
  }, [product]);

  useEffect(() => {
    getImageUrls();
  }, [getImageUrls]);

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
              <TextField name="quantity" label="Inventory available" />
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
          <UploadImages
            onFileChange={fileChangeHandler}
            imageInfos={imageInfos}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormDetail;
