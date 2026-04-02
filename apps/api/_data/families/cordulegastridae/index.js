const cordulegasterBoltonii = require('./cordulegaster/cordulegaster-boltonii.json')
const cordulegasterHeros = require('./cordulegaster/cordulegaster-heros.json')
const cordulegasterPicta = require('./cordulegaster/cordulegaster-picta.json')
const cordulegasterTrinacriae = require('./cordulegaster/cordulegaster-trinacriae.json')
const thecagasterBidentata = require('./thecagaster/thecagaster-bidentata.json')
const thecagasterHelladica = require('./thecagaster/thecagaster-helladica.json')
const thecagasterInsignis = require('./thecagaster/thecagaster-insignis.json')

module.exports = {
  cordulegaster: [
    cordulegasterBoltonii,
    cordulegasterHeros,
    cordulegasterPicta,
    cordulegasterTrinacriae
  ],
  thecagaster: [
    thecagasterBidentata,
    thecagasterHelladica,
    thecagasterInsignis
  ]
}
