import styled from '@emotion/styled';
import { ContactItem } from './ContactItem/ContactItem';
import { Tab, TabPanel, TabList, Tabs } from 'react-tabs';
import { Input } from '../Input';

export const Contacts = () => {
  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>Online</Tab>
          <Tab>All</Tab>
        </TabList>
        <TabPanel>
          <ContactItem name="Pablo" />
          <ContactItem name="Juan" isOnline />
          <ContactItem name="Juan" isOnline />
          <ContactItem name="Juan" isOnline />
          <ContactItem name="Juan" isOnline />
          <ContactItem name="Juan" isOnline />
          <ContactItem name="Juan" isOnline />
        </TabPanel>
        <TabPanel>Hello!</TabPanel>
      </Tabs>
      <Input placeholder="Search..." />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  height: 500px;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .react-tabs {
    max-height: 85%;
  }

  & .react-tabs > div {
    max-height: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;
