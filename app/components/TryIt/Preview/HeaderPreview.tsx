"use client";

type Props = {
  variantId: string;
};

export default function HeaderPreview({ variantId }: Props) {
  switch (variantId) {
    case "logo-left":
      return (
        <div className="flex items-center justify-start px-4 py-3">
          <div className="w-24 h-8 bg-black rounded" />
        </div>
      );

    case "logo-center":
      return (
        <div className="flex items-center justify-center px-4 py-3">
          <div className="w-24 h-8 bg-black rounded" />
        </div>
      );

    case "logo-icon-text":
      return (
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-black rounded-full" />
          <div className="text-black font-semibold text-lg">
            Brand Name
          </div>
        </div>
      );

    case "logo-left-links":
      return (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-24 h-8 bg-black rounded" />
          <div className="flex gap-6 text-sm text-black">
            <span>Shop</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
      );

    case "logo-left-order":
      return (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-24 h-8 bg-black rounded" />
          <div className="text-right">
            <div className="font-bold text-black">
              Order No.
            </div>
            <div className="text-black/60 text-sm">
              #12233234
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
