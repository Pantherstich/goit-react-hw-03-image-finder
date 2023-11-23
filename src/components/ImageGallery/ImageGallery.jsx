import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled';

export const ImageGallery = ({ items, openModal }) => {
  return (
    <ImageGallery>
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} onClick={openModal} />
      ))}
    </ImageGallery>
  );
};
