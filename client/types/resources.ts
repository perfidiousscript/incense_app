import * as z from "zod";

export type IncenseStatistic = z.infer<typeof IncenseStatistic>;
export const IncenseStatistic = z.object({
  id: z.string().uuid(),
  burnTimeAvg: z.number(),
  burnTimeSd: z.number(),
  citrusAvg: z.number(),
  citrusSd: z.number(),
  earthyAvg: z.number(),
  earthySd: z.number(),
  etherealAvg: z.number(),
  etherealSd: z.number(),
  floralAvg: z.number(),
  floralSd: z.number(),
  fruityAvg: z.number(),
  fruitySd: z.number(),
  herbalAvg: z.number(),
  herbalSd: z.number(),
  pricePaidAvg: z.number(),
  ratingAvg: z.number(),
  savoryAvg: z.number(),
  savorySd: z.number(),
  smokeyAvg: z.number(),
  smokeySd: z.number(),
  spicyAvg: z.number(),
  spicySd: z.number(),
  sweetAvg: z.number(),
  sweetSd: z.number(),
  woodyAvg: z.number(),
  woodySd: z.number(),
});

export type Ingredient = z.infer<typeof Ingredient>;
export const Ingredient = z.object({
  id: z.string().uuid(),
  description: z.string(),
  imageUrl: z.string().optional(),
  name: z.string(),
  slug: z.string(),
});

export type Review = z.infer<typeof Review>;
export const Review = z.object({
  id: z.string().uuid(),
  burnTime: z.number(),
  citrus: z.number(),
  earthy: z.number(),
  ethereal: z.number(),
  floral: z.number(),
  fruity: z.number(),
  herbal: z.number(),
  pricePaid: z.number(),
  rating: z.string(),
  reviewBody: z.string(),
  savory: z.number(),
  smokey: z.number(),
  spicy: z.number(),
  sweet: z.number(),
  woody: z.number(),
  yearPurchased: z.number().optional(),
  createdAt: z.string(),
  user: z.object({ username: z.string() }).optional(),
});

export type User = z.infer<typeof User>;
export const User = z.object({
  id: z.string().uuid(),
  email: z.string().optional(),
  username: z.string(),
  reviews: Review.array(),
  role: z.string(),
});

export type Incense = z.infer<typeof Incense>;
export const Incense = z.object({
  id: z.string().uuid(),
  description: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  incenseStatistic: IncenseStatistic.nullable().optional(),
  ingredients: Ingredient.array().optional(),
  brand: z.object({
    name: z.string(),
    slug: z.string(),
    country: z.string(),
  }),
  userReview: Review.optional().nullable(),
  reviews: Review.array().optional(),
  slug: z.string(),
});

export type Brand = z.infer<typeof Brand>;
export const Brand = z.object({
  id: z.string().uuid(),
  country: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  name: z.string(),
  slug: z.string(),
  incenses: Incense.array().optional(),
});
