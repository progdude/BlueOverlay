import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import ClaimDetailTable from '../ClaimDetailTable';
import moment from 'moment';
import * as styles from './ClaimDetail.scss';

const ClaimDetail = (props) => {
  const selectedClaim = props.claims.filter(claim => claim._id === props.claimId)[0];
  const claimDetails = selectedClaim.details[0];
  return (
    <div className={styles.background}>
      <div className={styles.backButton}>
        <Link className={styles.link} to={`/member/${props.memberId}/claims/claims-listing/${props.claimId}`}>
          &larr;
        </Link>
      </div>
      <div className={styles.paddingTop}>
        <ClaimDetailTable claim={selectedClaim} memberId={props.memberId} claimId={props.claimId} />
      </div>
      <h2>Claim Detail</h2>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>Date</div>
          <div>{moment(claimDetails.checkDate).format('MM/DD/YYYY')}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Billed Amount</div>
          <div>{claimDetails.billedAmountPerServiceLine}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Allowed Amount</div>
          <div>{claimDetails.allowedAmount}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>Total Not Covered</div>
          <div>{claimDetails.notCoveredAmountPerServiceLine}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Not Covered Reason</div>
          <div>{claimDetails.notCoveredReasonCode}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Total Copay</div>
          <div>{claimDetails.coPayAmountPerServiceLine}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>Total Coinsurance</div>
          <div>{claimDetails.coInsuranceAmountPerServiceLine}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Total Deductible</div>
          <div>{claimDetails.deductablePerServiceLine}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Procedure Description</div>
          <div>{claimDetails.procedureDesc}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>Procedure Code</div>
          <div>{claimDetails.procedureCode}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Hold Reason</div>
          <div>{claimDetails.reasonCode}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Denied Reason</div>
          <div>{claimDetails.deniedReason}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>Quantity</div>
          <div>{claimDetails.quantity}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Modifier</div>
          <div>{claimDetails.modifier}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Dx Pointer</div>
          <div></div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>Dx Description</div>
          <div></div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>Posted Date</div>
          <div>{moment(claimDetails.postedDate).format('MM/DD/YYYY')}</div>
        </Col>
        <Col xs={4}>
          <div className={styles.header}>NDC Number</div>
          <div>{claimDetails.ndcNumberPerServiceLine}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={4}>
          <div className={styles.header}>NDC Quantity</div>
          <div>{claimDetails.ndcQuantityPerServiceLine}</div>
        </Col>
        <Col xs={4} />
        <Col xs={4}>
          <div className={styles.proceedButton}>
            <Link
              className={styles.link}
              to={`/member/${props.memberId}/claims/claims-listing/${props.claimId}/payment`}
            >Payment Details</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

ClaimDetail.propTypes = {
  claims: PropTypes.array,
  claimId: PropTypes.string,
  memberId: PropTypes.string,
  detailIndex: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    claims: state.claims,
    memberId: ownProps.params.memberId,
    claimId: ownProps.params.claimId,
    detailIndex: ownProps.params.detailIndex,
  };
}

export default connect(mapStateToProps)(ClaimDetail);
