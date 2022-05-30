import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const IMAGE_PATH = 'images/';

export async function uploadImage(image: any) {
  const imageUrl = `${IMAGE_PATH}${image.name + v4()}`;
  const imageRef = ref(storage, imageUrl);
  await uploadBytes(imageRef, image);
  return imageUrl;
}

export function getDownloadUrl(imagePath: string) {
  return getDownloadURL(ref(storage, imagePath)).then((url) => url);
}
