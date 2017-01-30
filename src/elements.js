const React = require('react')

const e = (type, props, children) => (
  React.createElement(type, props, children)
)

const li = (props, children) => e('li', props, children)
const ul = (props, children) => e('ul', props, children)
const a = (props, children) => e('a', props, children)
const div = (props, children) => e('div', props, children)


module.exports = { div,li, ul, a, e }
