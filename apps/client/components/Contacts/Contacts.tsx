import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { ContactItem } from './ContactItem/ContactItem';
import { Tab, TabPanel, TabList, TabsProps } from 'react-tabs';
import { Input } from '../Input';
import { UserContact } from '@bot-chat/shared-types';
import { useState } from 'react';

//Import Tabs dynamically to disable ssr (which results in error messages)
const Tabs = dynamic<TabsProps>(
  () => import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);
interface ContactsProps {
  contacts: UserContact[];
  myName: string;
  onSelect?: (contact: UserContact) => void;
  selected?: UserContact;
}

export const Contacts = ({
  contacts,
  myName,
  onSelect,
  selected,
}: ContactsProps) => {
  const _contacts = contacts.filter(
    (x) => x.name !== localStorage.getItem('username')
  );

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>Online</Tab>
          <Tab>All</Tab>
        </TabList>
        <TabPanel>
          {_contacts
            .filter((x) => x.isOnline)
            .map((contact) => (
              <ContactItem
                onClick={() => onSelect && onSelect(contact)}
                key={contact.name}
                name={contact.name}
                avatar={contact.avatar}
                isOnline={contact.isOnline}
                isSelected={selected === contact}
              />
            ))}
        </TabPanel>
        <TabPanel>
          {_contacts
            .filter((x) => !x.isOnline)
            .map((contact) => (
              <ContactItem
                onClick={() => onSelect && onSelect(contact)}
                key={contact.name}
                name={contact.name}
                avatar={contact.avatar}
                isOnline={contact.isOnline}
                isSelected={selected === contact}
              />
            ))}
        </TabPanel>
      </Tabs>
      <Input placeholder="Search..." />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .react-tabs {
    height: 90%;
  }

  & .react-tabs > div {
    max-height: 85%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media screen and (max-width: 1140px) {
    & .react-tabs > div {
      max-height: 93%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
`;
