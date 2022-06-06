import {
  Box,
  Button,
  LinearProgress,
  ListItem,
  styled,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

interface Image {
  name: string;
}

interface Props {
  onFileChange: (files: any) => void;
}

const UploadImages = ({ onFileChange }: Props) => {
  const [currentFile, setCurrentFile] = useState<Image>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [imageInfos, setImageInfos] = useState([]);

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
        <div>
          <img className="preview my20" src={previewImage} alt="" height="150" />
        </div>
      )}
      <ul className="list-group">
        {imageInfos &&
          imageInfos.map((image: any, index) => (
            <ListItem divider key={index}>
              <img
                src={image.url}
                alt={image.name}
                height="80px"
                className="mr20"
              />
              <a href={image.url}>{image.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  );
};

export default UploadImages;
