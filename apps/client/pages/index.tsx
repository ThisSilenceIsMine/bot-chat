import styled from '@emotion/styled';
import { UserInfo as _UserInfo } from '../components/UserInfo';
import { Contacts } from '../components/Contacts';
import { Chat as _Chat } from '../components/Chat';
import { useChat } from '../lib/hooks/useChat';
import { useState } from 'react';
import { UserContact } from '@bot-chat/shared-types';
import { useDialog } from '../lib/hooks/useDialog';

export function Index() {
  const { userData, contacts } = useChat();
  const [selectedDialog, setSelectedDialog] = useState<UserContact | undefined>(
    contacts ? contacts[0] : undefined
  );
  const { sendMessage, messages } = useDialog(selectedDialog);
  return (
    <StyledPage>
      <UserInfo
        name={userData?.name ?? 'None'}
        avatar={userData?.avatar ?? '0'}
      />
      <Contacts
        selected={selectedDialog}
        onSelect={(c) => setSelectedDialog(c)}
        myName={userData?.name}
        contacts={contacts ?? []}
      />
      <Chat messages={messages} onSend={sendMessage} />
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
