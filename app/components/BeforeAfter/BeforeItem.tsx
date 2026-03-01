"use client"

// import Image from "next/image"

export default function BeforeItem() {
  return (
    <div className="w-full h-full bg-white flex items-start justify-center overflow-hidden">
      {/* Email container */}
      <div className="w-full max-w-140 min-h-90 px-2 text-left text-[12px] leading-relaxed text-neutral-800">
        
        {/* Greeting */}
        <p className="mb-4">Hi Michael,</p>

        {/* Body */}
        <p className="mb-4">
          I hope you’re doing well.
        </p>

        <p className="mb-4">
          I just wanted to reach out and let you know that HTMLY Editor
          offers tools and services that can help businesses manage their mail
          design and get better visibility into their marketing world. We
          work with different types of businesses and provide custom designs 
          depending on brand descriptions.
        </p>

        <p className="mb-4">
          If you are interested, we can discuss what options might be available
          to you and see if you qualify. Let me know a good time to connect or
          if you need more information.
        </p>

        {/* Signature */}
        <p className="mt-4">
          Best regards,
          <br />
          Daniel
          <br />
          Team HTMLY
        </p>
      </div>
      <div className="absolute bottom-4 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        BEFORE
      </div>
    </div>
  )
}