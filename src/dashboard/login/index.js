import React from "react"
import axios from 'axios'


class Login extends React.Component {
	
	constructor(props){
		super(props)

		this.state = {
			u_username : "",
			u_password : ""
		}

		this.username = React.createRef();
		this.password = React.createRef();
		// this.isChecked = React.createRef();

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

	}

	handleChange(e){
		const {name,value} = e.target
		this.setState({
			[name] : value
		})
	}

	handleSubmit(e) {
		e.preventDefault();

		let user = this.username.current.value
		let password = this.password.current.value
		// let isChecked = this.isChecked.current.value

	 document.getElementById("cover-spin").style.display = "block";


		// axios({
		// 	url: 'https://beacon-appl.herokuapp.com/login',
		// 	method: 'POST',
		// 	headers: {
		// 	Accept: 'application/json',
		// 	'Content-Type': 'application/json',
		// 	},
		// 	data: JSON.stringify({
		// 	email: user,
		// 	password: password,
		// 	}),
		// })
		// .then(function(response){
		//   console.log(response.data)
		//   if(response.data.success === true){


		//   	localStorage.setItem("email", user)
		//   	localStorage.setItem("password", password)
		//   	localStorage.setItem("token", response.data.data.token)
		//   	localStorage.setItem("id", response.data.data.id)


		//   	console.log(localStorage.getItem("email"))
		//   	console.log(localStorage.getItem("password"))
		//   	console.log(localStorage.getItem("token"))
		//   	console.log(localStorage.getItem("id"))

		// 	  document.getElementById("cover-spin").style.display = "none";
		// 	  // this.props.history.push('/dashboard/beacons/beaconsList');		
		// 	  console.log(this.props)  	
		//   }
		//   else{
		//   	document.getElementById("cover-spin").style.display = "none";
		// 	  alert("Wrong Credentials..")
		//   }
		// })
		// .catch((error) => {
		//   console.error("error",error);
		//   document.getElementById("cover-spin").style.display = "none";
		//   alert("Internal server error..")
		// });


		
		fetch('https://beacon-appl.herokuapp.com/login', {
			method: 'POST',
			headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			email: user,
			password: password,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
		  console.log(responseJson)
		  if(responseJson.success === true){


		  	localStorage.setItem("email", user)
		  	localStorage.setItem("password", password)
		  	localStorage.setItem("token", responseJson.data.token)
		  	localStorage.setItem("id", responseJson.data.id)


		  	console.log(localStorage.getItem("email"))
		  	console.log(localStorage.getItem("password"))
		  	console.log(localStorage.getItem("token"))
		  	console.log(localStorage.getItem("id"))

			  document.getElementById("cover-spin").style.display = "none";
			  this.props.history.push('/dashboard/beacons/beaconsList');		  	
		  }
		  else{
		  	document.getElementById("cover-spin").style.display = "none";
			  alert("Wrong Credentials..")
		  }
		})
		.catch((error) => {
		  console.error("error",error);
		  document.getElementById("cover-spin").style.display = "none";
		  alert("Internal server error..")
		});


	}


render(){
	return(
		
		<section className="container-fluid login-page">
			<section className="row justifyContentCenter">
				<section className="col-12 col-sm-6 col-md-3">
          <div id="cover-spin"></div>
				  <form className="form-container" onSubmit={this.handleSubmit}>
				  	<h3 className="text-center font-weight-bold">Login</h3>
					  <div className="form-group">
					    <input type="email" className="form-control" placeholder="Enter email"
					    name="u_username"
				     onChange = {this.handleChange} value={this.state.username}
				     ref={this.username}/>
					  </div>
					  <div className="form-group">
					    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
					    name="u_password"
				     onChange = {this.handleChange} value={this.state.password}
				     ref={this.password}/>
					  </div>
					  <div className="form-group form-check">
					    <input type="checkbox" className="form-check-input"/>
					    <label className="check-label-decor">Remember me</label>
					  </div>
					  <button type="submit" className="btn btn-primary btn-block">Submit</button>
					</form>

				</section>
			</section>
		</section>


			)
	
}
}

export default Login;