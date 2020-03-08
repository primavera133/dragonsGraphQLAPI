const brachythemisImpartita = require('./brachythemis/brachythemis-impartita.json')
const crocothemisErythraea = require('./crocothemis/crocothemis-erythraea.json')
const diplacodesLefebvrii = require('./diplacodes/diplacodes-lefebvrii.json')
const leucorrhiniaAlbifrons = require('./leucorrhinia/leucorrhinia-albifrons.json')
const leucorrhiniaCaudalis = require('./leucorrhinia/leucorrhinia-caudalis.json')
const leucorrhiniaDubia = require('./leucorrhinia/leucorrhinia-dubia.json')
const leucorrhiniaPectoralis = require('./leucorrhinia/leucorrhinia-pectoralis.json')
const leucorrhiniaRubicunda = require('./leucorrhinia/leucorrhinia-rubicunda.json')
const libellulaDepressa = require('./libellula/libellula-depressa.json')
const libellulaFulva = require('./libellula/libellula-fulva.json')
const libellulaQuadrimaculata = require('./libellula/libellula-quadrimaculata.json')
const orthetrumAlbistylum = require('./orthetrum/orthetrum-albistylum.json')
const orthetrumBrunneum = require('./orthetrum/orthetrum-brunneum.json')
const orthetrumCancellatum = require('./orthetrum/orthetrum-cancellatum.json')
const orthetrumChrysostigma = require('./orthetrum/orthetrum-chrysostigma.json')
const orthetrumCoerulescens = require('./orthetrum/orthetrum-coerulescens.json')
const orthetrumNitidinerve = require('./orthetrum/orthetrum-nitidinerve.json')
const orthetrumSabina = require('./orthetrum/orthetrum-sabina.json')
const orthetrumTaeniolatum = require('./orthetrum/orthetrum-taeniolatum.json')
const orthetrumTrinacria = require('./orthetrum/orthetrum-trinacria.json')
const pantalaFlavescens = require('./pantala/pantala-flavescens.json')
const selysiothemisNigra = require('./selysiothemis/selysiothemis-nigra.json')
const sympetrumDanae = require('./sympetrum/sympetrum-danae.json')
const sympetrumDepressiculum = require('./sympetrum/sympetrum-depressiculum.json')
const sympetrumFlaveolum = require('./sympetrum/sympetrum-flaveolum.json')
const sympetrumFonscolombii = require('./sympetrum/sympetrum-fonscolombii.json')
const sympetrumMeridionale = require('./sympetrum/sympetrum-meridionale.json')
const sympetrumNigrifemur = require('./sympetrum/sympetrum-nigrifemur.json')
const sympetrumPedemontanum = require('./sympetrum/sympetrum-pedemontanum.json')
const sympetrumSanguineum = require('./sympetrum/sympetrum-sanguineum.json')
const sympetrumSinaiticum = require('./sympetrum/sympetrum-sinaiticum.json')
const sympetrumStriolatum = require('./sympetrum/sympetrum-striolatum.json')
const sympetrumVulgatum = require('./sympetrum/sympetrum-vulgatum.json')
const trithemisAnnulata = require('./trithemis/trithemis-annulata.json')
const trithemisArteriosa = require('./trithemis/trithemis-arteriosa.json')
const trithemisFestiva = require('./trithemis/trithemis-festiva.json')
const trithemisKirbyi = require('./trithemis/trithemis-kirbyi.json')
const zygonyxTorridus = require('./zygonyx/zygonyx-torridus.json')

module.exports = {
  brachythemis: [brachythemisImpartita],
  crocothemis: [crocothemisErythraea],
  diplacodes: [diplacodesLefebvrii],
  leucorrhinia: [
    leucorrhiniaAlbifrons,
    leucorrhiniaCaudalis,
    leucorrhiniaDubia,
    leucorrhiniaPectoralis,
    leucorrhiniaRubicunda
  ],
  libellula: [libellulaDepressa, libellulaFulva, libellulaQuadrimaculata],
  orthetrum: [
    orthetrumAlbistylum,
    orthetrumBrunneum,
    orthetrumCancellatum,
    orthetrumChrysostigma,
    orthetrumCoerulescens,
    orthetrumNitidinerve,
    orthetrumSabina,
    orthetrumTaeniolatum,
    orthetrumTrinacria
  ],
  pantala: [pantalaFlavescens],
  selysiothemis: [selysiothemisNigra],
  sympetrum: [
    sympetrumDanae,
    sympetrumDepressiculum,
    sympetrumFlaveolum,
    sympetrumFonscolombii,
    sympetrumMeridionale,
    sympetrumNigrifemur,
    sympetrumPedemontanum,
    sympetrumSanguineum,
    sympetrumSinaiticum,
    sympetrumStriolatum,
    sympetrumVulgatum
  ],
  trithemis: [
    trithemisAnnulata,
    trithemisArteriosa,
    trithemisFestiva,
    trithemisKirbyi
  ],
  zygonyx: [zygonyxTorridus]
}
