import styled from '@emotion/styled';
import { theme } from 'lib/theme';

export const Input = styled.input`
  font-family: 'Open Sans';
  --webkit-appearance: none;
  font-weight: 600;
  display: block;

  border-color: rgb(204, 204, 204);
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;

  font-size: 16px;
  padding: 8px 10px;
  width: 90%;
  margin: 0 auto 20px auto;
  &:focus {
    outline: ${theme.colors.blue} solid 2px;
  }
  &::placeholder {
    font-weight: 900;
    color: ${theme.colors.grayText};
  }
`;
