import styled from '@emotion/styled';
import { Avatar } from '../../Avatar/Avatar';
import { theme } from '../../../lib/theme';

export interface ContactItemProps {
  name: string;
  avatar: string;
  isOnline?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ContactItem = ({
  name,
  isOnline,
  avatar,
  onClick,
  isSelected,
}: ContactItemProps) => {
  return (
    <Container {...{ onClick, isSelected }}>
      <AvatarContainer>
        <Avatar src={avatar} width="60" height="60" isRounded />
        {isOnline && <OnlineFlair />}
      </AvatarContainer>
      <TextContainer>
        <UserName>{name}</UserName>
        <UserStatus>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad fugiat
          quae veniam? Sapiente beatae maxime temporibus ab ducimus accusamus
          corrupti sit nisi aliquam, dicta quibusdam quam necessitatibus. Est,
          eveniet similique.
        </UserStatus>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div<{ isSelected?: boolean }>`
  display: flex;
  height: 62px;
  margin: 15px;
  cursor: pointer;
  ${(props) => (props.isSelected ? `background: lightGray;` : ``)}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 75px);
  margin-left: 15px;
`;

const UserName = styled.p`
  font-family: 'Open Sans';
  font-weight: 600;
`;

const UserStatus = styled.p`
  font-family: 'Open Sans';
  font-size: 14px;
  color: ${theme.colors.grayText};
  max-width: calc(100%);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OnlineFlair = styled.span`
  display: inline-block;
  position: absolute;
  background: ${theme.colors.onlineFlair};
  border-radius: 50%;
  height: 15px;
  width: 15px;
  right: -5px;
  bottom: -5px;
`;

const AvatarContainer = styled.div`
  position: relative;
  height: 60px;
  width: 60px;
`;
