const CeriagrionGeorgifreyi = require('./ceriagrion-georgifreyi.json')
const CeriagrionTenellum = require('./ceriagrion-tenellum.json')
const CoenagrionArmatum = require('./coenagrion-armatum.json')
const CoenagrionCaerulescens = require('./coenagrion-caerulescens.json')
const CoenagrionEcornutum = require('./coenagrion-ecornutum.json')
const CoenagrionGlaciale = require('./coenagrion-glaciale.json')

module.exports = {
  ceriagrion: [CeriagrionGeorgifreyi, CeriagrionTenellum],
  coenagrion: [
    CoenagrionArmatum,
    CoenagrionCaerulescens,
    CoenagrionEcornutum,
    CoenagrionGlaciale
  ]
}
