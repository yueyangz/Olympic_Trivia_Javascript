const React = require('react');

var Div = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
  },
  getDefaultProps(){
    return {
      show: true,
      className: ''
    }
  },
  render(){
    return (
      <div {...this.props} className={this.props.className + (this.props.show ? '' : ' hidden') }>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Div;