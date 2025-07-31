import Image from 'next/image';

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ArticleImage({ src, alt, caption }: ArticleImageProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="rounded-lg object-cover aspect-video"
      />
      {caption && (
        <figcaption className="text-center text-sm text-neutral-gray mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}