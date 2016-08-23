import React,{Component} from 'react';
import classes from './ScratchPad.scss';
import TextareaAutosize from 'react-textarea-autosize';

export class ScratchPad extends React.Component{

  _open =(parameter) =>{
    document.getElementById("bottomNav").style.height = "40%";
  };

  _close =(parameter) =>{
    document.getElementById("bottomNav").style.height = "0%";
  };


  render(){
return (
	<div>
     <div id="bottomNav" className={classes.over}>
  <a  className={classes.closebtn} onClick={this._close}>&times;</a>
  <div class="overlay-content">
<img src='/images/icons/bottom.png' className={classes.overs}/>
  </div>
</div>
  <div className={classes.container} onClick={this._open}>
    <div className={classes.header}>
      Scratch Pad
    </div>
    <TextareaAutosize minRows={1} maxRows={6} className={classes.textarea} />
    <div className={classes.footer}>
      Recap
    </div>
  </div>
  </div>
  );
}
};

export default ScratchPad;
