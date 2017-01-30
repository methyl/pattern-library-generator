const React = require('react')
const Navigation = require('./navigation')
const { div, li, ul, a, e } = require('./elements')

class Component extends React.Component {
  render() {
    return div({ id: this.props.name }, [
      e('h1', {}, this.props.name),
      ...this.props.patterns.map(pattern =>
        div({id: `${this.props.name}-${pattern.id}`}, [
          div({ dangerouslySetInnerHTML: {__html: pattern.html} }),
          div({ dangerouslySetInnerHTML: {__html: pattern.code} })
        ])
      )
    ])
  }
}

class Library extends React.Component {
  render() {
    return div({}, [
      Navigation({ components: this.props.components }),
      this.props.components.map(component => e(Component, component))
    ])
  }
}

module.exports = (props, children) => e(Library, props, children)
