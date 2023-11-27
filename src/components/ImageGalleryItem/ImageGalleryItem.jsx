import { ImgItem, ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <ImgGalleryItem onClick={onClick}>
      <ImgItem src={item.webformatURL} alt={item.tags} id={item.id} />
    </ImgGalleryItem>
  );
};
