export interface SwapiList {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  gender: string;
  birth_year: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  url: string;
}

export interface Planet {
  name: string;
  climate: string;
  population: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  url: string;
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  url: string;
}

export interface Species {
  name: string;
  classification: string;
  language: string;
  url: string;
}
