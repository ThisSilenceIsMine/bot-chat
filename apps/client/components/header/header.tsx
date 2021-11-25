import styled from '@emotion/styled';

export const Header = () => {
  return (
    <StyledHeader>
      <H>Chat Bots 2.0</H>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: white;
`;

const H = styled.h1`
  font-size: 32px;
  font-family: 'Open Sans', Arial, sans-serif;
  font-weight: 600;
  margin-left: 80px;
  margin-top: calc(60px - 1em);
  @media (max-width: 500px) {
    margin-left: min(5%, 80px);
  }
`;
