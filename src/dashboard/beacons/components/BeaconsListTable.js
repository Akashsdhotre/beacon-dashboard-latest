import React from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'
// import axios from 'axios'

import Option from './Option'


import { Button , Modal} from 'react-bootstrap';



class BeaconsListTable extends React.Component{
	constructor(props){
		super()
		this.state = {
			data: [],
			campaignData: [],
			campaignId: "",
			requiredItem: 0,
			showEditModal: false,
			showAssignModal:false
		}

  	this.fetchData = this.fetchData.bind(this)
  	this.fetchCampaignData = this.fetchCampaignData.bind(this)

  	this.handleShowEdit = this.handleShowEdit.bind(this);
  	this.handleEditClose = this.handleEditClose.bind(this);
    this.saveEditChanges = this.saveEditChanges.bind(this);

  	this.handleShowAssign = this.handleShowAssign.bind(this);
    this.handleAssignClose = this.handleAssignClose.bind(this);
    this.saveAssignChanges = this.saveAssignChanges.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)


    this.beaconName = React.createRef();
    this.beaconPlace = React.createRef();

	}

	componentDidMount(){
		this.fetchData()
		this.fetchCampaignData()
	}


	fetchData(){

		const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");

		fetch('https://beacon-appl.herokuapp.com/beaconsList', {
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
		  if(responseJson.success === true){
		  console.log("beacons data",responseJson)
		  this.setState({
		  	data: responseJson.data
		  })

		  }
		  else{
				alert("Beacon data not found..")
		  }
		})
		.catch((error) => {
		  alert("Internal server error..")
		});

	}

  fetchCampaignData(){

  	const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");

  	fetch('https://beacon-appl.herokuapp.com/campaignsList', {
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
		  if(responseJson.success === true){
		  console.log("campaign data",responseJson)
		  this.setState({
		  	campaignData: responseJson.data
		  })

		  }
		  else{
				alert("Campaign data not found..")
		  }
		})
		.catch((error) => {
		  alert("Internal server error..")
		});

  }




	 // Edit beacon

  handleShowEdit(id) {

  	console.log("id",id)

  	const { data } = this.state

  	const index = data.findIndex(item =>{
  		return item.beaconId === id
  	})

  	console.log("index",index)

    this.setState({
     showEditModal: true,

     requiredItem: index
    });
  }

  saveEditChanges(){

  	const { data , requiredItem } = this.state;
    const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");


    console.log("beacon name",this.beaconName.current.value)
    console.log("beacon place",this.beaconPlace.current.value)
    console.log("beacon id",data[requiredItem].beaconId)


  	fetch('https://beacon-appl.herokuapp.com/update_beacon', {
			method: 'POST',
			headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			id: id,
			token: token,
			beaconId: data[requiredItem].beaconId,
			name:this.beaconName.current.value,
			place:this.beaconPlace.current.value
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
		  if(responseJson.success === true){
			  console.log("updated beacon",responseJson)
		  	this.fetchData()
			  
  	  	this.setState({ showEditModal: false });

		  }
		  else{
				alert("update beacon not done..")
		  }
		})
		.catch((error) => {
		  alert("Internal server error..")
		});

  }

  
  handleEditClose() {
    this.setState({ showEditModal: false });

  }



  // Assign beacon to campaign

  handleShowAssign(id) {

  	console.log(id);
  	const { data } = this.state;

  	const index = data.findIndex(item =>{
  		return item.beaconId === id
  	})

  	console.log("index",index)

    this.setState({
     showAssignModal: true, 
     requiredItem: index
    });


  }

  saveAssignChanges(){

  	const { data , requiredItem , campaignId } = this.state;
  	const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");

  	console.log("data",data);
  	console.log("requiredItem",requiredItem);
  	console.log("campaignId",campaignId);
  	console.log("beaconId",data[requiredItem].beaconId);

  	fetch('https://beacon-appl.herokuapp.com/assignBeacon', {
			method: 'POST',
			headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			id: id,
			token: token,
			campaignId: campaignId,
			beaconId: data[requiredItem].beaconId
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			console.log("Assign response",responseJson)

  	 	if(responseJson.success === true){
  	  this.setState({ showAssignModal: false });
  	  // this.props.history.push('/dashboard/beacons/beaconsList');	
  	  this.fetchData()

		  }
		  else{
				alert("Campaign data not found..")
		  }

		})
		.catch((error) => {
		  alert("campaign Internal  server error..")
		});

  	


  }

  
  handleAssignClose() {
    this.setState({ showAssignModal: false });

  }

  handleClick(id){
  	console.log("id",id)
  }

  handleChange(event){
  	console.log("changed")
  	const {name, value} = event.target
  	this.setState({ [name]: value })
  }


	render(){

		const { data , campaignData } = this.state;

		const item = data[this.state.requiredItem];

		// let campaigndata = [{name:"akash",id:1},{name:"akash",id:2},{name:"akash",id:3}]

		// const campaigns = campaignData.map(item => <Option key={item._id} item={item} handleClick={this.handleClick} />)
		const campaigns = campaignData.map(item => <Option key={item.campaignId} item={item} />)

		console.log("campaigns",campaigns);

		const columns = [

			{
				Header: "Beacon Name",
				accessor: "name",
				style: {
					textAlign: "center"
				},
				sortable: false,
				// filterable: false

			},
			{
				Header: "Beacon Place",
				accessor: "place",
				style: {
					textAlign: "center"
				},
				sortable: false,
				// filterable: false
			},

			{
				Header: "Campaign Title",
				id: "campaignTitle",
				accessor: d => {

					if(d.campaignTitle.length === 0){

					return ""
					}
					else{
						return d.campaignTitle[0].campaignTitle
					}
				},
				style: {
					textAlign: "center"
				}
			},

			{
				Header: "Actions",
				Cell: props =>{
					return(
					<div>	
						<Button variant="primary" onClick={() =>this.handleShowEdit(props.original.beaconId)}>
						<i className='fa fa-edit'></i></Button>


			        <Modal show={this.state.showEditModal} onHide={this.handleEditClose}>
			          <Modal.Header closeButton>
			            <Modal.Title>Edit Beacon</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
					        <form>
					        	<div className="form-group">
										  <label>Beacon Id: {item.beaconId}</label><br/>
										  
									  </div>

									  <div className="form-group">
									    <label>Beacon Name</label>
									    <input type="text" className="form-control" 
									     ref={this.beaconName} defaultValue={item.name}/>
									  </div>

									  <div className="form-group">
									    <label>Beacon Place:</label>
									    <input type="text" className="form-control"
									    ref={this.beaconPlace} defaultValue={item.place}/>
									  </div>
					
									</form>

			          </Modal.Body>
			          <Modal.Footer>
			            <Button variant="primary" onClick={this.handleEditClose}>Close</Button>
			            <Button variant="primary" onClick={this.saveEditChanges}>Save Changes</Button>
			          </Modal.Footer>
			        </Modal>


			      <Button variant="primary" className="btn-margin" onClick={() =>this.handleShowAssign(props.original.beaconId)}>
						Assign</Button>


			        <Modal show={this.state.showAssignModal} onHide={this.handleAssignClose}>
			          <Modal.Header closeButton>
			            <Modal.Title>Assign Campaign to Beacon</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			          	<label>Beacon Name: {item.name}</label><br/>

								  <select 
								  	className="campaignSelectDecor"
                    value={this.state.campaignId}
                    onChange={this.handleChange}
                    name="campaignId">
                    <option value="">select campaign...</option>

                		{campaigns}

                	</select>							  

			          </Modal.Body>
			          <Modal.Footer>
			            <Button variant="primary" onClick={this.handleAssignClose}>Close</Button>
			            <Button variant="primary" onClick={this.saveAssignChanges}>Save Changes</Button>
			          </Modal.Footer>
			        </Modal>
 

					  
					</div>
  
						)
				},
				sortable: false,
				filterable: false,
				style: {
					textAlign: "center"
				}


			}
		]

		return(
			<div>

				<ReactTable
					columns={columns}
					data={this.state.data}
					filterable
					noDataText={"Please wait..."}
					defaultPageSize={5}
				>

				</ReactTable>



			</div>
		)
	}
}

export default BeaconsListTable;