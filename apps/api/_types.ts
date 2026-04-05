export interface Link {
  label: string
  link: string
}

export interface Meta {
  label: string
  value: string
}

export interface Size {
  length?: string
  wingspan?: string
}

export interface ImageData {
  public_id: string
  caption: string
  license: string
  lic_url: string
  by: string
  url?: string
}

export interface Images {
  cloud_name: string
  all: ImageData[]
}

export interface Specie {
  items_id: string
  scientific_name: string
  author_citation?: string
  local_names?: string[]
  description?: string
  behaviour?: string
  size?: Size
  similar_species?: string[]
  distribution?: string
  habitat?: string
  flight_period?: string
  images?: Images
  sources?: string[]
  links?: Link[]
  meta?: Meta[]
}

export interface TaxonInfo {
  title: string
  author_citation: string
  description: string
  sources?: string[]
  links?: Link[]
  meta?: Meta[]
}

export interface Family {
  family_name: string
  genera?: Genus[]
}

export interface GenusName {
  genus_name: string
}

export interface Genus {
  family_name: string
  genus_name: string
  species: Specie[]
}

export interface SpeciesData {
  [familyName: string]: {
    [genusName: string]: Specie[]
  }
}

export interface SpeciesStore {
  species: SpeciesData
  allSpecies: Specie[]
  allFamilies: Pick<Family, 'family_name'>[]
  allGenera: Genus[]
}

export interface AboutStore {
  genera: Record<string, TaxonInfo>
  families: Record<string, TaxonInfo>
}

export interface AuthInfo {
  isAuthenticated: boolean
  apiKey: string
  keyId: string
  ip: string
  timestamp: string
}

export interface ISpeciesAPI {
  getAllFamilies(): Pick<Family, 'family_name'>[]
  getAllGenera(): Genus[]
  getAllSpecies(): Specie[]
  findFamilySpecies(name: string): Specie[]
  findGenusFromFamilyName(name: string): GenusName[]
  findGenusSpecies(name: string): Specie[]
  findSpecieFromId(id: string): Specie
  findSpecieFromScientificName(name: string): Specie
  getFullTaxonomy(): { families: { family_name: string; genera: Genus[] }[] }
  initialize(config: { context: unknown }): void
}

export interface IAboutAPI {
  aboutGenus(name: string): TaxonInfo | undefined
  aboutFamily(name: string): TaxonInfo | undefined
  initialize(config: { context: unknown }): void
}

export interface AppContext {
  req: unknown
  res: unknown
  auth?: AuthInfo
  dataSources: {
    speciesAPI: ISpeciesAPI
    aboutAPI: IAboutAPI
  }
}
