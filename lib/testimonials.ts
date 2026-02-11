export type Testimonial = {
  id: number
  name: string
  profession: string
  brand: string
  comment: string
  avatar: string
}

const avatars = [
  "/team01.png",
  "/team02.png",
  "/team03.png",
  "/team04.png",
]

const names = [
  "Emran Hasan",
  "Moshiur Rahman Radif",
  "Jenna Carvalho",
  "Austin",
  "Sofia Gouveia",
  "Michael Chen",
  "Sarah Johnson",
  "David Martinez",
]

const professions = [
  "CEO & Co-Founder",
  "COO",
  "Principal",
  "Design Director",
  "Marketing Manager",
  "Product Lead",
  "Founder",
  "CTO",
]

const brands = [
  "Klasio",
  "Ontik Technologies",
  "Guardian Estate Company",
  "Clarity LLC",
  "Esdiac",
  "TechFlow",
  "DesignHub",
  "InnovateCo",
]

const comments = [
  "Thanks to the team for building a world-class solution that captured our vision and helped us land customers from day one. Highly recommended!",
  "We've worked with them for over two years on multiple projects. Clear communication, great execution, and reliable delivery every time.",
  "They were proactive, efficient, and challenged our assumptions in the best way. The final result exceeded expectations.",
  "I've partnered with them on several projects and each one has been a success. Strong design sense and flawless execution.",
  "Working with them was smooth and collaborative. They listened carefully and delivered consistent, high-quality work.",
  "Their attention to detail and creative thinking helped us move faster and smarter. Truly professional.",
  "Outstanding service from start to finish. They understood our needs perfectly and delivered beyond expectations.",
  "They brought clarity, speed, and creativity to our project. A team we genuinely trust.",
]

export const generateFakeTestimonials = (): Testimonial[] => {
  return Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    name: names[index],
    profession: professions[index],
    brand: brands[index],
    comment: comments[index],
    avatar: avatars[index % avatars.length],
  }))
}
