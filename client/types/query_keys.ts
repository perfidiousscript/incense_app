import { Incense } from "/types/resources";

export interface QueryKeyObject {
  queryKey: (string | string[] | { slug: string } | undefined)[];
}

export interface PaginatableQueryKeyObject {
  pageParam?: number;
}

export interface BrandsSearchQueryKeyObject extends PaginatableQueryKeyObject {
  name?: string;
  country?: string;
}

export interface LoadUserQueryKey {
  username: string;
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
  includedIngredients: string;
  excludedIngredients: string;
}

export interface IncenseUpdateMutationQueryKey extends Incense {
  slug?: string;
}

export interface BrandsCreateQueryKey {
  name: string;
  description: string;
  country: string;
  imageUrl?: string;
}

export interface BrandsUpdateQueryKey {
  name?: string;
  country?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
}
