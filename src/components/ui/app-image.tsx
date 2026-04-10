import Image, { type ImageProps, type StaticImageData } from 'next/image';

type AppImageProps = Omit<ImageProps, 'src' | 'alt' | 'fill'> & {
  src: string | StaticImageData;
  alt: string;
};

export function AppImage({ src, alt, sizes = '100vw', ...props }: AppImageProps) {
  const isRemote = typeof src === 'string';
  return <Image alt={alt} fill={isRemote || undefined} sizes={sizes} src={src} {...props} />;
}
