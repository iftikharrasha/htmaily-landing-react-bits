"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to build a custom email template?",
    answer: "A single custom email template typically takes 3-5 business days. For template families (like a welcome series or transactional emails), expect 7-14 days depending on complexity. We also offer rush delivery options for urgent projects—just let us know your timeline."
  },
  {
    question: "Do your templates work with my email service provider?",
    answer: "Yes! Our templates are compatible with all major ESPs including Mailchimp, Klaviyo, HubSpot, SendGrid, Constant Contact, Campaign Monitor, and more. We can deliver the templates in your specific platform's format or provide raw HTML files that you can import anywhere."
  },
  {
    question: "What's included in your email template builder?",
    answer: "Our email template builder includes a library of modular components (headers, footers, product grids, buttons, etc.) that you can mix and match. You get a visual editor with real-time preview, dark mode support, and the ability to export clean, production-ready HTML. Perfect for teams who need to create consistent emails without coding."
  },
  {
    question: "Do you provide email templates for transactional emails?",
    answer: "Absolutely! We specialize in transactional email templates including order confirmations, shipping notifications, password resets, welcome emails, and abandoned cart reminders. These templates can be integrated with your backend using any templating language (Handlebars, Liquid, MJML, etc.)."
  },
  {
    question: "How do you handle email client testing?",
    answer: "Every template we create undergoes rigorous testing across 90+ email clients and devices using Litmus or Email on Acid. We provide testing reports and ensure your emails look flawless in Outlook, Gmail, Apple Mail, mobile devices, and all major webmail clients."
  },
  {
    question: "Can you convert my Figma/Adobe XD designs into HTML emails?",
    answer: "Yes! Simply share your design files, and we'll convert them into pixel-perfect, responsive HTML email templates. We preserve your design vision while ensuring email client compatibility and following all email development best practices."
  },
  {
    question: "Do you offer template maintenance or updates?",
    answer: "We offer maintenance packages to keep your templates updated with changing email client requirements, brand refreshes, or new content needs. This includes regular testing, code optimization, and any necessary adjustments to maintain deliverability."
  },
//   {
//     question: "How do I get started with your HTML email templates?",
//     answer: "Getting started is simple! Just browse our template library or contact us with your specific requirements. We'll provide you with fully responsive HTML email templates that are tested across 90+ email clients including Gmail, Outlook, Apple Mail, and Yahoo. Each template comes with easy-to-edit source files and documentation."
//   },
//   {
//     question: "Why should I choose custom-coded email templates over drag-and-drop builders?",
//     answer: "Custom-coded HTML email templates offer superior compatibility, faster load times, and complete design freedom. While drag-and-drop builders are convenient, they often produce bloated code that renders inconsistently across email clients. Our hand-coded templates ensure your emails look perfect everywhere, with better deliverability rates and engagement."
//   },
];

export default function FAQ() {
  return (
    <section className="relative w-full bg-black py-8 md:py-16 overflow-hidden">
      <div className="mx-auto w-full max-w-280 will-change-transform transform-gpu backface-hidden px-4 md:px-0">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Frequently Asked{" "}
            <span className="text-[#18E299] relative inline-block">
              Questions
              <svg
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 h-2 w-full text-[#18E299] md:h-3"
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

        {/* Accordion */}
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="
                px-6
                border border-t-white/10 border-b-white/10 border-x-0
                data-[state=open]:border-[#18E299]/50
                data-[state=open]:bg-[#18E299]/5
                transition-all duration-300
                hover:border-white/20
              "
            >
              <AccordionTrigger
                className="
                  py-6
                  group
                  text-left text-white
                  hover:text-[#18E299]
                  [&[data-state=open]>div>svg]:rotate-180
                  [&[data-state=open]]:text-[#18E299]
                  hover:no-underline
                  [&>svg]:hidden 
                  cursor-pointer
                "
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg md:text-xl font-semibold pr-8">
                    {faq.question}
                  </span>
                  
                  {/* Custom animated arrow */}
                  <div className="
                    w-8 h-8 
                    rounded-full 
                    bg-white/5 
                    border border-white/10
                    flex items-center justify-center
                    group-hover:border-[#18E299]/30
                    group-hover:bg-[#18E299]/10
                    transition-all duration-300
                  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 25"
                      fill="none"
                      className="
                        transition-transform duration-300 ease-in-out
                        group-data-[state=open]:rotate-180
                        text-white/60 group-hover:text-[#18E299]
                      "
                    >
                      <path
                        d="M20.031 9.67655L12.531 17.1765C12.4614 17.2463 12.3787 17.3016 12.2876 17.3393C12.1966 17.3771 12.099 17.3965 12.0004 17.3965C11.9019 17.3965 11.8043 17.3771 11.7132 17.3393C11.6222 17.3016 11.5394 17.2463 11.4698 17.1765L3.96979 9.67655C3.82906 9.53582 3.75 9.34495 3.75 9.14592C3.75 8.9469 3.82906 8.75603 3.96979 8.6153C4.11052 8.47457 4.30139 8.39551 4.50042 8.39551C4.69944 8.39551 4.89031 8.47457 5.03104 8.6153L12.0004 15.5856L18.9698 8.6153C19.0395 8.54562 19.1222 8.49034 19.2132 8.45263C19.3043 8.41492 19.4019 8.39551 19.5004 8.39551C19.599 8.39551 19.6965 8.41492 19.7876 8.45263C19.8786 8.49034 19.9614 8.54562 20.031 8.6153C20.1007 8.68498 20.156 8.76771 20.1937 8.85875C20.2314 8.9498 20.2508 9.04738 20.2508 9.14592C20.2508 9.24447 20.2314 9.34205 20.1937 9.4331C20.156 9.52414 20.1007 9.60687 20.031 9.67655Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent
                className="
                  pb-6
                  text-white/70
                  leading-relaxed
                  text-base
                  border-t border-white/10
                  pt-4
                  mt-2
                "
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-[#18E299] hover:text-[#18E299]/80 transition-colors"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}