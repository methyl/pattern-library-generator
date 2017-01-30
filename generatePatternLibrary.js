const css = require('css')
const fs = require('fs')
const jsdom = require('jsdom').jsdom
const marked = require('marked')
const util = require('util')
const Library = require('./src/library')
const ReactDOM = require('react-dom/server')
const kebabCase = require('lodash/kebabCase')


function generate() {
  console.log("Generating pattern library")

  const components = fs.readdirSync('./patterns')
    .map(file => {
      const comments = css.parse(fs.readFileSync(`./patterns/${file}`).toString()).stylesheet.rules.filter(rule => rule.type === 'comment').map(r => marked(r.comment))
      const patterns = comments.map(comment => ({
        code: jsdom(comment).defaultView.document.querySelector('code').textContent,
        name: jsdom(comment).defaultView.document.querySelector('h2').textContent,
        id: kebabCase(jsdom(comment).defaultView.document.querySelector('h2').textContent),
        html: comment,
      }))
      return {
        name: file.replace('.css', ''),
        patterns
      }
    })
  fs.writeFileSync('components.json', JSON.stringify(components))

  const html = ReactDOM.renderToStaticMarkup(Library({ components }, null))

  fs.writeFileSync('patterns.html', `
    <html>
      <head>
        <link rel="stylesheet" href="patterns/button.css" />
        <link rel="stylesheet" href="patterns/form.css" />
        <style>
          body {
            -webkit-transform: scale(2);
            -webkit-transform-origin: 0 0;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `)
}

module.exports = generate
