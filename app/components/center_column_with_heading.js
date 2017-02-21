const React = require('react');
const {Row, Col} = require('react-bootstrap');

const SectionHeading = React.createClass({
  render(){
    return(
      <div className={`section-heading ${this.props.className}`}>{this.props.lead}</div>
    )
  }
});

const LinedSectionHeading = React.createClass({
  render(){
    return(
      <h3 className={`lined-section-heading ${this.props.className}`} >{this.props.lead}</h3>
    )
  }
});

const BoldSectionHeading = React.createClass({
  render(){
    return(
      <div className={`bold-section-heading ${this.props.className}`} >{this.props.lead}</div>
    )
  }
});

const BottomLine = React.createClass({
  render(){
    return(
      <p className={`bottom-line pbxxl ${this.props.className}`} >{this.props.children}</p>
    )
  }
});


const CenterColumnWithHeading = React.createClass({
  headlineType(){
    switch (this.props.headlineType) {
      case 'normal':
        return SectionHeading ;
      case 'lined' :
        return LinedSectionHeading ;
      case 'bold':
      default:
        return BoldSectionHeading ;
    }
  },

  headline(){
    if(this.props.lead) {
      return React.createElement(this.headlineType(), {lead: this.props.lead})
    } else {
      return ''
    }
  },
  render(){
    return (
      <div className={`ptxxl ${this.props.className}`}>
        {this.headline()}
        <Row className="grid-show">
          <Col sm={6} smOffset={3}>
            {this.props.children}
          </Col>
        </Row>
      </div>);
  }
});

export default {CenterColumnWithHeading, SectionHeading, LinedSectionHeading, BoldSectionHeading, BottomLine}
