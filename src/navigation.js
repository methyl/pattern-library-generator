const React = require('react')
const { li, ul, a, e } = require('./elements')

class Navigation extends React.Component {
  render() {
    return ul({}, this.props.components.map(component =>
      li({}, [
        a({ href: `#${component.name}`}, component.name),
        ul({}, component.patterns.map(pattern =>
          li({}, a({ href: `#${component.name}-${pattern.id}`}, pattern.name))
        ))
      ])
    ))
  }
}

module.exports = (props, children) => e(Navigation, props, children)
