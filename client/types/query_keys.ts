import { Incense } from "types/resources";

export interface QueryKeyObject {
  queryKey: (
    | string
    | string[]
    | { id: string }
    | { slug: string }
    | undefined
  )[];
}

export interface PaginatableQueryKeyObject {
  pageParam?: number;
}

export interface BrandsSearchQueryKeyObject extends PaginatableQueryKeyObject {
  name?: string;
  country?: string;
}

export interface LoadUserQueryKey {
  password: string;
  email: string;
}

export interface RegisterUserQueryKey {
  email: string;
  username: string;
  password: string;
}

export interface IncenseSearchMutationQueryKey
  extends PaginatableQueryKeyObject {
  brand: string;
  country: string;
  includesIngredients: string[];
  excludesIngredients: string[];
}

export interface IncenseCreateQueryKey {
  name: string;
  description: string;
  image_url?: string;
  brand_id: string;
  ingredient_ids?: string[];
}

export interface IncenseUpdateMutationQueryKey {
  description?: string;
  image_url?: string;
  ingredient_ids?: string[];
  slug?: string;
}

export interface BrandsUpdateQueryKey {
  name?: string;
  country?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
}

export interface IngredientCreateQueryKey {
  name: string;
  description: string;
  image_url?: string;
}

export interface ReviewGetQueryKey {
  queryKey: string[];
}

interface GenericReviewMutationKey {
  burn_time: number;
  year_purchased?: number;
  review_body?: string;
  rating: string;
  price_paid?: number;
  sweet: number;
  earthy: number;
  smokey: number;
  woody: number;
  ethereal: number;
  savory: number;
  fruity: number;
  herbal: number;
  spicy: number;
  citrus: number;
  floral: number;
}

export interface ReviewCreateQueryKey extends GenericReviewMutationKey {
  incense_slug: string;
}

export interface ReviewUpdateQueryKey extends GenericReviewMutationKey {
  id: string;
}
