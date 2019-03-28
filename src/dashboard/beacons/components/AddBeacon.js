import React from 'react'

class AddBeacon extends React.Component{
	constructor(props){
		super()

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		console.log("clicked")
		this.props.history.push('/dashboard/beacons/beaconsList');
	}
	render(){
		return(

			<div>
				<div className="row">
					<div className="col-md-6">
						<div className="navigation"><h4>Add Beacon</h4></div>
						<button className="btn btn-primary add-Button-Decor" onClick={this.handleClick}>Submit</button>			
					</div>
				</div>
				

			</div>	
		)
	}
}

export default AddBeacon;