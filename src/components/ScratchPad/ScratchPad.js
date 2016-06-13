import React from 'react';
import classes from './ScratchPad.scss';
import TextareaAutosize from 'react-textarea-autosize';

export const Header = () => (
  <div className={classes.container}>
    <div className={classes.header}>
      Scratch Pad
    </div>
    <TextareaAutosize minRows={1} maxRows={6} className={classes.textarea} />
    <div className={classes.footer}>
      Recap
    </div>
  </div>
);

export default Header;
