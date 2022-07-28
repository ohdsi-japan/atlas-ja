const fs = require('fs')
const path = require('path')
const { Parser, transforms: { flatten } } = require('json2csv')

const ORIGINAL = path.join(__dirname, '../original/messages_ja.json')
const messages = require(ORIGINAL)

Object.keys(messages).forEach((item) => {
  if (item === 'locale') return
  const json2csv = new Parser({
    transforms: [flatten({
      objects: true,
      arrays: true
    })]
  })
  const json = { [item]: messages[item] }
  const csv = json2csv.parse(json)
  fs.writeFileSync(path.join(__dirname, `../translations/${item}.csv`), csv)
})
