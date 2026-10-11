const ArabicnemisCaerulea = require('./arabicnemis/arabicnemis-caerulea.json')
const ArabineuraKhalidi = require('./arabineura/arabineura-khalidi.json')
const platycnemisAcutipennis = require('./platycnemis/platycnemis-acutipennis.json')
const platycnemisDealbata = require('./platycnemis/platycnemis-dealbata.json')
const platycnemisKervillei = require('./platycnemis/platycnemis-kervillei.json')
const platycnemisLatipes = require('./platycnemis/platycnemis-latipes.json')
const platycnemisPennipes = require('./platycnemis/platycnemis-pennipes.json')
const platycnemisSubdilatata = require('./platycnemis/platycnemis-subdilatata.json')

module.exports = {
  arabicnemis: [ArabicnemisCaerulea],
  arabineura: [ArabineuraKhalidi],
  platycnemis: [
    platycnemisAcutipennis,
    platycnemisDealbata,
    platycnemisKervillei,
    platycnemisLatipes,
    platycnemisPennipes,
    platycnemisSubdilatata
  ]
}
