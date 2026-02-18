"use client";

import Image from "next/image";

type Props = {
  variantId: string;
};

export default function ImagePreview({ variantId }: Props) {
  switch (variantId) {
    case "image-full-padded":
      return (
        <div className="px-4 py-5">
            <Image
                loading="lazy"
                src="/stack2.avif"
                alt="layer"
                className="w-full h-full"
                width={476}
                height={394}
            />
        </div>
      );

    case "image-full-edge":
      return (
        <div>
            <Image
                loading="lazy"
                src="/stack2.avif"
                alt="layer"
                className="w-full h-full"
                width={476}
                height={394}
            />
        </div>
      );

    default:
      return null;
  }
}