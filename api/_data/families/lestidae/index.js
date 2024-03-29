const chalcolestesParvidens = require('./chalcolestes/chalcolestes-parvidens.json')
const chalcolestesViridis = require('./chalcolestes/chalcolestes-viridis.json')
const lestesBarbarus = require('./lestes/lestes-barbarus.json')
const lestesConcinnus = require('./lestes/lestes-concinnus.json')
const lestesNumidicus = require('./lestes/lestes-numidicus.json')
const lestesDryas = require('./lestes/lestes-dryas.json')
const lestesMacrostigma = require('./lestes/lestes-macrostigma.json')
const lestesPallidus = require('./lestes/lestes-pallidus.json')
const lestesSponsa = require('./lestes/lestes-sponsa.json')
const lestesVirens = require('./lestes/lestes-virens.json')
const sympecmaFusca = require('./sympecma/sympecma-fusca.json')
const sympecmaGobica = require('./sympecma/sympecma-gobica.json')
const sympecmaPaedisca = require('./sympecma/sympecma-paedisca.json')

module.exports = {
  chalcolestes: [chalcolestesParvidens, chalcolestesViridis],
  lestes: [
    lestesBarbarus,
    lestesConcinnus,
    lestesDryas,
    lestesMacrostigma,
    lestesNumidicus,
    lestesPallidus,
    lestesSponsa,
    lestesVirens,
  ],
  sympecma: [sympecmaFusca, sympecmaGobica, sympecmaPaedisca]
}
