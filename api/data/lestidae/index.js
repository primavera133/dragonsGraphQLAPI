const chalcolestesParvidens = require('./chalcolestes-parvidens.json')
const chalcolestesViridis = require('./chalcolestes-viridis.json')
const lestesBarbarus = require('./lestes-barbarus.json')
const lestesDryas = require('./lestes-dryas.json')
const lestesMacrostigma = require('./lestes-macrostigma.json')
const lestesSponsa = require('./lestes-sponsa.json')
const lestesVirens = require('./lestes-virens.json')
const sympecmaFusca = require('./sympecma-fusca.json')
const sympecmaPaedisca = require('./sympecma-paedisca.json')

module.exports = {
  chalcolestes: [chalcolestesParvidens, chalcolestesViridis],
  lestes: [
    lestesBarbarus,
    lestesDryas,
    lestesMacrostigma,
    lestesSponsa,
    lestesVirens
  ],
  sympecma: [sympecmaFusca, sympecmaPaedisca]
}
