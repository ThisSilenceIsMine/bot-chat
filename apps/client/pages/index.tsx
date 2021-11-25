import styled from '@emotion/styled';

import { UserInfo as _UserInfo } from 'components/UserInfo';
import { Contacts } from 'components/Contacts';
import { Chat as _Chat } from 'components/Chat';

export function Index() {
  return (
    <StyledPage>
      <UserInfo />
      <Contacts />
      <Chat />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  background-color: white;
  /* max-width: 1140px; */
  max-width: 80%;
  /* height: 100%; */
  margin: 20px auto;
  height: 650px;
  max-height: 100%;
  display: grid;
  grid-template: 170px 1fr / repeat(4, 1fr);
  /* @media (max-height: 700px) {
    height: 100%;
    grid-template: 50px 1fr / repeat(4, 1fr);
  } */
  @media screen and (max-width: 1140px) {
    max-width: 100%;
    flex: 1 1 0px;
    margin: 0;
  }
`;

const UserInfo = styled(_UserInfo)`
  grid-column: 1/4;
`;

const Chat = styled(_Chat)`
  grid-column: 1/4;
  grid-row: 2/3;
  min-height: 500px;
`;

export default Index;
