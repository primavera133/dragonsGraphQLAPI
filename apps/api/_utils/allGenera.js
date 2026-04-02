const allGenera = species => {
  const genera = []
  const genus_names = Object.keys(species).forEach(familyName => {
    Object.keys(species[familyName]).forEach(genus_name => {
      genera.push({
        family_name: familyName,
        genus_name: genus_name,
        species: species[familyName][genus_name]
      })
    })
  }, [])

  //  console.log(genera)
  return genera
}

module.exports = allGenera
