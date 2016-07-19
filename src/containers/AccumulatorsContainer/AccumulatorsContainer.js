import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AccumulatorsList from '../../components/AccumulatorsList';
import Popover from '@terebentina/react-popover';
import '@terebentina/react-popover/lib/styles.css';
import * as styles from './AccumulatorsContainer.scss';
import dateFormat from 'dateformat';

const getDatePlusYear = (years) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return { display: dateFormat(date, 'mmm dd yyyy'), date };
};

const dateRanges = [];

for (let i = -3; i < 1; ++i) {
  dateRanges.push([getDatePlusYear(i), getDatePlusYear(i + 1)]);
}

class AccumulatorsContainer extends Component {
  static propTypes = {
    memberId: PropTypes.string,
    accumulators: PropTypes.array,
    children: PropTypes.element,
  };

  constructor (props) {
    super(props);

    this.state = {
      filters: {},
    };
    this.filterClickHandler = ::this.filterClickHandler;
    this.filterInputHandler = ::this.filterInputHandler;
  }

  setFilter (filter) {
    this.setState({ filters: { ...this.state.filters, ...filter } });
  }

  filterClickHandler (filter) {
    return this.setFilter.bind(this, filter);
  }

  filterInputHandler (property) {
    return (event) => this.setFilter({ [property]: event.target.value });
  }

  render () {
    return (
      <div>
        <div className={this.props.children ? styles.moveLeft : null}>
          <AccumulatorsList
            accumulators={this.props.accumulators}
            {...this.state.filters}
            memberId={this.props.memberId}
          />
        </div>

        <div>
          {this.props.children}
        </div>
        <div className={styles.filters}>
          <Popover trigger={<div className={styles.filter}>Type</div>}>
            <ul className={styles.selectList}>
              {/* Is this a set list, dynamic, or what? */}
              <li><a href='#' onClick={this.filterClickHandler({ type: 'Professional' })}>Professional</a></li>
              <li><a href='#' onClick={this.filterClickHandler({ type: 'Insta' })}>Inst</a></li>
              <li><a href='#' onClick={this.filterClickHandler({ type: 'Prescription' })}>Prescription</a></li>
            </ul>
          </Popover>
          <Popover trigger={<div className={styles.filter}>Provider</div>}>
            <ul className={styles.selectList}>
              {[...(new Set(this.props.accumulators.map(Accumulator => Accumulator.vendor)))].map((vendor, i) =>
                <li key={`vendor_${i}`}>
                  <a href='#' onClick={this.filterClickHandler({ vendor })}>{vendor}</a>
                </li>
              )}
            </ul>
          </Popover>
          <Popover trigger={<div className={styles.filter}>Date</div>}>
            <div className='text-center p-a-1'>
              <div className={`${styles.dateHeader} row`}>
                <div className='col-xs-6'>From</div>
                <div className='col-xs-6'>Thru</div>
              </div>
              {dateRanges.map((dates, i) =>
                <div className={`${styles.dateRow} row`} key={`date_range_${i}`}>
                  <div className={`${this.state.filters.startDate === dates[0].date && styles.active || ''} col-xs-6`}>
                    <a href='#' onClick={this.filterClickHandler({ startDate: dates[0].date })}>{dates[0].display}</a>
                  </div>
                  <div className={`${this.state.filters.endDate === dates[1].date && styles.active || ''} col-xs-6`}>
                    <a href='#' onClick={this.filterClickHandler({ endDate: dates[1].date })}>{dates[1].display}</a>
                  </div>
                </div>
              )}
            </div>
          </Popover>
          <Popover trigger={<div className={styles.filter}><i className='fa fa-usd' /></div>}>
            <div className='p-a-1'>
              <div className='form-group'>
                <label htmlFor='fromAmount'>From</label>
                <input
                  type='number'
                  className='form-control'
                  value={this.state.filters.startAmount}
                  onChange={this.filterInputHandler('startAmount')}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='fromAmount'>To</label>
                <input
                  type='number'
                  className='form-control'
                  value={this.state.filters.endAmount}
                  onChange={this.filterInputHandler('endAmount')}
                />
              </div>
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    accumulators: state.accumulators,
    memberId: ownProps.params.memberId,
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    pushState: push,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccumulatorsContainer);
