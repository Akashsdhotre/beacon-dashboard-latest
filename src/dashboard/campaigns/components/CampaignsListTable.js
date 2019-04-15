import React from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'
// import axios from 'axios'
// import moment from 'moment'
import { withRouter } from "react-router";
import { Button } from 'react-bootstrap';


class CampaignsListTable extends React.Component{
	constructor(props){
		super()
		this.state = {
			data: [],
			requiredItem: 0,
			show: false
		}

  	this.fetchData = this.fetchData.bind(this)
  	this.handleShow = this.handleShow.bind(this);


	}

	componentDidMount(){
		this.fetchData()
		// console.log(moment("2019-02-01T11:00:00.000Z").format('MM/DD/YYYY'));
		var str = "2019-02-01T11:00:00.000Z";
		var res = str.split("T");
		var res1 = res[1].split(":");
		console.log(res1[0]+":"+res1[1]);
		// var mydate = new Date('18:00:00.000Z');
		// console.log("TIME==",moment('18:00:00.000Z').format('LT'))
	}



	fetchData(){
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
		  console.log(responseJson)
		  if(responseJson.success === true){
		  this.setState({
		  	data: responseJson.data
		  })

		  }
		  else{
				alert("campaign data not found")
		  }
		})
		.catch((error) => {
			console.error(error)
		  alert("Internal server error..")
		});

	}



  handleShow(id) {

  	console.log("campaignid",id)

  	this.props.history.push(`/dashboard/campaigns/editCampaign/${id}`);

  }




	render(){

		const columns = [
			{
				Header: "Campaign Name",
				accessor: "campaignTitle",
				style: {
					textAlign: "center"
				}
			},

			{
				Header: "Advertise Name",
				accessor: "advertisementTitle",
				style: {
					textAlign: "center"
				}

			},

			{
				Header: "Beacon Name",
				id: "beaconName",
				accessor: d =>{
					if(d.name.length === 0){
					return ""
					}
					else{

						var txt = "";

						d.name.forEach(myFunction);
						console.log("txt",txt)
						return <span dangerouslySetInnerHTML={{__html: txt}}/>

						function myFunction(value, index, array) {
							
							if(d.name.length-1 === index){

								txt = txt + value.name; 
								
							}
							else{
						  	txt = txt + value.name + "<hr/> ";                                         

							}

						}
					}
				},
				style: {
					textAlign: "center"
				}
			},

			{
				Header: "Start Date",
				accessor: "startDate",
				style: {
					textAlign: "center"
				}
			},

			{
				Header: "End Date",
				accessor: "endDate",
				style: {
					textAlign: "center"
				}

			},

			{
				Header: "Actions",
				Cell: props =>{

					return(
					<div>	
						<Button variant="primary" onClick={() =>this.handleShow(props.original.campaignId)}>
						<i className='fa fa-edit'></i>
						</Button>
  
					</div>
  
						)
				},
				sortable: false,
				filterable: false,
				width: 100,
				maxWidth: 100,
				minWidth:100,
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
					defaultPageSize={5}>

				</ReactTable>



			</div>
		)
	}
}

export default withRouter(CampaignsListTable);