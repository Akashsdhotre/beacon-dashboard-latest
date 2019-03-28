import React from 'react'
import AdvertisesListTable from './AdvertisesListTable'

class AdvertisesList extends React.Component{
	constructor(props){
		super()

		this.handleClick = this.handleClick.bind(this)
	}



	handleClick(){
		console.log("clicked",this.props)
		// console.log("data=",dataSet)
		this.props.history.push('/dashboard/advertises/addAdvertise');
	}

	render(){
		return(
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="navigation"><h4>Advertises</h4></div>
						<button className="btn btn-primary add-Button-Decor"
						 onClick={this.handleClick}>Add Advertise</button>			
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 table-style">
					<AdvertisesListTable/>
					</div>
				</div>
			</div>
		)
	}
}

export default AdvertisesList;