import React,{Component} from 'react';
import { Link } from 'react-router';
import classes from './Header.scss';

export class Header extends React.Component {


  _open =(parameter) =>{
    document.getElementById("myNav").style.height = "100%";
  };

  _close =(parameter) =>{
    document.getElementById("myNav").style.height = "0%";
  };

  render() {
    return(
      <div>
      <div id="myNav" className={classes.overlay}>
  <a  className={classes.closebtn} onClick={this._close}>×</a>
  <div class="overlay-content">
<img src="/images/icons/top.png" className={classes.topovers}/>
  </div>
</div>
  <div className={classes.header} onClick={this._open}>
    <Link to='/member' className={classes.headerBtn}>
      <img src='/images/icons/home.png' />
    </Link>
    <Link to='/member' className={classes.headerBtn}>
      <img src='/images/icons/log-off.png' />
    </Link>
    <Link to='/member' className={classes.headerAvatar}>
      <img src='/images/temp/lando.jpg' />
    </Link>
  </div>
  </div>
  );
}



};




export default Header;
