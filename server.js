const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdfs}  = require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/merge', upload.array('pdfs', 2),   async (req, res, next)=> {
 console.log(req.files)
 await mergePdfs(path.join(__dirname,req.files[0].path), path.join(__dirname,req.files[1].path))
req.redirect("htttp://localhost:3000/static/merged.pdf")
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port htttp://localhost:${port}`)
})