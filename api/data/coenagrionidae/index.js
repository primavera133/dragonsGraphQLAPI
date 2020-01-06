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
const IschnuraAralensis = require('./ischnura-aralensis.json')
const IschnuraElegans = require('./ischnura-elegans.json')
const IschnuraFountaineae = require('./ischnura-fountaineae.json')
const IschnuraGenei = require('./ischnura-genei.json')
const IschnuraGraellsii = require('./ischnura-graellsii.json')
const IschnuraHastata = require('./ischnura-hastata.json')
const IschnuraIntermedia = require('./ischnura-intermedia.json')
const IschnuraPumilio = require('./ischnura-pumilio.json')
const IschnuraSaharensis = require('./ischnura-saharensis.json')
const IschnuraSenegalensis = require('./ischnura-senegalensis.json')
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
  ischnura: [
    IschnuraAralensis,
    IschnuraElegans,
    IschnuraFountaineae,
    IschnuraGenei,
    IschnuraGraellsii,
    IschnuraHastata,
    IschnuraIntermedia,
    IschnuraPumilio,
    IschnuraSaharensis,
    IschnuraSenegalensis
  ],
  nehalennia: [NehalenniaSpeciosa],
  pyrrhosoma: [PyrrhosomaNymphula, PyrrhosomaElisabethae]
}
