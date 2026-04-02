const corduliaAenea = require('./cordulia/cordulia-aenea.json')
const epithecaBimaculata = require('./epitheca/epitheca-bimaculata.json')
const somatochloraAlpestris = require('./somatochlora/somatochlora-alpestris.json')
const somatochloraArctica = require('./somatochlora/somatochlora-arctica.json')
const somatochloraBorisi = require('./somatochlora/somatochlora-borisi.json')
const somatochloraFlavomaculata = require('./somatochlora/somatochlora-flavomaculata.json')
const somatochloraGraeseri = require('./somatochlora/somatochlora-graeseri.json')
const somatochloraMeridionalis = require('./somatochlora/somatochlora-meridionalis.json')
const somatochloraMetallica = require('./somatochlora/somatochlora-metallica.json')
const somatochloraSahlbergi = require('./somatochlora/somatochlora-sahlbergi.json')

module.exports = {
  cordulia: [corduliaAenea],
  epitheca: [epithecaBimaculata],
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
