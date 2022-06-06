import {
  Box,
  Button,
  LinearProgress,
  ListItem,
  styled,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

export interface Image {
  name: string;
  url?: string;
}

interface Props {
  imageInfos: Image[];
  onFileChange: (files: any) => void;
}

const UploadImages = ({ onFileChange, imageInfos }: Props) => {
  const [currentFile, setCurrentFile] = useState<Image>();
  const [previewImage, setPreviewImage] = useState<string>();

  const selectFile = useCallback((e: any) => {
    setCurrentFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    onFileChange([e.target.files[0]]);
  }, []);

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <Button className="btn-choose" variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      {previewImage && (
        <Box sx={{ padding: '8px 16px' }}>
          <img
            className="preview my20"
            src={previewImage}
            alt=""
            height="80px"
          />
        </Box>
      )}
      <ul className="list-group">
        {imageInfos &&
          imageInfos.map((image: Image, index: number) => (
            <ListItem divider key={index}>
              <img
                src={image.url}
                alt={image.name}
                height="80px"
                className="mr20"
              />
            </ListItem>
          ))}
      </ul>
    </div>
  );
};

export default UploadImages;
