export interface Crew {
  id: number; // Assuming "int" corresponds to a number type
  name: string;
  description: string;
  status: string;
  number: string;
  roman_name: string;
  total_prime: string;
  is_yonko: string;
}

export interface Fruit {
  id: number; // Assuming "int" corresponds to a number type
  name: string;
  description: string;
  type: string;
  filename: string;
  roman_name: string;
  technicalFile: string;
}

export interface Character {
  id: number; // Assuming "int" corresponds to a number type
  name: string;
  job: string;
  size: string;
  birthday: string;
  age: string;
  bounty: string;
  status: string;
  crew: Crew;
  fruit: Fruit;
}

// The main structure is an array of Character objects
export type CharacterArray = Character[];

export interface CharactersResponse {
  items: Characters[]
  meta: Meta
  links: Links
}

export interface Characters {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
  deletedAt: unknown
}

export interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface Links {
  first: string
  previous: string
  next: string
  last: string
}
