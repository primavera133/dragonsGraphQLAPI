# Dragons GraphQL API - Project Context

## Overview
This is a specialized GraphQL API for European dragonflies and damselflies (Odonata) built with Node.js and Apollo Server. The API provides comprehensive taxonomic and biological information about dragon flies across Europe, serving as a digital field guide and scientific reference.

## Project Structure

### Core Technologies
- **Framework**: Node.js with Apollo Server (Apollo Server Micro)
- **GraphQL**: Apollo Server with schema-first approach
- **Runtime**: Micro lambdas for serverless deployment
- **Testing**: Jest with end-to-end tests
- **Code Generation**: GraphQL Code Generator for TypeScript types

### Architecture Overview
```
dragonsGraphQLAPI/
├── api/                      # Core API implementation
│   ├── index.js             # Main server setup with Apollo Server
│   ├── _schema.js           # GraphQL schema definitions
│   ├── _resolvers.js        # GraphQL resolvers
│   ├── _context.js          # GraphQL context configuration
│   ├── _data/               # Static data store (JSON files)
│   ├── _dataStores/         # Data access layer
│   ├── _utils/              # Utility functions
│   └── __tests__/           # E2E test suite
├── public/                  # Static assets
└── config files             # Build and development configuration
```

## Data Model

### Taxonomic Hierarchy
The API follows standard taxonomic classification:
- **Family** → **Genus** → **Species**
- 12 families of dragonflies and damselflies
- Multiple genera per family
- Individual species with comprehensive data

### Core Data Types

#### Species (Main Entity)
- **Identification**: `items_id`, `scientific_name`, `author_citation`
- **Common Names**: `local_names` (multilingual)
- **Physical Description**: `description`, `size` (length, wingspan)
- **Ecology**: `behaviour`, `habitat`, `distribution`, `flight_period`
- **Conservation**: `red_list` status across different regions
- **References**: `similar_species`, `sources`, `links`
- **Media**: `images` with licensing and attribution
- **Metadata**: Custom fields for external references

#### Taxonomy Support
- **Family Info**: Description, author citation, sources
- **Genus Info**: Description, author citation, sources
- **Size Information**: Length and wingspan measurements
- **Red List Status**: Conservation status across EU27, Europe, Mediterranean
- **Images**: Cloudinary integration with proper licensing

## API Endpoints

### Query Types
1. **Species Queries**
   - `species` - Get all species
   - `specieFromId(items_id)` - Get species by ID
   - `specieFromScientificName(scientific_name)` - Get species by scientific name

2. **Taxonomic Queries**
   - `families` - List all families
   - `genera` - List all genera
   - `familyGenera(name)` - Get genera within a family
   - `familySpecies(name)` - Get species within a family
   - `genusSpecies(name)` - Get species within a genus
   - `taxonomy` - Complete taxonomic hierarchy

3. **Information Queries**
   - `aboutFamily(name)` - Family information
   - `aboutGenus(name)` - Genus information

## Data Sources

### Scientific References
The data is compiled from authoritative European field guides:
- Atlas of the European Dragonflies and Damselflies (Boudot & Kalkman)
- Dragonflies and Damselflies of Europe (Galliani, Scherini, Piglia)
- Field guide to the dragonflies of Britain and Europe (Dijkstra)
- Nordens trollsländor (Billqvist, Andersson, Bergendorff)

### Data Structure
- **Static JSON Files**: All data stored as structured JSON files
- **Family-based Organization**: Data organized by taxonomic families
- **Hierarchical Structure**: Family → Genus → Species files
- **Rich Metadata**: Each species includes comprehensive biological and ecological data

## Key Features

### 1. Comprehensive Species Information
- Physical descriptions with distinguishing features
- Behavioral patterns and flight characteristics
- Habitat preferences and distribution maps
- Conservation status across multiple regions
- High-quality images with proper attribution

### 2. Taxonomic Navigation
- Browse by family, genus, or species
- Cross-references between related species
- Similar species comparisons
- Complete taxonomic hierarchy

### 3. Scientific Accuracy
- Author citations for all taxonomic names
- Multiple scientific references per species
- Conservation status from official red lists
- Standardized size measurements

### 4. Rich Media Integration
- Cloudinary-hosted images
- Proper licensing and attribution
- Multiple images per species
- Caption and source information

## Development Setup

### Dependencies
- **Production**: Apollo Server, GraphQL, CORS handling
- **Development**: Jest, GraphQL Code Generator, Prettier
- **Quality**: Husky pre-commit hooks, Lockfile linting

### Testing Strategy
- **E2E Tests**: Comprehensive test coverage for all queries
- **Snapshot Testing**: Response format validation
- **Query Testing**: All GraphQL operations tested

### Build Process
- **Type Generation**: Automatic TypeScript type generation
- **Linting**: Package lockfile validation
- **CI/CD**: Travis CI integration

## Deployment

### Serverless Architecture
- **Runtime**: Micro lambdas for efficient scaling
- **CORS**: Configured for cross-origin requests
- **Playground**: GraphQL Playground enabled for development
- **Introspection**: Schema introspection enabled

### Environment Configuration
- **Apollo Engine**: Performance monitoring integration
- **Environment Variables**: Secure configuration management

## Usage Examples

### Basic Species Query
```graphql
query GetSpecies {
  species {
    items_id
    scientific_name
    local_names
    size {
      length
      wingspan
    }
  }
}
```

### Taxonomic Browse
```graphql
query GetFamilyInfo {
  families {
    family_name
    genera {
      genus_name
      species {
        scientific_name
        local_names
      }
    }
  }
}
```

### Detailed Species Information
```graphql
query GetSpeciesDetails($id: ID!) {
  specieFromId(items_id: $id) {
    scientific_name
    author_citation
    local_names
    description
    behaviour
    habitat
    distribution
    flight_period
    red_list {
      red_list_EU27
      trend_europe
    }
    images {
      all {
        public_id
        caption
        license
        by
      }
    }
  }
}
```

## Data Quality

### Standardization
- Consistent field naming across all species
- Standardized size measurements (mm)
- Uniform date formats for flight periods
- Consistent conservation status terminology

### Validation
- JSON schema validation for all data files
- Required fields enforced
- Type checking with GraphQL schema
- Automated testing of data integrity

## Future Considerations

### Potential Enhancements
- Geographic distribution maps
- Audio recordings of flight sounds
- Interactive identification keys
- Mobile app integration
- Real-time observation data

### Data Management
- Version control for taxonomic updates
- Data validation automation
- Content management system integration
- Multi-language support expansion

## Contributing

### Data Updates
- Follow established JSON schema
- Include proper scientific references
- Maintain consistent formatting
- Update tests for new data

### Development
- Follow existing code patterns
- Add tests for new features
- Update documentation
- Maintain TypeScript types

This project serves as a comprehensive digital resource for European dragonfly and damselfly identification, research, and conservation, providing both amateur naturalists and professional researchers with authoritative, well-structured data through a modern GraphQL API.
