const path = require('path')
const fs = require('fs')
const cors = require('cors')
const express = require('express')

const port = 8000
const app = express()
app.use(cors())

const map = new Map([
  ['deployDetails', path.join(__dirname, './json/deployDetails')],
  ['portMng', path.join(__dirname, './json/portMng')],
  ['argsTemplate', path.join(__dirname, './json/argsTemplate')]
])

const findJSON = (type, where) => {
  return fs
    .readdirSync(where)
    .filter(filename => path.extname(filename) === '.json')
    .map(filename => ({ filename, type, json: JSON.parse(fs.readFileSync(path.join(where, filename), 'utf8')) }))
}

app.get('/json', async (req, res, next) => {
  const { type } = req.query
  let data = []
  if (map.has(type)) {
    data.push(...findJSON(type, map.get(type)))
  } else {
    map.forEach((where, type) => data.push(...findJSON(type, where)))
  }
  res.json(data)
})

app.listen(port, () => console.log(`Listening on :${port}`))
