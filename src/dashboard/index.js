import React from "react"
// import { findDOMNode } from 'react-dom'
import {Route} from 'react-router-dom'
import { NavLink } from "react-router-dom"
import Beacons from './beacons/index'
import Advertises from './advertises/index'
import Campaigns from './campaigns/index'
import './dashboard.scss'
import {ButtonGroup,Dropdown} from 'react-bootstrap';

class Dashboard extends React.Component {

	constructor(props){
		super(props)

		this.handleItemClick = this.handleItemClick.bind(this)
	}

  handleItemClick(){

  	console.log("logout")
  	const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");
		

  	fetch('https://beacon-appl.herokuapp.com/logout', {
			method: 'POST',
			headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			id: id,
			token: token,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
		  console.log(responseJson)
		  if(responseJson.success === true){

		  	localStorage.setItem("token", "")
		  	localStorage.setItem("id", "")

		  	this.props.history.push('/login');

	  	
		  }
		  else{
				alert(responseJson.message)
		  }
		})
		.catch((error) => {
		  console.error("error",error);
		  alert("Internal server error..")
		});
  	
  
  }




	render(){

		return(

			<div className="container-fluid" id="dashboard">
				<div className="row">
					<div className="col-md-2" >
							<aside id="sidebar">
								<section id="profile">
									<img src={`${process.env.PUBLIC_URL}/profile.png`} className="logoDecor rounded-circle" alt="logo"/><br/>

										<Dropdown as={ButtonGroup}>
										  <label className="split-label-decor">{localStorage.getItem("email")}</label>

										  <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

										  <Dropdown.Menu>
										    <Dropdown.Item hred="#/action-1" onClick={this.handleItemClick}>Log Out</Dropdown.Item>
										  </Dropdown.Menu>
										</Dropdown>
  
								</section>

								<nav>
									<ul>
										<li>
											<NavLink to="/dashboard/beacons/beaconsList">
											  <span><i className="fas fa-assistive-listening-systems"></i></span>
												<span>Beacons</span>
											</NavLink>
										</li>
										<li>
											<NavLink to="/dashboard/advertises/advertisesList">
												<span><i className="fas fa-audio-description"></i></span>
												<span>Advertisements</span>
											</NavLink>
										</li>
										<li>
											<NavLink to="/dashboard/campaigns/campaignsList">
												<span><i className="fa fa-bar-chart"></i></span>
												<span>Campaigns</span>
											</NavLink>
										</li>
						
									</ul>
								</nav>

							
							</aside>
					</div>
					<div className="col-md-10">
							<main id="main">
							  
								<Route path="/dashboard/beacons" component={Beacons} />
								<Route path="/dashboard/advertises" component={Advertises} />
								<Route path="/dashboard/campaigns" component={Campaigns} />
								
							</main>
					</div>
				</div>
			</div>


			)
	}
}

export default Dashboard;