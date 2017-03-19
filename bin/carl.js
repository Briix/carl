#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var path = require('path')
var Carl = require('../')

if (argv._.length) {
  var file = argv._[0]
  var fileName = path.basename(file).split('.')[0] + '.pdf'
  var ghCss = path.join(__dirname, '../css/gh.css')
  var debug = {
    dock: true,
    show: true
  }

  var carl = new Carl({
    file: file,
    css: argv.g ? ghCss : argv.s || null,
    output: argv.o || fileName,
    debug: argv.d ? debug : {}
  })
  carl.run()
}
