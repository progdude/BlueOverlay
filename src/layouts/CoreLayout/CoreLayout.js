import React from 'react';
import Header from '../../components/Header';
import ScratchPad from '../../components/ScratchPad';
import classes from './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className=''>
    <Header />
    <ScratchPad />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
