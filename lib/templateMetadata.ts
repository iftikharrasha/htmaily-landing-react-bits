/**
 * Template metadata constants for categorization, tagging, and seasonal organization
 */

export const CATEGORIES = [
  'Events',
  'Marketing',
  'Promotional',
  'Thank you',
  'Transactional'
];

export const TAGS = [
  'Art & Design',
  'Beauty & Personal Care',
  'Business',
  'Education',
  'Entertainment',
  'Fashion',
  'Food & Beverage',
  'Health & Fitness',
  'Home & Garden',
  'Technology',
  'Travel',
  'Sports',
  'Real Estate',
  'Finance',
  'Non-profit'
];

export const SEASONS = [
  'Christmas',
  'Holiday',
  'Easter',
  'New Year',
  'Halloween',
  'Valentine\'s Day',
  'Thanksgiving',
  'Summer',
  'Winter',
  'Spring',
  'Fall'
];

export type TemplateItem = {
  src: string;
  alt: string;
};

export const TEMPLATES: TemplateItem[] = Array.from(
  { length: 10 },
  (_, i) => ({
    src: `/preview-${i + 1}.png`,
    alt: `Template ${i + 1}`,
  })
);
