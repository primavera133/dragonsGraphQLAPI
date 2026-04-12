const { z } = require('zod')

const LinkSchema = z.object({
  label: z.string(),
  link: z.string(),
})

const MetaSchema = z.object({
  label: z.string(),
  value: z.string(),
})

const SizeSchema = z.object({
  length: z.string().optional(),
  wingspan: z.string().optional(),
})

const ImageDataSchema = z.object({
  public_id: z.string(),
  caption: z.string(),
  license: z.string(),
  lic_url: z.string(),
  by: z.string(),
  url: z.string().optional(),
})

const ImagesSchema = z.object({
  cloud_name: z.string(),
  all: z.array(ImageDataSchema),
})

const SpecieSchema = z.object({
  items_id: z.string(),
  scientific_name: z.string(),
  author_citation: z.string().optional(),
  local_names: z.array(z.string()).optional(),
  description: z.string().optional(),
  behaviour: z.string().optional(),
  size: SizeSchema.optional(),
  similar_species: z.array(z.string()).optional(),
  distribution: z.string().optional(),
  habitat: z.string().optional(),
  flight_period: z.string().optional(),
  images: ImagesSchema.optional(),
  sources: z.array(z.string()).optional(),
  links: z.array(LinkSchema).optional(),
  meta: z.array(MetaSchema).optional(),
})

const TaxonInfoSchema = z.object({
  title: z.string(),
  author_citation: z.string(),
  description: z.string(),
  sources: z.array(z.string()).optional(),
  links: z.array(LinkSchema).optional(),
  meta: z.array(MetaSchema).optional(),
})

module.exports = {
  LinkSchema,
  MetaSchema,
  SizeSchema,
  ImageDataSchema,
  ImagesSchema,
  SpecieSchema,
  TaxonInfoSchema,
}
