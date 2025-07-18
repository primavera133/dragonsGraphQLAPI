/**
 * Common test helpers for GraphQL API testing
 */

/**
 * Assert that a species object has all required fields
 * @param {Object} species - The species object to validate
 * @param {boolean} isComplete - Whether to check for all fields or just core fields
 */
function assertSpeciesStructure(species, isComplete = true) {
  // Core fields that should always be present
  expect(species).toHaveProperty('items_id')
  expect(species).toHaveProperty('scientific_name')
  
  if (!isComplete) {
    // For partial species objects, just check core fields
    return
  }
  
  // Complete structure validation
  expect(species).toHaveProperty('author_citation')
  expect(species).toHaveProperty('local_names')
  expect(species).toHaveProperty('behaviour')
  expect(species).toHaveProperty('description')
  expect(species).toHaveProperty('distribution')
  expect(species).toHaveProperty('habitat')
  expect(species).toHaveProperty('flight_period')
  
  // Size structure
  if (species.size) {
    expect(species.size).toHaveProperty('length')
    expect(species.size).toHaveProperty('wingspan')
  }
  
  // Red list structure
  if (species.red_list) {
    expect(species.red_list).toHaveProperty('habitats_directive')
    expect(species.red_list).toHaveProperty('red_list_EU27')
    expect(species.red_list).toHaveProperty('red_list_europe')
    expect(species.red_list).toHaveProperty('red_list_mediterranean')
    expect(species.red_list).toHaveProperty('EU27_endemic')
    expect(species.red_list).toHaveProperty('red_list_europe_endemic')
    expect(species.red_list).toHaveProperty('trend_europe')
  }
  
  // Images structure
  if (species.images) {
    expect(species.images).toHaveProperty('cloud_name')
    expect(species.images).toHaveProperty('all')
    expect(Array.isArray(species.images.all)).toBe(true)
    
    if (species.images.all.length > 0) {
      species.images.all.forEach(image => {
        expect(image).toHaveProperty('public_id')
        expect(image).toHaveProperty('caption')
        expect(image).toHaveProperty('license')
        expect(image).toHaveProperty('lic_url')
        expect(image).toHaveProperty('by')
        expect(image).toHaveProperty('url')
      })
    }
  }
  
  // Links structure
  if (species.links) {
    expect(Array.isArray(species.links)).toBe(true)
    species.links.forEach(link => {
      expect(link).toHaveProperty('label')
      expect(link).toHaveProperty('link')
    })
  }
  
  // Meta structure
  if (species.meta) {
    expect(Array.isArray(species.meta)).toBe(true)
    species.meta.forEach(meta => {
      expect(meta).toHaveProperty('label')
      expect(meta).toHaveProperty('value')
    })
  }
}

/**
 * Assert that a response has no errors
 */
function assertNoErrors(response) {
  expect(response.errors).toBeUndefined()
  expect(response.data).toBeDefined()
}

/**
 * Assert that a response has specific GraphQL errors
 */
function assertHasErrors(response, expectedErrorMessages = []) {
  expect(response.errors).toBeDefined()
  expect(Array.isArray(response.errors)).toBe(true)
  
  if (expectedErrorMessages.length > 0) {
    expectedErrorMessages.forEach(expectedMessage => {
      expect(response.errors.some(error => 
        error.message.includes(expectedMessage)
      )).toBe(true)
    })
  }
}

/**
 * Assert that an array contains valid species data
 * @param {Array} speciesArray - Array of species objects to validate
 * @param {number} minLength - Minimum expected array length
 * @param {boolean} isComplete - Whether to check for complete species structure
 */
function assertSpeciesArray(speciesArray, minLength = 1, isComplete = true) {
  expect(Array.isArray(speciesArray)).toBe(true)
  expect(speciesArray.length).toBeGreaterThanOrEqual(minLength)
  
  speciesArray.forEach(species => {
    assertSpeciesStructure(species, isComplete)
  })
}

/**
 * Assert that scientific name follows proper nomenclature
 */
function assertValidScientificName(scientificName) {
  expect(typeof scientificName).toBe('string')
  expect(scientificName).toMatch(/^[A-Z][a-z]+ [a-z]+$/) // Genus species format
}

/**
 * Assert that conservation status is valid
 */
function assertValidConservationStatus(status) {
  const validStatuses = [
    'Least Concern',
    'Near Threatened',
    'Vulnerable', 
    'Endangered',
    'Critically Endangered',
    'Extinct in the Wild',
    'Extinct',
    'Data Deficient',
    'Not Evaluated',
    'Not Applicable',
  ]
  
  if (status && status !== 'No') {
    expect(validStatuses).toContain(status)
  }
}

/**
 * Test data validation helpers
 */
const testData = {
  validSpeciesIds: [
    'f2acd97bbac584258f1a680bf206653b' // Aeshna affinis
  ],
  validScientificNames: [
    "Aeshna affinis",
    "Aeshna caerulea",
    "Aeshna crenata",
    "Aeshna cyanea",
    "Aeshna grandis",
    "Aeshna juncea",
    "Aeshna mixta",
    "Aeshna serrata",
    "Aeshna subarctica",
    "Aeshna viridis",
    "Agriocnemis pygmaea",
    "Agriocnemis sania",
    "Anax ephippiger",
    "Anax immaculifrons",
    "Anax imperator",
    "Anax junius",
    "Anax parthenope",
    "Boyeria cretensis",
    "Boyeria irene",
    "Brachythemis impartita",
    "Brachytron pratense",
    "Caliaeschna microstigma",
    "Calopteryx exul",
    "Calopteryx haemorrhoidalis",
    "Calopteryx hyalina",
    "Calopteryx splendens",
    "Calopteryx syriaca",
    "Calopteryx virgo",
    "Calopteryx xanthostoma",
    "Ceriagrion georgifreyi",
    "Ceriagrion tenellum",
    "Chalcolestes parvidens",
    "Chalcolestes viridis",
    "Coenagrion armatum",
    "Coenagrion caerulaescens",
    "Coenagrion ecornutum",
    "Coenagrion glaciale",
    "Coenagrion hastulatum",
    "Coenagrion hylas",
    "Coenagrion intermedium",
    "Coenagrion johanssoni",
    "Coenagrion lunulatum",
    "Coenagrion mercuriale",
    "Coenagrion ornatum",
    "Coenagrion puella",
    "Coenagrion pulchellum",
    "Coenagrion scitulum",
    "Cordulegaster bidentata",
    "Cordulegaster boltonii",
    "Cordulegaster helladica",
    "Cordulegaster heros",
    "Cordulegaster insignis",
    "Cordulegaster picta",
    "Cordulegaster trinacriae",
    "Cordulia aenea",
    "Crocothemis erythraea",
    "Diplacodes lefebvrii",
    "Enallagma cyathigerum",
    "Epallage fatime",
    "Epitheca bimaculata",
    "Erythromma lindenii",
    "Erythromma najas",
    "Erythromma viridulum",
    "Gomphus graslinii",
    "Gomphus pulchellus",
    "Gomphus schneiderii",
    "Gomphus simillimus",
    "Gomphus vulgatissimus",
    "Ischnura aralensis",
    "Ischnura elegans",
    "Ischnura fountaineae",
    "Ischnura genei",
    "Ischnura graellsii",
    "Ischnura hastata",
    "Ischnura intermedia",
    "Ischnura pumilio",
    "Ischnura saharensis",
    "Ischnura senegalensis",
    "Isoaeshna isoceles",
    "Lestes barbarus",
    "Lestes concinnus",
    "Lestes dryas",
    "Lestes macrostigma",
    "Lestes numidicus",
    "Lestes pallidus",
    "Lestes sponsa",
    "Lestes virens",
    "Leucorrhinia albifrons",
    "Leucorrhinia caudalis",
    "Leucorrhinia dubia",
    "Leucorrhinia pectoralis",
    "Leucorrhinia rubicunda",
    "Libellula depressa",
    "Libellula fulva",
    "Libellula quadrimaculata",
    "Lindenia tetraphylla",
    "Macromia amphigena",
    "Macromia splendens",
    "Nehalennia speciosa",
    "Onychogomphus cazuma",
    "Onychogomphus costae",
    "Onychogomphus forcipatus",
    "Onychogomphus uncatus",
    "Ophiogomphus cecilia",
    "Orthetrum albistylum",
    "Orthetrum brunneum",
    "Orthetrum cancellatum",
    "Orthetrum chrysostigma",
    "Orthetrum coerulescens",
    "Orthetrum nitidinerve",
    "Orthetrum sabina",
    "Orthetrum taeniolatum",
    "Orthetrum trinacria",
    "Oxygastra curtisii",
    "Pantala flavescens",
    "Paragomphus genei",
    "Platycnemis acutipennis",
    "Platycnemis dealbata",
    "Platycnemis latipes",
    "Platycnemis pennipes",
    "Pyrrhosoma elisabethae",
    "Pyrrhosoma nymphula",
    "Selysiothemis nigra",
    "Somatochlora alpestris",
    "Somatochlora arctica",
    "Somatochlora borisi",
    "Somatochlora flavomaculata",
    "Somatochlora graeseri",
    "Somatochlora meridionalis",
    "Somatochlora metallica",
    "Somatochlora sahlbergi",
    "Stylurus flavipes",
    "Sympecma fusca",
    "Sympecma gobica",
    "Sympecma paedisca",
    "Sympetrum danae",
    "Sympetrum depressiusculum",
    "Sympetrum flaveolum",
    "Sympetrum fonscolombii",
    "Sympetrum meridionale",
    "Sympetrum nigrifemur",
    "Sympetrum pedemontanum",
    "Sympetrum sanguineum",
    "Sympetrum sinaiticum",
    "Sympetrum striolatum",
    "Sympetrum vulgatum",
    "Trithemis annulata",
    "Trithemis arteriosa",
    "Trithemis festiva",
    "Trithemis kirbyi",
    "Zygonyx torridus"
  ],
  validFamilyNames: [
    'Aeshnidae',
    'Calopterygidae',
    'Coenagrionidae',
    'Cordulegastridae',
    'Corduliidae',
    'Euphaeidae',
    'Gomphidae',
    'incertae sedis',
    'Lestidae',
    'Libellulidae',
    'Macromiidae',
    'Platycnemididae'
  ],
  validGenusNames: [
    'Aeshna',
    'Agriocnemis',
    'Anax',
    'Boyeria',
    'Brachythemis',
    'Brachytron',
    'Caliaeschna',
    'Calopteryx',
    'Ceriagrion',
    'Chalcolestes',
    'Coenagrion',
    'Cordulegaster',
    'Cordulia',
    'Crocothemis',
    'Diplacodes',
    'Enallagma',
    'Epallage',
    'Epitheca',
    'Erythromma',
    'Gomphus',
    'Ischnura',
    'Isoaeshna',
    'Lestes',
    'Leucorrhinia',
    'Libellula',
    'Lindenia',
    'Macromia',
    'Nehalennia',
    'Onychogomphus',
    'Ophiogomphus',
    'Orthetrum',
    'Oxygastra',
    'Pantala',
    'Paragomphus',
    'Platycnemis',
    'Pyrrhosoma',
    'Selysiothemis',
    'Somatochlora',
    'Stylurus',
    'Sympecma',
    'Sympetrum',
    'Trithemis',
    'Zygonyx'
  ],
  invalidIds: [
    'nonexistent-id',
    '',
    null,
    undefined
  ],
  invalidNames: [
    'NonExistentFamily',
    '',
    null,
    undefined
  ]
}

module.exports = {
  assertSpeciesStructure,
  assertNoErrors,
  assertHasErrors,
  assertSpeciesArray,
  assertValidScientificName,
  assertValidConservationStatus,
  testData
}
