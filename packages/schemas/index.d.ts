import { z } from 'zod'

export declare const LinkSchema: z.ZodObject<{
  label: z.ZodString
  link: z.ZodString
}>

export declare const MetaSchema: z.ZodObject<{
  label: z.ZodString
  value: z.ZodString
}>

export declare const SizeSchema: z.ZodObject<{
  length: z.ZodOptional<z.ZodString>
  wingspan: z.ZodOptional<z.ZodString>
}>

export declare const RedListSchema: z.ZodObject<{
  habitats_directive: z.ZodString
  red_list_EU27: z.ZodString
  red_list_europe: z.ZodString
  red_list_mediterranean: z.ZodString
  EU27_endemic: z.ZodString
  red_list_europe_endemic: z.ZodString
  trend_europe: z.ZodString
}>

export declare const ImageDataSchema: z.ZodObject<{
  public_id: z.ZodString
  caption: z.ZodString
  license: z.ZodString
  lic_url: z.ZodString
  by: z.ZodString
  url: z.ZodOptional<z.ZodString>
}>

export declare const ImagesSchema: z.ZodObject<{
  cloud_name: z.ZodString
  all: z.ZodArray<typeof ImageDataSchema>
}>

export declare const SpecieSchema: z.ZodObject<{
  items_id: z.ZodString
  scientific_name: z.ZodString
  author_citation: z.ZodOptional<z.ZodString>
  local_names: z.ZodOptional<z.ZodArray<z.ZodString>>
  description: z.ZodOptional<z.ZodString>
  behaviour: z.ZodOptional<z.ZodString>
  size: z.ZodOptional<typeof SizeSchema>
  similar_species: z.ZodOptional<z.ZodArray<z.ZodString>>
  distribution: z.ZodOptional<z.ZodString>
  habitat: z.ZodOptional<z.ZodString>
  flight_period: z.ZodOptional<z.ZodString>
  red_list: z.ZodOptional<typeof RedListSchema>
  images: z.ZodOptional<typeof ImagesSchema>
  sources: z.ZodOptional<z.ZodArray<z.ZodString>>
  links: z.ZodOptional<z.ZodArray<typeof LinkSchema>>
  meta: z.ZodOptional<z.ZodArray<typeof MetaSchema>>
}>

export declare const TaxonInfoSchema: z.ZodObject<{
  title: z.ZodString
  author_citation: z.ZodString
  description: z.ZodString
  sources: z.ZodOptional<z.ZodArray<z.ZodString>>
  links: z.ZodOptional<z.ZodArray<typeof LinkSchema>>
  meta: z.ZodOptional<z.ZodArray<typeof MetaSchema>>
}>
