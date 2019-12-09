const CeriagrionGeorgifreyi = require('./ceriagrion-georgifreyi.json')
const CeriagrionTenellum = require('./ceriagrion-tenellum.json')
const CoenagrionArmatum = require('./coenagrion-armatum.json')
const CoenagrionCaerulescens = require('./coenagrion-caerulescens.json')
const CoenagrionEcornutum = require('./coenagrion-ecornutum.json')
const CoenagrionGlaciale = require('./coenagrion-glaciale.json')
const CoenagrionHastulatum = require('./coenagrion-hastulatum.json')
const CoenagrionHylas = require('./coenagrion-hylas.json')
const CoenagrionIntermedium = require('./coenagrion-intermedium.json')
const CoenagrionJohanssoni = require('./coenagrion-johanssoni.json')
const CoenagrionLunulatum = require('./coenagrion-lunulatum.json')
const CoenagrionMercuriale = require('./coenagrion-mercuriale.json')
const CoenagrionOrnatum = require('./coenagrion-ornatum.json')
const CoenagrionPuella = require('./coenagrion-puella.json')
const CoenagrionPulchellum = require('./coenagrion-pulchellum.json')
const CoenagrionScitulum = require('./coenagrion-scitulum.json')
const EnallagmaCyathigerum = require('./enallagma-cyathigerum.json')
const ErythrommaLindenii = require('./erythromma-lindenii.json')
const ErythrommaNajas = require('./erythromma-najas.json')
const ErythrommaViridulum = require('./erythromma-viridulum.json')
const NehalenniaSpeciosa = require('./nehalennia-speciosa.json')
const PyrrhosomaNymphula = require('./pyrrhosoma-nymphula.json')
const PyrrhosomaElisabethae = require('./pyrrhosoma-elisabethae.json')

module.exports = {
  ceriagrion: [CeriagrionGeorgifreyi, CeriagrionTenellum],
  coenagrion: [
    CoenagrionArmatum,
    CoenagrionCaerulescens,
    CoenagrionEcornutum,
    CoenagrionGlaciale,
    CoenagrionHastulatum,
    CoenagrionHylas,
    CoenagrionIntermedium,
    CoenagrionJohanssoni,
    CoenagrionLunulatum,
    CoenagrionMercuriale,
    CoenagrionOrnatum,
    CoenagrionPuella,
    CoenagrionPulchellum,
    CoenagrionScitulum
  ],
  enallagma: [EnallagmaCyathigerum],
  erythromma: [ErythrommaLindenii, ErythrommaNajas, ErythrommaViridulum],
  nehalennia: [NehalenniaSpeciosa],
  pyrrhosoma: [PyrrhosomaNymphula, PyrrhosomaElisabethae]
}
