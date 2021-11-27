import styled from '@emotion/styled';
import { Input } from '../Input';
import { theme } from '../../lib/theme';
import { Message } from './Message/Message';

export interface ChatProps {
  className?: string;
}
export const Chat = ({ className }: ChatProps) => {
  return (
    <Container className={className}>
      <MessageContainer>
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message
          sender="you"
          content="
Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eveniet nihil debitis expedita, quo id. Non animi quia qui eius voluptate adipisci delectus cumque est rem, totam, enim architecto magnam."
        />
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message sender="me" isSeen content="Hello, darkness!" />
        <Message sender="me" isSeen content="Hello, darkness!" />
      </MessageContainer>

      <Controls>
        <StyledInput placeholder="Start chatting!" />
        <SendButton> Send Message </SendButton>
      </Controls>
    </Container>
  );
};

const Controls = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-around;
`;

const SendButton = styled.button`
  background-color: ${theme.colors.blue};
  border: none;
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 5px 20px 0;
  cursor: pointer;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  height: 85%;
  /* max-height: calc(80%); */
  overflow-y: auto;
  overflow-x: hidden;
`;

const StyledInput = styled(Input)`
  flex: 1 1 0px;
  margin: 0 0 20px 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(215, 223, 231);
`;
