"use client";

type Props = {
  variantId: string;
};

export default function HeadlinePreview({ variantId }: Props) {
  switch (variantId) {
    case "headline-left":
      return (
        <div className="px-4 py-5">
          <h1 className="text-7xl font-extrabold text-left text-black uppercase">
            Thanks for making this day ours
          </h1>
        </div>
      );

    case "headline-center":
      return (
        <div className="px-4 py-5">
          <h1 className="text-7xl font-extrabold text-center text-black">
            Thanks for making this day ours
          </h1>
        </div>
      );

    case "headline-stacked":
      return (
        <div className="px-4 py-5 space-y-1">
          <div className="text-[150px] font-extrabold text-left text-black leading-30">GO</div>
          <div className="text-[100px] font-extrabold text-left text-black/60 leading-22">TOUCH</div>
        </div>
      );

    default:
      return null;
  }
}