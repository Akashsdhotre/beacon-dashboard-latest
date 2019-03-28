import React from 'react'
// import dataSet from './data'
import BeaconsListTable from './BeaconsListTable'


class BeaconsList extends React.Component{
	constructor(props){
		super()

		this.handleClick = this.handleClick.bind(this)
	}




	handleClick(){
		console.log("clicked")
		// console.log("data=",dataSet)
		this.props.history.push('/dashboard/beacons/addBeacon');
	}

	render(){

		return(
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="navigation"><h4>Beacons</h4></div>
						<button className="btn btn-primary add-Button-Decor" onClick={this.handleClick}>Add Beacon</button>

					</div>
				</div>
				<div className="row">
					<div className="col-md-12 table-style">
					<BeaconsListTable />
					</div>
				</div>
			</div>
		)
	}
}

export default BeaconsList;