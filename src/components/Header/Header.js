import React,{Component} from 'react';
import { Link } from 'react-router';
import classes from './Header.scss';
import Hammer from 'react-hammerjs';

export class Header extends React.Component {


  _open =(parameter) =>{
    document.getElementById("myNav").style.height = "100%";
  };

  _close =(parameter) =>{
    document.getElementById("myNav").style.height = "0%";
  };

    _slide =(parameter) =>{
    document.getElementsByClassName("reveal-top")[0].style.left = "-100%";
  };

      _slideBack =(parameter) =>{
    document.getElementsByClassName("reveal-top")[0].style.left = "0%";
  };

      _tap =(parameter) =>{
    window.location = "http://randomexample.surge.sh/";
  };



      _otherSlide =(parameter) =>{
        console.log("adasfd");
    document.getElementsByClassName("reveal-top")[0].style.left = "+100%";
    document.getElementsByClassName("reveal-content")[0].style.left = "+100%";
  };


  render() {
    return(
      
      <div>
      <div id="myNav" className={classes.overlay}>
  <Hammer onClick={this._close}><a  className={classes.closebtn}>×</a></Hammer>
  <div class="overlay-content">
<img src="/images/icons/top.png" className={classes.topovers}/>


<div className={classes.ex}>

<div className="box-slide">
<Hammer onSwipe={this._slideBack} onTap={this._tap} direction="DIRECTION_RIGHT">
<div className="reveal-content under"><h1>START WORK</h1></div>
</Hammer>


<Hammer onSwipe={this._otherSlide} direction="RIGHT">
<Hammer onSwipe={this._slide} direction="DIRECTION_LEFT">
<div className="reveal-top">
<div className="reveal-content caption">
<h1 className={classes.ones}>Hover Me</h1>
</div>
</div>
</Hammer>
</Hammer>

</div>

</div>


  </div>
</div>
<Hammer onSwipe={this._open}>
  <div className={classes.header}>
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
  </Hammer>
  </div>

  );
}



};




export default Header;
