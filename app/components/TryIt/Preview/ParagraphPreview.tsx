"use client";

type Props = {
  variantId: string;
};

export default function ParagraphPreview({ variantId }: Props) {
  switch (variantId) {
    case "paragraph-left":
      return (
        <div className="px-4 py-5 bg-[#EEECE0]">
          <h1 className="text-sm font-normal text-left text-black">
            Create custom emails without coding. Customize modules, launch campaigns, and export templates to email marketing software. HTMAILY isn’t just for business. Send stunning emails to surprise loved ones, friends, students, charity donors, or community members.
          </h1>
        </div>
      );

    case "paragraph-center":
      return (
        <div className="px-4 py-5 bg-[#EEECE0]">
          <h1 className="text-sm font-normal text-center text-black">
            Create custom emails without coding. Customize modules, launch campaigns, and export templates to email marketing software. HTMAILY isn’t just for business. Send stunning emails to surprise loved ones, friends, students, charity donors, or community members.
          </h1>
        </div>
      );

    default:
      return null;
  }
}