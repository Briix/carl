#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var path = require('path')
var Carl = require('../')

if (argv._.length) {
  var file = argv._[0]
  var fileName = path.basename(file).split('.')[0] + '.pdf'

  var carl = new Carl({
    file: file,
    css: argv.s || null,
    output: argv.o || fileName
  })
  carl.run()
}

