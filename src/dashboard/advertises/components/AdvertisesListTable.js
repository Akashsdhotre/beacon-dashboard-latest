import React from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { withRouter } from "react-router";
import { Button } from 'react-bootstrap';
// import EditAdvertise from './EditAdvertise'



class AdvertisesListTable extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			requiredItem: 0,
			show: false
		}

  	this.fetchData = this.fetchData.bind(this)


  	this.handleShow = this.handleShow.bind(this);
  

    this.beaconName = React.createRef();
    this.beaconPlace = React.createRef();

	}



	fetchData(){
		const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");

		fetch('https://beacon-appl.herokuapp.com/advertisementsList', {
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
		  console.log(responseJson)
		  this.setState({
		  	data: responseJson.data
		  })

		  }
		  else{
				alert(responseJson.message)
		  }
		})
		.catch((error) => {
		  alert("Internal server error..")
		});

	}


	componentDidMount(){
		this.fetchData()
	}



  handleShow(id) {

  	console.log("advertisementId= ",id)

		// localStorage.setItem("advertisementId", id)

  	// console.log("storage id= ",localStorage.getItem("advertisementId"))

  	this.props.history.push(`/dashboard/advertises/editAdvertise/${id}`);


  }





	render(){


		const columns = [


			{
				Header: "Advertisement Title",
				accessor: "advertisementTitle",
				
				style: {
					textAlign: "center"
				},
				sortable: false
				// filterable: false
			},


			{
				Header: "Campaign Title",
				id: "campaignTitle",
				accessor: d =>{
					if(d.campaignTitle.length === 0){
					return ""
					}
					else{

						var txt = "";

						d.campaignTitle.forEach(myFunction);
						console.log("txt",txt)
						return <span dangerouslySetInnerHTML={{__html: txt}}/>

						function myFunction(value, index, array) {
							
							if(d.campaignTitle.length-1 === index){

								txt = txt + value.campaignTitle; 
								
							}
							else{
						  	txt = txt + value.campaignTitle + "<hr/> "; 

							}

						}
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
						<Button variant="primary" onClick={() =>this.handleShow(props.original.advertisementId)}>
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
					defaultPageSize={5}
				>

				</ReactTable>



			</div>
		)
	}
}

export default withRouter(AdvertisesListTable);