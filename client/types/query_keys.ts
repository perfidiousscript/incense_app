import { Incense } from "/types/resources";

export interface QueryKeyObject {
  queryKey: String[];
}

export interface PaginatableQueryKeyObject {
  pageParam: undefined;
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
  imageUrl: string;
}

export interface BrandsUpdateQueryKey {
  slug?: string;
}
