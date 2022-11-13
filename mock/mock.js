const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const uuid = require('uuid')

// 文件列表
const DATA = []

// 递归读取文件
function findFileList(where, fileList = []) {
  fs.readdirSync(where).forEach(name => {
    const full = path.join(where, name)
    const stat = fs.statSync(full)
    const type = path.extname(full).slice(1)
    if (stat.isDirectory()) {
      findFileList(full, fileList)
    } else if (['json', 'yaml'].includes(type)) {
      const fileString = fs.readFileSync(full, 'utf8')
      const _id = uuid.v4()
      fileList.push({ _id, name, fileString, type })
    }
  })
  return fileList
}

function main() {
  // 加载文件列表
  DATA.push(...findFileList(path.join(__dirname, './fs')))

  const port = 8000
  const app = express()

  app.use(cors())
  app.use(bodyParser.json({ limit: `${1024 * 10}kb` }))
  app.use(bodyParser.urlencoded())

  // 查询
  app.get('/admin/api/OriginJson', (req, res, next) => res.json(DATA))

  // 创建
  app.post('/admin/api/OriginJson', (req, res, next) => {
    const todos = req.body.map(it => ({ ...it, _id: uuid.v4() }))
    // TODO: 持久化到文件系统
    DATA.push(...todos)
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
