import React from 'react';
import { NavLink } from "react-router-dom"



const Home = () => {
  return(
  	<div>


			<nav className="navbar navbar-expand-sm nav-bg">
			
			  <a className="navbar-brand" href="/home">
			    <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logoDecor rounded-circle" alt="logo"/>
			  </a>
			  
			 
			  <ul className="navbar-nav">
			    <li className="nav-item">
			      <NavLink to="/home" className="nav-link">HOME</NavLink>
			    </li>
			    <li className="nav-item">
			      <NavLink to="/home" className="nav-link">ABOUT</NavLink>
			    </li>
			    <li className="nav-item">
			      <NavLink to="/home" className="nav-link">CONTACT US</NavLink>
			    </li>
			    <li className="nav-item">
			      <NavLink to="/login" className="nav-link">LOGIN</NavLink>
			    </li>
			  </ul>
			</nav>

			<section className="container-fluid login-page">
				<section className="row justifyContentCenter">
						<div className="justify-content-center">
						<img src={`${process.env.PUBLIC_URL}/logo.png`} className="BannerLogo" alt="logo"/>
						<h1>Welcome to Proximity Marketing Services</h1>
						</div>
				</section>
			</section>
	
		</div>

  	)
}

export default Home;