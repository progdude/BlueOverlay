import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as styles from './ClaimPayment.scss';

const ClaimPayment = (props) => {
  const background = styles.background;
  const backButton = styles.backButton;
  return (
    <div className={background}>
      <div className={backButton}>
        <Link className={styles.link} to={`/customers/${props.customerId}/claims/listing/${props.claimId}`}>
          &larr;
        </Link>
      </div>
      <h2>Payment Details</h2>
    </div>
  );
};

ClaimPayment.propTypes = {
  claimId: PropTypes.string,
  customerId: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    claims: state.claims,
    customerId: ownProps.params.customerId,
    claimId: ownProps.params.claimId,
  };
}

export default connect(mapStateToProps)(ClaimPayment);
