import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import ClaimDetailTable from '../ClaimDetailTable';
import moment from 'moment';
import * as styles from './ClaimHeader.scss';

const ClaimHeader = (props) => {
  const selectedClaim = props.claims.filter(claim => claim._id === props.claimId)[0];
  return (
    <div className={styles.background}>
      <div className={styles.backButton}>
        <Link className={styles.link} to={`/member/${props.memberId}/claims/claims-listing`}> &larr; </Link>
      </div>
      <h2>Claim Header</h2>
      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}>Claim Number</div>
          <div>{selectedClaim.claimNumber}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Status</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Claim Type</div>
          <div>{selectedClaim.claimType}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Total Billed</div>
          <div></div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}>Vendor</div>
          <div>{selectedClaim.vendor}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Member</div>
          <div>{selectedClaim.memberFirstName} {selectedClaim.memberLastName}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Gender</div>
          <div>{selectedClaim.gender}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Auth Number</div>
          <div>{selectedClaim.authorizationNumber}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}>Provider ID</div>
          <div>{selectedClaim.providerIdNumber}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Date Recieved</div>
          <div>{moment(selectedClaim.dateReceived).format('MM/DD/YYYY')}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>DIN Number</div>
          <div>{selectedClaim.dinNumberUser}</div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}>Par/Non Par</div>
          <div>{selectedClaim.parNonParParticipationStatus}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}>Dx Code</div>
          <div></div>
        </Col>
        <Col xs={9}>
          <div className={styles.header}>Referring Provider Name</div>
          <div>{selectedClaim.referringProviderName}</div>
        </Col>
      </Row>
      <Row className={`show-grid ${styles.paddingTop}`}>
        <Col xs={6}>
          <div className={styles.header}>Dx Description</div>
          <div>{selectedClaim.dxDetails[0].dxDescription}</div>
        </Col>
        <Col xs={6}>
          <div className={styles.header}>Place of Service Description</div>
          <div>{selectedClaim.placeOfServiceDesc}</div>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col xs={3}>
          <input type="checkbox" checked readOnly />
          <p className={styles.checkboxHeader}>International</p>
        </Col>
        <Col xs={3}>
          <input type="checkbox" checked readOnly />
          <p className={styles.checkboxHeader}>Pay Sub</p>
        </Col>
        <Col xs={6}>
          <input type="checkbox" checked readOnly />
          <p className={styles.checkboxHeader}>Medicare Primary</p>
        </Col>
      </Row>
      <div className={styles.paddingTop}>
        <ClaimDetailTable claim={selectedClaim} memberId={props.memberId} claimId={props.claimId} />
      </div>
    </div>
  );
};

ClaimHeader.propTypes = {
  claims: PropTypes.array,
  claimId: PropTypes.string,
  memberId: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    claims: state.claims,
    memberId: ownProps.params.memberId,
    claimId: ownProps.params.claimId,
  };
}

export default connect(mapStateToProps)(ClaimHeader);
