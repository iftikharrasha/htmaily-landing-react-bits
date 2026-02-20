export type EmailStackItem = {
  id: string
  tag: string
  title: string
  description: string
  features: string[]
  images: string[]   
  bgColor: string
  spotlightColor: string
  accentColor: string
  buttonText: string
  buttonHref: string
}

export const EMAIL_STACKS: EmailStackItem[] = [
  {
    id: "header",
    tag: "Email Header",
    title: "High-converting Email Headers",
    description:
      "Hero sections designed for maximum open-to-click conversion with clean hierarchy and responsive layouts.",
    features: [
      "Brand-safe typography",
      "CTA-focused layout",
      "Dark & light modes",
    ],
    images: [
      "/stack4.avif",
      "/stack5.avif",
      "/stack1.avif",
      "/stack2.avif",
      "/stack3.avif",
    ],
    bgColor: "#E0E7FF", // soft indigo
    // bgColor: "#000000", 
    accentColor: "#6366F1",
    spotlightColor: "rgba(99, 102, 241, 0.2)",
    buttonText: "View Header Templates",
    buttonHref: "/templates/headers",
  },
  {
    id: "body",
    tag: "Email Body",
    title: "Readable & Structured Content",
    description:
      "Perfectly spaced sections with text, lists, tables, and product blocks that scale across devices.",
    features: [
      "Bullet & table support",
      "Modular sections",
      "Email-client tested",
    ],
    images: [
      "/stack1.avif",
      "/stack5.avif",
      "/stack2.avif",
      "/stack3.avif",
      "/stack4.avif",
    ],
    bgColor: "#ECFEFF", // cyan
    // bgColor: "#000000",
    accentColor: "#c9fff7",
    spotlightColor: "rgba(201, 255, 247, 0.2)",
    buttonText: "Explore Content Blocks",
    buttonHref: "/templates/body",
  },
  {
    id: "footer",
    tag: "Email Footer",
    title: "Trust-building Footers",
    description:
      "Footers that increase credibility with contact info, social links, and legal sections.",
    features: [
      "Unsubscribe-safe layout",
      "Brand consistency",
      "Minimal & compliant",
    ],
    images: [
      "/stack3.avif",
      "/stack1.avif",
      "/stack2.avif",
      "/stack4.avif",
      "/stack5.avif",
    ],
    bgColor: "#18E299", // warm yellow
    // bgColor: "#000000", 
    accentColor: "#18E299",
    spotlightColor: "rgba(7, 201, 131, 0.2)",
    buttonText: "Browse Footer Designs",
    buttonHref: "/templates/footer",
  },
]