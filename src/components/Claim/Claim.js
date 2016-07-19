import React, { Component, PropTypes } from 'react';
import * as styles from './claim.scss';

const typeMap = {
  Professional: 'Pro',
  Prescription: 'Rx',
  Insta: 'Insta',
};

class Claim extends Component {
  static propTypes = {
    memberId: PropTypes.string,
    pushState: PropTypes.func,
    location: PropTypes.string,
    vendor: PropTypes.string,
    _id: PropTypes.string,
    claimNumber: PropTypes.string,
    ITSserialNUmber: PropTypes.string,
    totalChargedAmount: PropTypes.any,
    claimType: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.clickHandler = ::this.clickHandler;
  }

  clickHandler() {
    this.props.pushState(`/member/${this.props.memberId}/claims/claims-listing/${this.props._id}`);
  }

  render() {
    return (
      <div className={styles.claim} onClick={this.clickHandler}>
        <p><strong>{this.props.vendor}</strong></p>
        <p>Claim #{this.props.claimNumber}</p>
        <p>ITS #{this.props.ITSserialNUmber}</p>
        <p className="lead">${this.props.totalChargedAmount}</p>
        <div className={`${styles.badges} row`}>
          <div className="col-xs-6"><div className={styles.dot}></div></div>
          <div className="col-xs-6">
            <div className={`${styles.claimType} text-right`}>{typeMap[this.props.claimType]}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Claim;
