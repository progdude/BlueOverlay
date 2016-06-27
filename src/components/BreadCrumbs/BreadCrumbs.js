import React, { Component, PropTypes} from 'react';
import classes from './BreadCrumbs.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as nodeActions from '../../store/syncReducers/nodes';

class BreadCrumbs extends Component {
  static propTypes = {
    location: PropTypes.string,
  };

  render () {
    let path = '';
    return (
      <div className={classes.container}>
        <ul className='list-unstyled list-inline'>
          {this.props.location.split('/').filter(item => !!item).map((breadCrumb, index) => {
            path = `${path}/${breadCrumb}`;
            return (
              <li key={`${breadCrumb}_${index}`}>
                {index > 0 &&
                  <span className={classes.connector}>
                    <span className={classes.left} />
                    <span className={classes.line} />
                    <span className={classes.right} />
                  </span>}
                <Link to={path}>{index === 0 ? 'Home' : decodeURI(breadCrumb.replace(/-/g, ' '))}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
    ({ router: { locationBeforeTransitions: {pathname} } }) => ({ location: pathname }),
    dispatch => ({
      routerActions: bindActionCreators(routerActions, dispatch),
      nodeActions: bindActionCreators(nodeActions, dispatch),
    })
  )(BreadCrumbs);
