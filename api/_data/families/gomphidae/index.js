const gomphusFlavipes = require('./gomphus/gomphus-flavipes.json')
const gomphusGraslinii = require('./gomphus/gomphus-graslinii.json')
const gomphusPulchellus = require('./gomphus/gomphus-pulchellus.json')
const gomphusSchneiderii = require('./gomphus/gomphus-schneiderii.json')
const gomphusSimillimus = require('./gomphus/gomphus-simillimus.json')
const gomphusVulgatissimus = require('./gomphus/gomphus-vulgatissimus.json')
const lindeniaTetraphylla = require('./lindenia/lindenia-tetraphylla.json')
const onychogomphusCostae = require('./onychogomphus/onychogomphus-costae.json')
const onychogomphusForcipatus = require('./onychogomphus/onychogomphus-forcipatus.json')
const onychogomphusUncatus = require('./onychogomphus/onychogomphus-uncatus.json')
const ophiogomphusCecilia = require('./ophiogomphus/ophiogomphus-cecilia.json')
const paragomphusGenei = require('./paragomphus/paragomphus-genei.json')

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
