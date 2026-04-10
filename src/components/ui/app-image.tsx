import Image, { type ImageProps, type StaticImageData } from 'next/image';

type AppImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: StaticImageData;
  alt: string;
};

export function AppImage({ src, alt, sizes = '100vw', ...props }: AppImageProps) {
  return <Image alt={alt} sizes={sizes} src={src} {...props} />;
}
