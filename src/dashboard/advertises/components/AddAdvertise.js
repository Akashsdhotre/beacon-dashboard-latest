import React from 'react'
import Advertise from './Advertise'

class AddAdvertise extends React.Component{
	constructor(props){
		super()

	}


	render(){
		return(

			<div>
				<div className="navigation"><h4>Create Advertise</h4></div><br/><br/>
				<div className="row">
				<div className="col-md-2"></div>
					<div className="col-md-8">
						<Advertise />
					</div>

					<div className="col-md-2"></div>
				</div>

			</div>	
		)
	}
}

export default AddAdvertise;