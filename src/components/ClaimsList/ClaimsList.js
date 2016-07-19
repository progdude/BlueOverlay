import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Claim from '../Claim';
import Shuffle from 'react-shuffle';
import * as styles from './claimsList.scss';

class ClaimsList extends Component {
  static propTypes = {
    type: PropTypes.string,
    memberId: PropTypes.string,
    vendor: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    startAmount: PropTypes.number,
    endAmount: PropTypes.number,
    claims: PropTypes.array,
    pushState: PropTypes.func,
  };

  render() {
    return (
      <div className={styles.claimsList}>
        <Shuffle duration={500}>
          {this.props.claims
            .filter(claim => {
              if (this.props.type && this.props.type !== claim.claimType) {
                return false;
              }
              if (this.props.vendor && this.props.vendor !== claim.vendor) {
                return false;
              }
              if (this.props.startDate && this.props.startDate.getTime() > claim.dateOfService) {
                return false;
              }
              if (this.props.endDate && this.props.endDate.getTime() < claim.dateOfService) {
                return false;
              }
              if (this.props.startAmount && this.props.startAmount > parseFloat(claim.totalChargedAmount)) {
                return false;
              }
              if (this.props.endAmount && this.props.endAmount < parseFloat(claim.totalChargedAmount)) {
                return false;
              }
              return true;
            })
            .map(claim => <div key={`claim_${claim._id}`} style={{height: '220px', width: '200px', float: 'left'}}><Claim {...claim} pushState={this.props.pushState} memberId={this.props.memberId} /></div>)}
        </Shuffle>
        <div className="clearfix"></div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pushState: push,
  }, dispatch);
}

export default connect(state => state, mapDispatchToProps)(ClaimsList);
