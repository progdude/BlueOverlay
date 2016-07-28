import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import './ClaimDetailTable.scss';

class ClaimDetailTable extends Component {
  static propTypes = {
    claim: PropTypes.object,
    claimId: PropTypes.string,
    memberId: PropTypes.string,
    pushState: PropTypes.func,
  }

  _clickHandler = (index) => {
    this.props.pushState(`/member/${this.props.memberId}/claims/claims-listing/${this.props.claimId}/detail/${index}`);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Line</th>
              <th>Svc Date</th>
              <th>Proc</th>
              <th>Mod Qty</th>
              <th>Billed amt</th>
              <th>Allowed amt</th>
              <th>Net amt</th>
            </tr>
          </thead>
          <tbody>
            {this.props.claim.details.map((detail, index) =>
              <tr key={index} onClick={() => this._clickHandler(index)}>
                <td>{index + 1}</td>
                <td>{moment(detail.checkDate).format('MM/DD/YYYY')}</td>
                <td>{detail.procedureCode}</td>
                <td>{detail.modifier}</td>
                <td>{detail.billedAmountPerServiceLine}</td>
                <td>{detail.allowedAmount}</td>
                <td>{detail.netAmount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pushState: push,
  }, dispatch);
}

export default connect(state => state, mapDispatchToProps)(ClaimDetailTable);
