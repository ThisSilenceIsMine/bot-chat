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
