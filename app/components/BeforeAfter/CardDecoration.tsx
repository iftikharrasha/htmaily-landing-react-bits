import Image from "next/image"

type Props = {
  src: string
  alt: string
  width: number
  height: number
  containerClass?: string
  className?: string
}

export default function CardDecoration({
  src,
  alt,
  width,
  height,
  containerClass = "",
  className = "",
}: Props) {
  return (
    <div className={`absolute z-0 ${containerClass}`}>
      <Image
        loading="lazy"
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </div>
  )
}