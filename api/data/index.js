const AeshnaAffinis = require('./aeshna-affinis.json')
const AeshnaCaerulea = require('./aeshna-caerulea.json')
const AeshnaCrenata = require('./aeshna-crenata.json')
const AeshnaCyanea = require('./aeshna-cyanea.json')
const AeshnaGrandis = require('./aeshna-grandis.json')
const AeshnaIsoceles = require('./aeshna-isoceles.json')
const AeshnaJuncea = require('./aeshna-juncea.json')
const AeshnaMixta = require('./aeshna-mixta.json')
const AeshnaSerrata = require('./aeshna-serrata.json')
const AeshnaSubarctica = require('./aeshna-subarctica.json')
const AeshnaViridis = require('./aeshna-viridis.json')
const AnaxEphippiger = require('./anax-ephippiger.json')
const AnaxImaculifrons = require('./anax-imaculifrons.json')
const AnaxImperator = require('./anax-imperator.json')
const AnaxJunius = require('./anax-junius.json')
const AnaxParthenope = require('./anax-parthenope.json')
const BoyeriaCretensis = require('./boyeria-cretensis.json')
const BoyeriaIrene = require('./boyeria-irene.json')
const BrachytronPratense = require('./brachytron-pratense.json')
const CaliaeschnaMicrostigma = require('./caliaeschna-microstigma.json')

const CalopteryxHaemorrhoidalis = require('./calopteryx-haemorrhoidalis.json')
const CalopteryxSplendens = require('./calopteryx-splendens.json')
const CalopteryxVirgo = require('./calopteryx-virgo.json')
const CalopteryxXanthostoma = require('./calopteryx-xanthostoma.json')

module.exports = {
  aeshnidae: {
    aeshna: [
      AeshnaAffinis,
      AeshnaCaerulea,
      AeshnaCrenata,
      AeshnaCyanea,
      AeshnaGrandis,
      AeshnaIsoceles,
      AeshnaJuncea,
      AeshnaMixta,
      AeshnaSerrata,
      AeshnaSubarctica,
      AeshnaViridis
    ],
    anax: [
      AnaxEphippiger,
      AnaxImaculifrons,
      AnaxImperator,
      AnaxJunius,
      AnaxParthenope
    ],
    boyeria: [BoyeriaCretensis, BoyeriaIrene],
    brachytron: [BrachytronPratense],
    caliaeschna: [CaliaeschnaMicrostigma]
  },
  calopterygidae: {
    calopteryx: [
      CalopteryxHaemorrhoidalis,
      CalopteryxSplendens,
      CalopteryxVirgo,
      CalopteryxXanthostoma
    ]
  }
}
