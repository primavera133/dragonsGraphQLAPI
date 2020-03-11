const allGenera = species => {
  const genera = []
  const genus_names = Object.values(species).forEach(family => {
    Object.keys(family).forEach(genus_name => {
      genera.push({
        genus_name: genus_name,
        species: family[genus_name]
      })
    })
  }, [])

  //  console.log(genera)
  return genera
}

module.exports = allGenera
