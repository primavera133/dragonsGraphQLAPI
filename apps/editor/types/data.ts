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

export interface RedList {
  habitats_directive: string
  red_list_EU27: string
  red_list_europe: string
  red_list_mediterranean: string
  EU27_endemic: string
  red_list_europe_endemic: string
  trend_europe: string
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
  red_list?: RedList
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
