import styled from '@emotion/styled';

const ArrowStyleLeft = `  
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;

border-right: 10px solid white;

left: -10px;
`;

const ArrowStyleRight = `
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;

border-left: 10px solid white;
right: -10px;
`;

export const Arrow = styled.div<{ isLeft?: boolean }>`
  position: absolute;
  width: 0;
  height: 0;
  ${(props) => (props.isLeft ? ArrowStyleLeft : ArrowStyleRight)};

  bottom: 30%;
`;
