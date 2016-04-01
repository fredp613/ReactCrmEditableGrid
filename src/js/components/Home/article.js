import React from "react";

export default class Article extends React.Component {
	render() {
		return (
			<div>
				<h2>
	              <a href="#">{this.props.title}</a>
	             </h2>
	            <p class="lead">
	                by <a href="#">{this.props.testTitle}</a>
	            </p>
	            <p><span class="glyphicon glyphicon-time"></span> Posted on August 28, 2013 at 10:00 PM</p>
	            <hr></hr>
	            <img class="img-responsive" src="http://placehold.it/900x300" alt="" />
	            <hr/>
	            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.</p>
	            <a class="btn btn-primary" href="#">Read More <span class="glyphicon glyphicon-chevron-right"></span></a>

	            <hr></hr>
            </div>


		);
	}

}