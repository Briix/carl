var merry = require('merry')
var http = require('http')
var fromString = require('from2-string')
var fs = require('fs')
var path = require('path')
var MarkdownIt = require('markdown-it')
var markdownItAnchor = require('markdown-it-anchor')
var Nightmare = require('nightmare')

module.exports = Carl

function Carl (opts) {
  if (!(this instanceof Carl)) return new Carl(opts)
  this.opts = opts || {}

  this.nightmare = Nightmare(this.opts.debug)

  this.md = new MarkdownIt()
  this.md.use(markdownItAnchor)

  this.html = fs.readFileSync(opts.file, 'utf8')
  this.server = null
}

Carl.prototype._startServer = function (cb) {
  var env = merry.env({ PORT: 8080 })
  var app = merry()
  var self = this

  app.router([
    [ '/', function (req, res, ctx, done) {
      done(null, fromString(self.md.render(self.html)))
    } ]
  ])

  this.server = http.createServer(app.start())
  this.server.listen(env.PORT, function () {
    cb()
  })
}

Carl.prototype.run = function () {
  var self = this

  this._startServer(function () {
    self.nightmare
      .goto('http://localhost:8080')
      .inject('css', self.opts.css || path.join(__dirname, '/css/main.css'))
      .pdf(self.opts.output, {})
      .end()
      .then(function (value) {
        self.server.close()
      })
      .catch(function (err) {
        return console.log('Oh noes ', err)
      })
  })
}
