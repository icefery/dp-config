const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')

const DATA = []

function findFileList(where, fileList = []) {
  fs.readdirSync(where).forEach(name => {
    const full = path.join(where, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      findFileList(full, fileList)
    } else if (path.extname(full) === '.json') {
      const fileString = fs.readFileSync(full, 'utf8')
      const type = 'json'
      const _id = full
      fileList.push({ _id, name, fileString, type })
    }
  })
  return fileList
}

function main() {
  DATA.push(...findFileList(path.join(__dirname, './json')))

  const port = 8000
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())

  // 查询
  app.get('/admin/api/OriginJson', (req, res, next) => res.json(DATA))

  // 创建
  app.post('/admin/api/OriginJson', (req, res, next) => {
    const todo = req.body
    const _id = path.join(__dirname, './json/todo', todo.name)
    DATA.push({ ...todo, _id })
    res.json({ code: '0', message: '', data: 'success' })
  })

  // 删除
  app.delete('/admin/api/OriginJson/:id', (req, res, next) => {
    const index = DATA.findIndex(it => it._id === req.params.id)
    DATA.splice(index, 1)
    res.json({ code: '0', message: '', data: 'success' })
  })

  app.listen(port, () => console.log(`Listening on :${port}`))
}

main()
