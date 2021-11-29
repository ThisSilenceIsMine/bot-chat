import styled from '@emotion/styled';
import { Input } from '../Input';
import { theme } from '../../lib/theme';
import { Message } from './Message/Message';
import { socket } from '../../lib/socket';
import { Message as MessageType } from '@bot-chat/shared-types';
import { useEffect, useRef } from 'react';

export interface ChatProps {
  onSend: (content: string) => void;
  messages: MessageType[];
  className?: string;
  disabled?: boolean;
}
export const Chat = ({ className, onSend, messages, disabled }: ChatProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const scrollRef = useRef<HTMLDivElement>(null!);
  const onClick = () => {
    if (inputRef.current && inputRef.current?.value.replace(' ', '') !== '') {
      onSend(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <Container className={className}>
      <MessageContainer>
        {messages &&
          messages.map((val) => (
            <Message
              key={val.timeStamp}
              timeStamp={val.timeStamp}
              content={val.content}
              sender={val.sender}
              seenAt={val.seenAt}
            />
          ))}
        <div style={{ float: 'left', clear: 'both' }} ref={scrollRef} />
      </MessageContainer>

      <Controls>
        <StyledInput
          disabled={disabled}
          ref={inputRef}
          placeholder="Start chatting!"
        />
        <SendButton disabled={disabled} onClick={onClick}>
          Send Message
        </SendButton>
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
