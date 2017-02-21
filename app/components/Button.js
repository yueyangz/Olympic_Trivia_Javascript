const React = require('react');
const classNames = require('classnames');

const {bool, string, func} = React.PropTypes;

const Button = React.createClass({
  propsTypes: {
    unlock: bool,
    className: string,
    text: string,
    type: string,
    onClick: func,
    id: string,
    secondary: bool,
  },
  
  getDefaultProps(){
    return {
      unlock: true,
      type: "button"
    };
  },

  buttonClassName() {
    return classNames(
      'jumbo-button',
      {'secondary': this.props.secondary},
      this.props.className,
      this.props.unlock ? 'enabled' : 'disabled');
  },

  render() {
    return <button className={this.buttonClassName()}
              type={this.props.type}
              id={this.props.id}
              onClick={this.props.onClick}
              disabled={!this.props.unlock}>
        {this.props.text}
    </button>
  }
});

module.exports = Button;