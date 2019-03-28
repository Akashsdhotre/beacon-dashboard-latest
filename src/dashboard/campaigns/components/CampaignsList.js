import React from 'react'
// import dataSet from './data'
import CampaignsListTable from './CampaignsListTable'

class CampaignsList extends React.Component{
	constructor(props){
		super()

		this.handleClick = this.handleClick.bind(this)

	}



	handleClick(){
		console.log("clicked")
		// console.log("data=",dataSet)
		this.props.history.push('/dashboard/campaigns/addCampaign');
	}

	render(){
		return(
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="navigation"><h4>Campaigns</h4></div>
						<button className="btn btn-primary add-Button-Decor" onClick={this.handleClick}>Add Campaign</button>			
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 table-style">
					<CampaignsListTable/>
					</div>
				</div>
			</div>
		)
	}
}

export default CampaignsList;