import * as z from "zod";

export type User = z.infer<typeof User>;
export const User = z.object({
  id: z.string().uuid(),
  email: z.string(),
  username: z.string(),
});

export type Brand = z.infer<typeof Brand>;
export const Brand = z.object({
  id: z.string().uuid(),
  country: z.string(),
  description: z.string(),
  image_url: z.string(),
  name: z.string(),
});

export type IncenseStatistic = z.infer<typeof IncenseStatistic>;
export const IncenseStatistic = z.object({
  id: z.string().uuid(),
  burn_time_avg: z.number(),
  burn_time_sd: z.number(),
  citrus_avg: z.number(),
  citrus_sd: z.number(),
  earthy_avg: z.number(),
  earthy_sd: z.number(),
  ethereal_avg: z.number(),
  ethereal_sd: z.number(),
  floral_avg: z.number(),
  floral_sd: z.number(),
  fruity_avg: z.number(),
  fruity_sd: z.number(),
  herbal_avg: z.number(),
  herbal_sd: z.number(),
  price_paid_avg: z.number(),
  rating_avg: z.number(),
  savory_avg: z.number(),
  savory_sd: z.number(),
  smokey_avg: z.number(),
  smokey_sd: z.number(),
  spicy_avg: z.number(),
  spicy_sd: z.number(),
  sweet_avg: z.number(),
  sweet_sd: z.number(),
  woody_avg: z.number(),
  woody_sd: z.number(),
});

export type Incense = z.infer<typeof Incense>;
export const Incense = z.object({
  id: z.string().uuid(),
  description: z.text(),
  image_url: z.text(),
  name: z.text(),
  incense_statistic: IncenseStatistic.optional(),
  ingredients: Ingredient.array.optional(),
});

export type Ingredient = z.infer<typeof Ingredient>;
export const Ingredient = z.object({
  id: z.string().uuid(),
  description: z.string(),
  image_url: z.string().optional(),
  name: z.string(),
});

export type Review = z.infer<typeof Review>;
export const Review = z.object({
  id: z.string().uuid(),
  burn_time: z.number(),
  citrus: z.number(),
  earthy: z.number(),
  ethereal: z.number(),
  floral: z.number(),
  fruity: z.number(),
  herbal: z.number(),
  price_paid: z.number(),
  rating: z.number(),
  review_body: z.string(),
  savory: z.number(),
  smokey: z.number(),
  spicy: z.number(),
  sweet: z.number(),
  woody: z.number(),
  year_purchased: z.number().optional(),
  created_at: z.string(),
  user: User,
});
