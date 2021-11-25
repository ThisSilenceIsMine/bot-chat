import styled from '@emotion/styled';
import { Input } from 'components/Input';

export interface ChatProps {
  className?: string;
}

export const Chat = ({ className }: ChatProps) => {
  return (
    <Container className={className}>
      <div style={{ height: '80%' }}></div>
      <Controls>
        <Input placeholder="Start chatting!" />
        <button> Text </button>
      </Controls>
    </Container>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(215, 223, 231);
`;
