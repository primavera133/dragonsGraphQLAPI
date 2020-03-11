const CeriagrionGeorgifreyi = require('./ceriagrion/ceriagrion-georgifreyi.json')
const CeriagrionTenellum = require('./ceriagrion/ceriagrion-tenellum.json')
const CoenagrionArmatum = require('./coenagrion/coenagrion-armatum.json')
const CoenagrionCaerulescens = require('./coenagrion/coenagrion-caerulescens.json')
const CoenagrionEcornutum = require('./coenagrion/coenagrion-ecornutum.json')
const CoenagrionGlaciale = require('./coenagrion/coenagrion-glaciale.json')
const CoenagrionHastulatum = require('./coenagrion/coenagrion-hastulatum.json')
const CoenagrionHylas = require('./coenagrion/coenagrion-hylas.json')
const CoenagrionIntermedium = require('./coenagrion/coenagrion-intermedium.json')
const CoenagrionJohanssoni = require('./coenagrion/coenagrion-johanssoni.json')
const CoenagrionLunulatum = require('./coenagrion/coenagrion-lunulatum.json')
const CoenagrionMercuriale = require('./coenagrion/coenagrion-mercuriale.json')
const CoenagrionOrnatum = require('./coenagrion/coenagrion-ornatum.json')
const CoenagrionPuella = require('./coenagrion/coenagrion-puella.json')
const CoenagrionPulchellum = require('./coenagrion/coenagrion-pulchellum.json')
const CoenagrionScitulum = require('./coenagrion/coenagrion-scitulum.json')
const EnallagmaCyathigerum = require('./enallagma/enallagma-cyathigerum.json')
const ErythrommaLindenii = require('./erythromma/erythromma-lindenii.json')
const ErythrommaNajas = require('./erythromma/erythromma-najas.json')
const ErythrommaViridulum = require('./erythromma/erythromma-viridulum.json')
const IschnuraAralensis = require('./ischnura/ischnura-aralensis.json')
const IschnuraElegans = require('./ischnura/ischnura-elegans.json')
const IschnuraFountaineae = require('./ischnura/ischnura-fountaineae.json')
const IschnuraGenei = require('./ischnura/ischnura-genei.json')
const IschnuraGraellsii = require('./ischnura/ischnura-graellsii.json')
const IschnuraHastata = require('./ischnura/ischnura-hastata.json')
const IschnuraIntermedia = require('./ischnura/ischnura-intermedia.json')
const IschnuraPumilio = require('./ischnura/ischnura-pumilio.json')
const IschnuraSaharensis = require('./ischnura/ischnura-saharensis.json')
const IschnuraSenegalensis = require('./ischnura/ischnura-senegalensis.json')
const NehalenniaSpeciosa = require('./nehalennia/nehalennia-speciosa.json')
const PyrrhosomaNymphula = require('./pyrrhosoma/pyrrhosoma-nymphula.json')
const PyrrhosomaElisabethae = require('./pyrrhosoma/pyrrhosoma-elisabethae.json')

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
