import React, {
    Component
} from 'react';
import classes from './ScratchPad.scss';
import TextareaAutosize from 'react-textarea-autosize';
import Hammer from 'react-hammerjs';
import {
    Row,
    Col,
    Button,
    FieldGroup,
    form
} from 'react-bootstrap';











export class ScratchPad extends React.Component {

    _open = (parameter) => {
        console.log(document.getElementsByClassName("default"));
        document.getElementById("bottomNav").style.height = "40%";
    };

    _changeTheme = (parameter) => {
        var x = document.getElementsByClassName("default");

        for (var i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "#338D99";
        }
        document.body.style.backgroundImage = "url('/images/icons/halo_background.jpg')";
        document.getElementsByClassName("ScratchPad__footer___1zXoh")[0].style.backgroundColor = "#68444C";
        document.getElementsByClassName("ScratchPad__header___g9Vlp")[0].style.backgroundColor = "#6D6D6D";


    }


    _originalTheme = (parameter) => {
        var x = document.getElementsByClassName("default");

        for (var i = 0; i < x.length; i++) {
            x[i].style.backgroundColor = "#003265";
        }
        document.body.style.backgroundImage = "url('/images/bg.jpg')";
        document.getElementsByClassName("ScratchPad__footer___1zXoh")[0].style.backgroundColor = "#f7931e";
        document.getElementsByClassName("ScratchPad__header___g9Vlp")[0].style.backgroundColor = "#6d6d6d";


    }

    _changeBrightness = (parameter) => {
        document.getElementById("root").style.opacity = document.getElementById("brightness").value;
    }

    _changeSize = (parameter) =>{
        var x = document.getElementsByClassName("default");

        for(var i=0; i<x.length; i++){
          x[i].style.height=document.getElementById("size").value+"px";
          x[i].style.width=document.getElementById("size").value+"px";
        }
    }

    _close = (parameter) => {
        document.getElementById("bottomNav").style.height = "0%";
    };

    _search = (event) => {
        if(event.keyCode == 13){
            document.getElementById("results").innerHTML = "You haven't completed your Diamond Seibel Joint Request!"
         }

    }



    render() {


 var ranger = {
            width: '80%',
            margin: "0 auto"
        };

        var sevenButtons = {
            "margin-left": "0vw"
        }

        var threeButtons = {
            "margin-left": "8vw"
        }

        var twoButtons = {
            "margin-left": "11vw"
        }

        var themes = {
            "background-color": "#99999B",
            "color": "#fff"
        }


        return (
            <div>
     <div id="bottomNav" className={classes.over}>
  <a  className={classes.closebtn} onClick={this._close}>&times;</a>

  {/*<div class="overlay-content">

  <img src="/images/icons/bottom.png" className={classes.overs}/>
  </div>*/}

  <div class="overlay-content">





    <Row className="showGrid">

  <Col xs={4}>
  <button className={classes.themeBtn} onClick={this._originalTheme} styles={themes}>Original</button>
<button className={classes.themeBtn} onClick={this._changeTheme} styles={themes}>Star Wars</button>
{/*<form>
  <input type="radio"  value="original" onClick={this._changeTheme} /> Original<br/>
  <input type="radio"  value="starwars" onClick={this._changeTheme}/> Star Wars
</form>*/}

  </Col>
  <Col xs={4}>
    <div style={sevenButtons}>
      <button className={classes.circularButtonMain}>IMS</button>
      <button className={classes.circularButtonMain}>Quest</button>
      <button className={classes.circularButtonMain}>FEP</button>
      <button className={classes.circularButtonMain}>Rep</button>
      <button className={classes.circularButtonMain}>Diam.</button>
      <button className={classes.circularButtonMain}>Sapp.</button>
      <button className={classes.circularButtonMain}>Image</button>
    </div>
  </Col>
  <Col xs={4}>
  <div style={threeButtons}>
      <button className={classes.circularButton}><i className="fa fa-calendar fa-2x" aria-hidden="true"></i></button>
      <button className={classes.circularButton}><i className="fa fa-clock-o fa-2x" aria-hidden="true"></i></button>
      <button className={classes.circularButton}><i className="fa fa-cog fa-2x" aria-hidden="true"></i></button>
      </div>
  </Col>

</Row>


<Row className="showGrid">

  <Col xs={4}>
    <input style={ranger} type="range" name="points" min="0" max="1" step="0.1" id="brightness" onChange={this._changeBrightness}/>
  </Col>
  <Col xs={4}>
  <div style={twoButtons}>
      <button className={classes.circularButton}><i className="fa fa-chrome fa-2x" aria-hidden="true"></i></button>
      <button className={classes.circularButton}><i className="fa fa-connectdevelop fa-2x" aria-hidden="true"></i></button>
      </div>
  </Col>
  <Col xs={4}>
    <input style={ranger} type="range" name="points" id="size" min="100" max="200" step="10" onChange={this._changeSize}/>
  </Col>

</Row>










  </div>
</div>

<Hammer onSwipe={this._open}>
  <div className={classes.container}>
    <div className={classes.header}>
      Scratch Pad
    </div>
    <TextareaAutosize minRows={1} maxRows={6} className={classes.textarea} />
    <div className={classes.footer}>
      Recap
    </div>
  </div>
  </Hammer>
  </div>
        );
    }
};

export default ScratchPad;