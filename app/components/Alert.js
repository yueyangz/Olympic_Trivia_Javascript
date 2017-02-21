const React = require('react');
const $ = require('jquery');

var Alert = React.createClass({
  propTypes: {
    message: React.PropTypes.string,
    type: React.PropTypes.oneOf(['error', 'success', '']),
    afterFadeOut: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      timeout: 3000,
      fadeout: 1000,
      permanent: false
    }
  },

  showAndTimeout() {
    if(this.props.permanent){
      return;
    }
    var self = this;
    $('#alert').css('display', 'block');
    window.setTimeout(() => {
      $('#alert').fadeOut(self.props.fadeout, () => {
        if(self.props.afterFadeOut) { self.props.afterFadeOut() }
      });

    }, self.props.timeout);
  },

  render() {
    if(!this.props.message) return null;
    
    return <p id="alert" className={`alert-${this.props.type} ${this.props.className}`} onLoad={this.showAndTimeout()}>
      {this.props.message}
    </p>
  }
});

module.exports = Alert