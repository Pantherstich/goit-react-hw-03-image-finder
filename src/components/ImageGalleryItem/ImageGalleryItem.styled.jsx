import styled from 'styled-components';

export const Item = styled.li`
  border-radius: 4px;
`;

export const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
