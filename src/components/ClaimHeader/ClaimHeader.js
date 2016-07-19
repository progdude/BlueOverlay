import React from 'react';
import { Row, Col } from 'react-bootstrap';
import * as styles from './ClaimHeader.scss';

function ClaimHeader() {
  return (
    <div className={styles.background}>
      <h2>Claim Header</h2>

      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}> Claim Number</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Status</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Claim Type</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Total Billed</div>
          <div></div>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}> Vendor</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Member</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Gender</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Auth Number</div>
          <div></div>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}> Provider ID</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Date Recieved</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> DIN Number</div>
          <div></div>
        </Col>
        <Col xs={3}>
          <div className={styles.header}> Par/Non Par</div>
          <div></div>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3}>
          <div className={styles.header}> Dx Code</div>
          <div></div>
        </Col>
        <Col xs={9}>
          <div className={styles.header}> Referring Provider Name</div>
          <div></div>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col xs={6}>
          <div className={styles.header}> Dx Description</div>
          <div></div>
        </Col>
        <Col xs={6}>
          <div className={styles.header}> Place of Service Description</div>
          <div></div>
        </Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3}>
          <input type="checkbox" checked readOnly />
          <p className={styles.header}> International </p>
        </Col>
        <Col xs={3}>
          <input type="checkbox" checked readOnly />
          <p className={styles.header}> Pay Sub </p>
        </Col>
        <Col xs={6}>
          <input type="checkbox" checked readOnly />
          <p className={styles.header}> Medicare Primary </p>
        </Col>
      </Row>

    </div>
  );
}

export default ClaimHeader;
