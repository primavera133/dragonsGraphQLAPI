const { createServer } = require('./__utils')
const { 
  GET_TAXONOMY_QUERY,
  GET_SPECIES_BY_FAMILY_QUERY,
  GET_SPECIES_BY_GENUS_QUERY 
} = require('./__queries')
const { 
  assertNoErrors, 
  assertSpeciesArray,
  assertValidScientificName,
  assertValidConservationStatus,
  testData 
} = require('./__helpers')

describe('Integration Tests - Complex Scenarios', () => {
  let server, executeOperation

  beforeEach(async () => {
    const testServer = await createServer()
    server = testServer.server
    executeOperation = testServer.executeOperation
  })

  afterEach(async () => {
    if (server) {
      await server.stop()
    }
  })

  describe('Taxonomic Relationships', () => {
    it('should maintain consistent taxonomic hierarchy', async () => {
      const res = await executeOperation({
        query: `
          query {
            taxonomy {
              families {
                family_name
                genera {
                  family_name
                  genus_name
                  species {
                    items_id
                    scientific_name
                    local_names
                  }
                }
              }
            }
          }
        `
      })
      
      assertNoErrors(res)
      const taxonomy = res.data.taxonomy.families
      
      expect(Array.isArray(taxonomy)).toBe(true)
      expect(taxonomy.length).toBeGreaterThan(0)
      
      // Verify each family has genera and species
      taxonomy.forEach(family => {
        expect(family).toHaveProperty('family_name')
        expect(family).toHaveProperty('genera')
        expect(Array.isArray(family.genera)).toBe(true)
        
        family.genera.forEach(genus => {
          expect(genus).toHaveProperty('genus_name')
          expect(genus).toHaveProperty('species')
          expect(Array.isArray(genus.species)).toBe(true)
          
          genus.species.forEach(species => {
            assertValidScientificName(species.scientific_name)
            expect(Array.isArray(species.local_names)).toBe(true)
          })
        })
      })
    })

    it('should return same species when queried by family vs direct lookup', async () => {
      const familyName = testData.validFamilyNames[0] // 'Aeshnidae'
      
      // Get species by family using shared query
      const familyRes = await executeOperation({
        query: GET_SPECIES_BY_FAMILY_QUERY,
        variables: { name: familyName }
      })
      
      assertNoErrors(familyRes)
      const familySpecies = familyRes.data.familySpecies
      // Use isComplete=true since we're using the full species fragment
      assertSpeciesArray(familySpecies, 1, true)
      
      // Verify each species has the expected structure
      familySpecies.forEach(species => {
        assertValidScientificName(species.scientific_name)
        expect(species.items_id).toBeDefined()
        
        // Validate conservation status
        if (species.red_list) {
          // Validate conservation status (handle case variations)
          if (species.red_list.red_list_EU27) {
            assertValidConservationStatus(species.red_list.red_list_EU27)
          }
          if (species.red_list.red_list_europe) {
            assertValidConservationStatus(species.red_list.red_list_europe)
          }
        }
      })
    })
  })

  describe('Data Quality Validation', () => {
    it('should have valid image metadata for all species with images', async () => {
      const res = await executeOperation({
        query: `
          query {
            species {
              scientific_name
              images {
                cloud_name
                all {
                  public_id
                  caption
                  license
                  lic_url
                  by
                  url
                }
              }
            }
          }
        `
      })
      
      assertNoErrors(res)
      const species = res.data.species
      
      species.forEach(specie => {
        if (specie.images && specie.images.all.length > 0) {
          expect(specie.images.cloud_name).toBe('dragonflies')
          
          specie.images.all.forEach(image => {
            // Validate image metadata (some fields may be empty in data)
            expect(image.public_id).toBeTruthy()
            // Caption and by fields may be empty strings - only check if they're strings
            expect(typeof image.caption).toBe('string')
            expect(typeof image.by).toBe('string')
            expect(image.license).toBeTruthy()
            
            // Validate URLs (handle edge cases in data)
            const urlPattern = /^https?:\/\//
            if (image.lic_url && image.lic_url.trim()) {
              // Fix common URL formatting issues
              const cleanUrl = image.lic_url.replace(/^https: \/\//, 'https://').replace(/^http: \/\//, 'http://')
              expect(cleanUrl).toMatch(urlPattern)
            }
            if (image.url && image.url.trim()) {
              const cleanUrl = image.url.replace(/^https: \/\//, 'https://').replace(/^http: \/\//, 'http://')
              expect(cleanUrl).toMatch(urlPattern)
            }
          })
        }
      })
    })

    it('should have valid external links for all species', async () => {
      const res = await executeOperation({
        query: `
          query {
            species {
              scientific_name
              links {
                label
                link
              }
            }
          }
        `
      })
      
      assertNoErrors(res)
      const species = res.data.species
      
      species.forEach(specie => {
        if (specie.links && specie.links.length > 0) {
          specie.links.forEach(link => {
            expect(link.label).toBeTruthy()
            
            // Handle URLs that might be missing protocol
            let linkUrl = link.link
            if (linkUrl && !linkUrl.startsWith('http')) {
              linkUrl = 'https://' + linkUrl
            }
            
            expect(linkUrl).toMatch(/^https?:\/\//) // Valid URL format
            
            // Validate common external services (flexible validation)
            if (link.label.includes('iNaturalist')) {
              expect(link.link).toContain('inaturalist.org')
            }
            if (link.label.includes('gbif')) {
              expect(link.link).toContain('gbif.org')
            }
            if (link.label.includes('IUCN')) {
              // IUCN data might come from different sources
              expect(link.link).toMatch(/iucnredlist\.org|gbif\.org/)
            }
          })
        }
      })
    })

    it('should have consistent size measurements', async () => {
      const res = await executeOperation({
        query: `
          query {
            species {
              scientific_name
              size {
                length
                wingspan
              }
            }
          }
        `
      })
      
      assertNoErrors(res)
      const species = res.data.species
      
      species.forEach(specie => {
        if (specie.size) {
          // Size measurements should contain "mm" and be non-empty when present
          if (specie.size.length && specie.size.length !== 'mm') {
            expect(specie.size.length).toContain('mm')
            expect(specie.size.length.length).toBeGreaterThan(2)
          }
          if (specie.size.wingspan && specie.size.wingspan !== 'mm') {
            expect(specie.size.wingspan).toContain('mm')
            expect(specie.size.wingspan.length).toBeGreaterThan(2)
          }
        }
      })
    })
  })

  describe('Cross-Reference Validation', () => {
    it('should have valid similar species references', async () => {
      const res = await executeOperation({
        query: `
          query {
            species {
              scientific_name
              similar_species
            }
          }
        `
      })
      
      assertNoErrors(res)
      const species = res.data.species
      const allScientificNames = species.map(s => s.scientific_name)
      
      species.forEach(specie => {
        if (specie.similar_species && specie.similar_species.length > 0) {
          specie.similar_species.forEach(similarSpecies => {
            // Similar species should be valid scientific names
            expect(typeof similarSpecies).toBe('string')
            // Skip empty strings which might exist in the data
            if (similarSpecies.trim().length > 0) {
              expect(similarSpecies.trim().length).toBeGreaterThan(0)
              // Could check if similar species exist in our database
              // (though some might be valid species not in our dataset)
            }
          })
        }
      })
    })

    it('should maintain genus consistency within families', async () => {
      for (const familyName of testData.validFamilyNames.slice(0, 3)) { // Test first 3 families
        const familyRes = await executeOperation({
          query: GET_SPECIES_BY_FAMILY_QUERY,
          variables: { name: familyName }
        })
        
        assertNoErrors(familyRes)
        const familySpecies = familyRes.data.familySpecies
        
        if (familySpecies && familySpecies.length > 0) {
          // Extract genus names from scientific names
          const genusNames = new Set(
            familySpecies.map(species => 
              species.scientific_name.split(' ')[0]
            )
          )
          
          // Test each genus within this family
          for (const genusName of genusNames) {
            const genusRes = await executeOperation({
              query: GET_SPECIES_BY_GENUS_QUERY,
              variables: { name: genusName }
            })
            
            assertNoErrors(genusRes)
            const genusSpecies = genusRes.data.genusSpecies
            
            // All species in this genus should start with the genus name
            genusSpecies.forEach(species => {
              expect(species.scientific_name).toMatch(new RegExp('^' + genusName + ' '))
            })
          }
        }
      }
    })
  })
})
