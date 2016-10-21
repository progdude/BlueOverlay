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