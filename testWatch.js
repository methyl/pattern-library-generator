const fs = require('fs')
const generate = require('./generatePatternLibrary')
const execFile = require('child_process').execFile


fs.watch('patterns', (event, filename) => {
  generate()
  const child = execFile('./node_modules/casperjs/bin/casperjs', ['test', 'test.js'], function(err, stdout) {
    console.log(stdout)
  })
})
