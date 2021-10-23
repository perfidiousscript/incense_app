export interface LoadUserQueryKey {
  username: string;
  password: string;
}

export interface RegisterUserQueryKey {
  email: string;
  username: string;
  password: string;
}

export interface IncenseSearchMutation {
  brand: string;
  country: string;
  includedIngredients: string;
  excludedIngredients: string;
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
