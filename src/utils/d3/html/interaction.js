import React, { Component, PropTypes} from 'react';
import dateFormat from 'date-format';

class Interactions extends Component {
  static propTypes = {
    type: PropTypes.string,
    assign: PropTypes.func,
    r: PropTypes.bool,
    dateLastUpdate: PropTypes.string,
    repName: PropTypes.string,
    member: PropTypes.string,
    avatar: PropTypes.string,
    refId: PropTypes.string,
    channel: PropTypes.string,
    hccId: PropTypes.string,
    summary: PropTypes.string,
    resume: PropTypes.func,
  };

  constructor (props) {
    super(props);
    props.assign({r: true});

    this.state = {
      showDetails: false,
    };

    this.toggleDetails = this.toggleDetails.bind(this);
  }

  render () {
    const date = dateFormat('MM/dd/yyyy hh:mm', new Date(this.props.dateLastUpdate));
    return (
      <div
        className={`${this.props.type || 'default'} ${this.state.showDetails ? 'detailed' : ''} clickable`}
        onClick={this.toggleDetails}
      >
        {!this.state.showDetails &&
          <div className='short-details'>
            <div className='value'>{date}</div>
            <div className='value'>{this.props.repName}</div>
            <div className='value'>Service Require</div>
            <div className='value'>{this.props.refId}</div>
            <div className='value'>Member</div>
            <div className='value'>{this.props.member}</div>
          </div> ||
          <div className='details'>
            <div className='row'>
              <div className='col-xs-3'>
                <img src={this.props.avatar} alt='avatar' className='avatar' />
              </div>
              <div className='col-xs-9'>
                <div className='node-label'>Service representative</div>
                <div className='value'>{this.props.repName}</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <div className='node-label'>Service request</div>
                <div className='value'>{this.props.refId}</div>
              </div>
              <div className='col-xs-6'>
                <div className='node-label'>Time stamp</div>
                <div className='value'>{date}</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-6'>
                <div className='node-label'>Channel of interaction</div>
                <div className='value'>{this.props.channel}</div>
              </div>
              <div className='col-xs-6'>
                <div className='node-label'>HCCID</div>
                <div className='value'>{this.props.hccId}</div>
              </div>
            </div>
            <hr />
            <div className='summary'>{this.props.summary}</div>
          </div>}
      </div>
    );
  }

  toggleDetails () {
    if (!(window.d3.event && window.d3.event.defaultPrevented)) {
      this.props.assign({
        r: this.state.showDetails,
        pinable: !this.state.showDetails,
      });
      this.props.resume();
      this.setState({showDetails: !this.state.showDetails});
    }
  }
}

export default {
  enter: Interactions,
};
