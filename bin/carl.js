#!/usr/bin/env node

var minimist = require('minimist')
var path = require('path')
var cliclopts = require('cliclopts')
var Carl = require('../')

var usage = `
Carl - Convert Markdown to PDF

Usage: carl [options] <markdown-file-path>

Options:
  -h, --help          Output usage information
  -o, --output        Specify output file
  -g, --github        Render Markdown using Github flavoured CSS
  -s, --stylesheet    Path to custom CSS
  -d, --debug         Enable debug information

Docs: https://github.com/Briix/carl
Bugs: https://github.com/Briix/carl/issues
`

var opts = cliclopts([
  {
    name: 'help',
    abbr: 'h',
    boolean: true
  },
  {
    name: 'output',
    abbr: 'o'
  },
  {
    name: 'github',
    abbr: 'g',
    boolean: true
  },
  {
    name: 'stylesheet',
    abbr: 's'
  },
  {
    name: 'debug',
    abbr: 'd',
    boolean: true
  },
])

var argv = minimist(process.argv.slice(2), opts.options())

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
    css: argv.g ? ghCss : argv.s || null,
    output: argv.o || fileName,
    debug: argv.d ? debug : {}
  })
  carl.run()
} else if (!argv._.length || argv.h) {
  console.log(usage)
}
