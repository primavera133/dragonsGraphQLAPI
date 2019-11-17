const corduliaAenea = require('./cordulia-aenea.json')
const epithecaBimaculata = require('./epitheca-bimaculata.json')
const macromiaAmphigena = require('./macromia-amphigena.json')
const macromiaSplendens = require('./macromia-splendens.json')
const oxygastraCurtisii = require('./oxygastra-curtisii.json')
const somatochloraAlpestris = require('./somatochlora-alpestris.json')
const somatochloraArctica = require('./somatochlora-arctica.json')
const somatochloraBorisi = require('./somatochlora-borisi.json')
const somatochloraFlavomaculata = require('./somatochlora-flavomaculata.json')
const somatochloraGraeseri = require('./somatochlora-graeseri.json')
const somatochloraMeridionalis = require('./somatochlora-meridionalis.json')
const somatochloraMetallica = require('./somatochlora-metallica.json')
const somatochloraSahlbergi = require('./somatochlora-sahlbergi.json')

module.exports = {
  cordulia: [corduliaAenea],
  epitheca: [epithecaBimaculata],
  macromia: [macromiaAmphigena, macromiaSplendens],
  oxygastra: [oxygastraCurtisii],
  somatochlora: [
    somatochloraAlpestris,
    somatochloraArctica,
    somatochloraBorisi,
    somatochloraFlavomaculata,
    somatochloraGraeseri,
    somatochloraMeridionalis,
    somatochloraMetallica,
    somatochloraSahlbergi
  ]
}
