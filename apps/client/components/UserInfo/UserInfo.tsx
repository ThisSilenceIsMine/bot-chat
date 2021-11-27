import styled from '@emotion/styled';
import { Avatar } from '../Avatar/Avatar';
import Image, { ImageLoaderProps } from 'next/image';

interface UserInfoProps {
  name: string;
  avatar: string;
  className?: string;
}

export const UserInfo = ({ className, name, avatar }: UserInfoProps) => {
  return (
    <Container {...{ className }}>
      {/* <Image
        width="170"
        height="170"
        loader={imageLoader}
        src="42"
        alt="User's avatar"
      /> */}
      <Avatar width="170" height="170" src={avatar} />
      <TextContainer>
        <UserName>{name}</UserName>
        <UserText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          magni animi tenetur odit laboriosam quam incidunt ullam repellat,
          aliquid cum sed unde fugiat nisi ratione dolorum dignissimos illum!
          Fugit, pariatur. Dolore qui aperiam rem officiis saepe ducimus neque
          blanditiis pariatur deleniti quia? Recusandae a magnam ipsum ut natus
          excepturi hic repellat eveniet ipsam velit. Magnam tenetur numquam
          explicabo ex nemo? Fugit, sunt pariatur delectus quos itaque ratione
          aspernatur repellendus laboriosam. Incidunt, delectus.
        </UserText>
      </TextContainer>
    </Container>
  );
};

// function imageLoader({ src, width }: ImageLoaderProps) {
//   if (isNaN(+src)) {
//     return `https://picsum.photos/${width}`;
//   }
//   return `https://picsum.photos/id/${src}/${width}`;
// }

const UserName = styled.p`
  font-family: 'Open Sans';
  font-weight: 600;
  font-size: 26px;
`;
const UserText = styled.p`
  font-family: 'Open Sans', Verdana, sans-serif;
  font-size: 7.5;
  max-width: calc(100%);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextContainer = styled.div`
  max-width: calc(100%);
  padding: 1em 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* gap: 1em; */
  background-color: rgb(190, 203, 217);
  max-height: 170px;
`;

const Container = styled.div`
  display: grid;
  height: 170px;
  width: 100%;
  grid-template-columns: 170px 1fr;
  grid-template-rows: 1fr;
  background-color: rgb(190, 203, 217);
`;
