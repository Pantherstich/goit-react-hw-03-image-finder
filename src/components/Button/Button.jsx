import { LoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadMore type="button" aria-label="Load more" onClick={onClick}>
      Load more
    </LoadMore>
  );
};
