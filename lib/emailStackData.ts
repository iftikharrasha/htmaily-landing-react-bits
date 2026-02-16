export type EmailStackItem = {
  id: string
  tag: string
  title: string
  description: string
  features: string[]
  image: string
  bgColor: string
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
    image: "/stack1.avif",
    bgColor: "#E0E7FF", // soft indigo
    accentColor: "#6366F1",
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
    image: "/stack1.avif",
    bgColor: "#FEF3C7", // warm yellow
    accentColor: "#F59E0B",
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
    image: "/stack1.avif",
    bgColor: "#ECFEFF", // cyan
    accentColor: "#06B6D4",
    buttonText: "Browse Footer Designs",
    buttonHref: "/templates/footer",
  },
]