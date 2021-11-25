import styled from '@emotion/styled';
import NextImage, { ImageLoaderProps } from 'next/image';

export interface AvatarProps {
  width: string;
  height: string;
  isRounded?: boolean;
  src?: string;
  loader?: (props: ImageLoaderProps) => string;
}

const Image = styled(NextImage)<{ isRounded?: boolean }>`
  border-radius: ${(props) => (props.isRounded ? '5%' : undefined)};
`;

export const Avatar = ({
  width,
  height,
  isRounded,
  src,
  loader,
}: AvatarProps) => (
  <Image
    {...{ width, height, isRounded }}
    loader={loader ?? imageLoader}
    src={src || 'none'}
    alt="User's avatar"
  />
);

function imageLoader({ src, width }: ImageLoaderProps) {
  if (isNaN(+src)) {
    return `https://picsum.photos/${width}?random=${Math.floor(
      Math.random() * 1000
    )}`;
  }
  return `https://picsum.photos/id/${src}/${width}`;
}
