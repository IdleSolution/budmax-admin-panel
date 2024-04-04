export enum EnvironmentEnum {
  dev = "dev",
  staging = 'staging',
  prod = 'prod'
}

export type FileType = {
  id: number;
  name: string;
  url: string;
}

export type AttributeValuesType = {
  id: number;
  value: string;
};

export type AttributeType = Record<string, AttributeValuesType[]>;

export enum AttributesEnum {
  GENDER = "gender",
  TYPE = "type",
  RARITY = "rarity",
  RANGE_TYPE = "rangeType",
  ELIXIR_COST = "elixirCost",
  RELEASE_DATE = "releaseDate",
  ARENA = "arena",
}

export interface DashboardListInterface {
  name: string;
  path: string;
  iconUrl?: string;
}

export interface CardInterface {
  name: string;
  id: number;
  description: string;
  attributes: {
    arena: AttributeValuesType;
    elixirCost: AttributeValuesType;
    gender: AttributeValuesType;
    rarity: AttributeValuesType;
    releaseDate: AttributeValuesType;
    type: AttributeValuesType;
  }
  audio: FileType;
  image: FileType;
}

export interface CoalInterface {
  type: string;
  mine: string;
  calorificValue: number;
  granulation: number;
  price: number;
  imageUrl: string;
  id: string;
}