# dragonsGraphQLAPI
A Dragonfly GraphQL API build on NodeJS/Express

```
npm run start
```

Try it with 
```
{
  specie(items_id:"f0264cd93fc96310d176cbde4c32be52") {
    scientific_name
    description
    local_names
    behaviour
    habitat
    similar_species
    distribution
    flight_period
    size {
      length
      wingspan
    }
  }
}
``` 
