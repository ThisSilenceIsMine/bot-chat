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
  max-width: 1140px;
  height: 100%;
  margin: 20px auto;
  display: grid;
  grid-template: 170px 1fr / repeat(4, 1fr);
`;

const UserInfo = styled(_UserInfo)`
  grid-column: 1/4;
`;

const Chat = styled(_Chat)`
  grid-column: 1/4;
  grid-row: 2/3;
`;

export default Index;
