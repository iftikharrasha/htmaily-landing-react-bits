"use client";

type Props = {
  title: string
  subTitle: string
}

export default function SectionTitle({ title, subTitle }: Props)  {
  return (
    <div className="mx-auto w-full max-w-280 mb-4 md:mb-12">
        <h2 className=" text-2xl lg:text-4xl font-bold text-[#FAFAFA] mb-4 md:mb-12">
        {title}<br />
        <span className="relative italic font-normal text-white/60">{subTitle}
          <svg 
            viewBox="0 0 200 9" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-1 left-0 h-2 w-full text-[#18E299] md:h-3"
          >
            <path 
              d="M2.00025 6.99997C25.7602 3.86993 116.326 -1.82944 198.006 2.05929" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </svg>
        </span>
        </h2>
    </div>
  );
}