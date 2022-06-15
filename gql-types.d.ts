export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  aboutFamily?: Maybe<FamilyInfo>;
  aboutGenus?: Maybe<GenusInfo>;
  families?: Maybe<Array<Maybe<Family>>>;
  familyGenera?: Maybe<Array<Maybe<GenusName>>>;
  familySpecies?: Maybe<Array<Maybe<Specie>>>;
  genera?: Maybe<Array<Maybe<Genus>>>;
  genusSpecies?: Maybe<Array<Maybe<Specie>>>;
  specieFromId?: Maybe<Specie>;
  specieFromScientificName?: Maybe<Specie>;
  species?: Maybe<Array<Maybe<Specie>>>;
  taxonomy?: Maybe<Taxonomy>;
};


export type QueryAboutFamilyArgs = {
  name: Scalars['String'];
};


export type QueryAboutGenusArgs = {
  name: Scalars['String'];
};


export type QueryFamilyGeneraArgs = {
  name: Scalars['String'];
};


export type QueryFamilySpeciesArgs = {
  name: Scalars['String'];
};


export type QueryGenusSpeciesArgs = {
  name: Scalars['String'];
};


export type QuerySpecieFromIdArgs = {
  items_id: Scalars['ID'];
};


export type QuerySpecieFromScientificNameArgs = {
  scientific_name: Scalars['String'];
};

export type FamilyInfo = {
  __typename?: 'FamilyInfo';
  author_citation: Scalars['String'];
  description: Scalars['String'];
  links?: Maybe<Array<Maybe<Link>>>;
  meta?: Maybe<Array<Maybe<Meta>>>;
  sources?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type Link = {
  __typename?: 'Link';
  label: Scalars['String'];
  link: Scalars['String'];
};

export type Meta = {
  __typename?: 'Meta';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type GenusInfo = {
  __typename?: 'GenusInfo';
  author_citation: Scalars['String'];
  description: Scalars['String'];
  links?: Maybe<Array<Maybe<Link>>>;
  meta?: Maybe<Array<Maybe<Meta>>>;
  sources?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type Family = {
  __typename?: 'Family';
  family_name: Scalars['ID'];
  genera?: Maybe<Array<Maybe<Genus>>>;
};

export type Genus = {
  __typename?: 'Genus';
  family_name: Scalars['String'];
  genus_name?: Maybe<Scalars['ID']>;
  species?: Maybe<Array<Maybe<Specie>>>;
};

export type Specie = {
  __typename?: 'Specie';
  author_citation?: Maybe<Scalars['String']>;
  behaviour?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  distribution?: Maybe<Scalars['String']>;
  flight_period?: Maybe<Scalars['String']>;
  habitat?: Maybe<Scalars['String']>;
  images?: Maybe<Images>;
  items_id: Scalars['ID'];
  links?: Maybe<Array<Maybe<Link>>>;
  local_names?: Maybe<Array<Maybe<Scalars['String']>>>;
  meta?: Maybe<Array<Maybe<Meta>>>;
  red_list?: Maybe<RedList>;
  scientific_name: Scalars['ID'];
  similar_species?: Maybe<Array<Maybe<Scalars['String']>>>;
  size?: Maybe<Size>;
  sources?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Images = {
  __typename?: 'Images';
  all?: Maybe<Array<Maybe<ImageData>>>;
  cloud_name?: Maybe<Scalars['String']>;
};

export type ImageData = {
  __typename?: 'ImageData';
  by: Scalars['String'];
  caption: Scalars['String'];
  lic_url: Scalars['String'];
  license: Scalars['String'];
  public_id: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type RedList = {
  __typename?: 'RedList';
  EU27_endemic: Scalars['String'];
  habitats_directive: Scalars['String'];
  red_list_EU27: Scalars['String'];
  red_list_europe: Scalars['String'];
  red_list_europe_endemic: Scalars['String'];
  red_list_mediterranean: Scalars['String'];
  trend_europe: Scalars['String'];
};

export type Size = {
  __typename?: 'Size';
  length?: Maybe<Scalars['String']>;
  wingspan?: Maybe<Scalars['String']>;
};

export type GenusName = {
  __typename?: 'GenusName';
  genus_name?: Maybe<Scalars['ID']>;
};

export type Taxonomy = {
  __typename?: 'Taxonomy';
  families?: Maybe<Array<Maybe<Family>>>;
  genera?: Maybe<Array<Maybe<Genus>>>;
};
