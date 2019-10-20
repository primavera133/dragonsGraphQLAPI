const CeriagrionGeorgifreyi = require('./ceriagrion-georgifreyi.json')
const CeriagrionTenellum = require('./ceriagrion-tenellum.json')
const CoenagrionArmatum = require('./coenagrion-armatum.json')
const CoenagrionCaerulescens = require('./coenagrion-caerulescens.json')
const CoenagrionEcornutum = require('./coenagrion-ecornutum.json')
const CoenagrionGlaciale = require('./coenagrion-glaciale.json')
const CoenagrionHastulatum = require('./coenagrion-hastulatum.json')
const CoenagrionHylas = require('./coenagrion-hylas.json')
const CoenagrionIntermedium = require('./coenagrion-intermedium.json')

module.exports = {
  ceriagrion: [CeriagrionGeorgifreyi, CeriagrionTenellum],
  coenagrion: [
    CoenagrionArmatum,
    CoenagrionCaerulescens,
    CoenagrionEcornutum,
    CoenagrionGlaciale,
    CoenagrionHastulatum,
    CoenagrionHylas,
    CoenagrionIntermedium
  ]
}
