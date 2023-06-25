const path = require('path')
const fs = require('fs')

const dirPath  = path.join(__dirname,"../src/content")
let noteslist = []

const getNotes = async () => {
    await fs.readdir(dirPath,(err,files)=>{
        if (err){
            return console.log("failed ", err)
        }

        files.forEach((file,i)=>{
            let obj = {}
            let note
            fs.readFile(`${dirPath}/${file}`,"utf8",(err,contents)=>{
                console.log(contents)
            })
        })
    })
}

getNotes()