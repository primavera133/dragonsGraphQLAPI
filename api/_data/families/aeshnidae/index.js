const AeshnaAffinis = require('./aeshna/aeshna-affinis.json')
const AeshnaCaerulea = require('./aeshna/aeshna-caerulea.json')
const AeshnaCrenata = require('./aeshna/aeshna-crenata.json')
const AeshnaCyanea = require('./aeshna/aeshna-cyanea.json')
const AeshnaGrandis = require('./aeshna/aeshna-grandis.json')
const AeshnaJuncea = require('./aeshna/aeshna-juncea.json')
const AeshnaMixta = require('./aeshna/aeshna-mixta.json')
const AeshnaSerrata = require('./aeshna/aeshna-serrata.json')
const AeshnaSubarctica = require('./aeshna/aeshna-subarctica.json')
const AeshnaViridis = require('./aeshna/aeshna-viridis.json')
const AnaxEphippiger = require('./anax/anax-ephippiger.json')
const AnaxImaculifrons = require('./anax/anax-immaculifrons.json')
const AnaxImperator = require('./anax/anax-imperator.json')
const AnaxJunius = require('./anax/anax-junius.json')
const AnaxParthenope = require('./anax/anax-parthenope.json')
const BoyeriaCretensis = require('./boyeria/boyeria-cretensis.json')
const BoyeriaIrene = require('./boyeria/boyeria-irene.json')
const BrachytronPratense = require('./brachytron/brachytron-pratense.json')
const CaliaeschnaMicrostigma = require('./caliaeschna/caliaeschna-microstigma.json')
const IsoeshnaIsoceles = require('./isoaeshna/isoaeshna-isoceles.json')

module.exports = {
  aeshna: [
    AeshnaAffinis,
    AeshnaCaerulea,
    AeshnaCrenata,
    AeshnaCyanea,
    AeshnaGrandis,
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
  caliaeschna: [CaliaeschnaMicrostigma],
  isoaeshna: [IsoeshnaIsoceles]
}
