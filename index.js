const express = require('express')
const multer  = require('multer')
var fs = require('fs');
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')
let app = express()
app.use(cors())

fs.mkdir('img',(x)=>{
  console.log(x);
})
app.post('/',upload.array('file'),(req,res)=>{
 let f =  fs.readFileSync(req.files[0].path)
  console.log(req.files[0]);
  fs.writeFileSync("./img/"+req.files[0].originalname, f);
  res.send(req.file)
})

app.post('/a',(req,res)=>{
  res.send("aaaaa")
})

app.listen(3001,()=>{
  console.log('running ');
})