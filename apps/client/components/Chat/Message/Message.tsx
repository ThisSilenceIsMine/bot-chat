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
          {' '}
          {DateTime.fromSeconds(+timeStamp)
            .toLocal()
            .toLocaleString(DateTime.TIME_SIMPLE)}{' '}
        </GrayLabel>
      </Title>
      <Text>
        {content}
        <Arrow isLeft={isRecieved} />
      </Text>
      {!isRecieved && seenAt && (
        <GrayLabel>
          {DateTime.fromSeconds(+seenAt)
            .toLocal()
            .toLocaleString(DateTime.TIME_SIMPLE)}
        </GrayLabel>
      )}
    </Container>
  );
};

const Container = styled.div<{ isLeft?: boolean }>`
  ${(props) => (props.isLeft ? '' : 'align-self: flex-end;')}
  margin-right: 10px;
  max-width: 50%;
  min-width: 20%;
  margin-left: 10px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;

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
  padding: 10px 20px;
  border-radius: 0 0 10px 10px;
  background-color: white;
`;

const GrayLabel = styled.span`
  margin: 0 5px;
  color: ${theme.colors.grayText};
`;
