import styled from '@emotion/styled';
import { theme } from '../../../lib/theme';
import { Arrow } from './Arrow';
import { DateTime } from 'luxon';
import { time } from 'console';
export interface MessageProps {
  content: string;
  sender: string;
  timeStamp: string;
  seenAt?: string;
}

export const Message = ({
  content,
  sender,
  timeStamp,
  seenAt,
}: MessageProps) => {
  const isRecieved = sender !== localStorage.getItem('username');

  return (
    <Container isLeft={isRecieved}>
      <Title>
        <span>{sender}</span>
        <GrayLabel>
          {DateTime.fromMillis(+timeStamp)
            .toLocal()
            .toLocaleString(DateTime.TIME_24_SIMPLE)}
        </GrayLabel>
      </Title>
      <Text>
        {/* <span style={{ maxWidth: '100%', overflowWrap: 'break-word' }}> */}
        {content}
        {/* </span> */}
        <Arrow isLeft={isRecieved} />
      </Text>
      {!isRecieved && seenAt && (
        <GrayLabel>
          Seen at{' '}
          {DateTime.fromMillis(+seenAt)
            .toLocal()
            .toLocaleString(DateTime.TIME_24_SIMPLE)}
        </GrayLabel>
      )}
    </Container>
  );
};

const Container = styled.div<{ isLeft?: boolean }>`
  ${(props) => (props.isLeft ? '' : 'align-self: flex-end;')}
  margin-right: 10px;
  max-width: 30%;
  min-width: 40%;
  margin-left: 10px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  overflow-wrap: break-word;
  & > div:first-of-type {
    background-color: ${(props) =>
      props.isLeft ? theme.colors.recievedMessage : theme.colors.sentMessage};
  }
`;

const Title = styled.div`
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 10px 20px;
  background-color: gray;
`;

const Text = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 100%;

  padding: 10px 20px;
  border-radius: 0 0 10px 10px;
  background-color: white;
`;

const GrayLabel = styled.span`
  margin: 0 5px;
  color: ${theme.colors.grayText};
`;
