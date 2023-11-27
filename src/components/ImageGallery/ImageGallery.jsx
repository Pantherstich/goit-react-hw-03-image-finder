import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from './ImageGallery.styled';

export const ImageGallery = ({ items, openModal }) => {
  return (
    <ImagesList>
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} onClick={openModal} />
      ))}
    </ImagesList>
  );
};
