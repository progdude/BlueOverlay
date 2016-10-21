




    <Row className="showGrid">

        <Col xs={3} xsOffset={1}><input type="text" name="query" id="query" onKeyDown={this._search}/>
        <div id="results">Type in your question!</div>
        </Col>


        <Col xs={4}><img src="http://bav0.com/wp-content/uploads/sites/11/2014/06/pie-chart.png" id="pie-chart"/>
        <button className={classes.circularButton}><i className="fa fa-chrome fa-2x" aria-hidden="true"></i></button>
      <button className={classes.circularButton}><i className="fa fa-connectdevelop fa-2x" aria-hidden="true"></i></button>
        </Col>


        <Col xs={3}>
        <div id="calen_title">Upcoming Events</div>
        <hr/>

        <ul id="meetings">
            <li>Meeting at 3:50PM with Some dude who also works here</li>
            <li>Touchbase at Fountain to talk about Health Insurance</li>
        </ul>

        </Col>

    </Row>




       