const fs = require('fs')
const exec = require('child_process').exec

fs.readdir('./', { encoding: 'utf-8'}, (error, file_list) => {
  let ejs_list = file_list.filter(file => file.endsWith('.ejs'))
  ejs_list.forEach(ejs => {
    exec(`ejs ${ejs} -o ../public/${ejs.replace('.ejs', '')}.html`, (error, ret) => {
      console.log({error, ret})
    })
  })
})