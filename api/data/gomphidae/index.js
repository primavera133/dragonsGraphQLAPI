const gomphusFlavipes = require('./gomphus-flavipes.json')
const gomphusGraslinii = require('./gomphus-graslinii.json')
const gomphusPulchellus = require('./gomphus-pulchellus.json')
const gomphusSchneiderii = require('./gomphus-schneiderii.json')
const gomphusSimillimus = require('./gomphus-simillimus.json')
const gomphusVulgatissimus = require('./gomphus-vulgatissimus.json')
const lindeniaTetraphylla = require('./lindenia-tetraphylla.json')
const onychogomphusCostae = require('./onychogomphus-costae.json')
const onychogomphusForcipatus = require('./onychogomphus-forcipatus.json')
const onychogomphusUncatus = require('./onychogomphus-uncatus.json')
const ophiogomphusCecilia = require('./ophiogomphus-cecilia.json')
const paragomphusGenei = require('./paragomphus-genei.json')

module.exports = {
  gomphus: [
    gomphusFlavipes,
    gomphusGraslinii,
    gomphusPulchellus,
    gomphusSchneiderii,
    gomphusSimillimus,
    gomphusVulgatissimus
  ],
  lindenia: [lindeniaTetraphylla],
  onychogomphus: [
    onychogomphusCostae,
    onychogomphusForcipatus,
    onychogomphusUncatus
  ],
  ophiogomphus: [ophiogomphusCecilia],
  paragomphus: [paragomphusGenei]
}
