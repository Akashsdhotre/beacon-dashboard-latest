import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Option from './Option';
import moment from 'moment';

class EditCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	advertiseData:[],
			campaignTitle:"",
			advertiseId: "",
			startDate: "",
			endDate: "",
			startTime: "",
			endTime: "",
			allDays: false,
			monday: false,
			tuesday: false,
			wednesday: false,
			thursday: false,
			friday: false,
			saturday: false,
			sunday: false,
			weekDays:[],
			checkedName:"",
			gender: "",
			minAge: "",
			maxAge: ""


		}
    this.fetchData = this.fetchData.bind(this);
    this.fetchAdvertiseData = this.fetchAdvertiseData.bind(this);
    this.setDays = this.setDays.bind(this)
    
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount(){

  	console.log("campaignId in edit",this.props.match.params.id)
    this.fetchData()
    this.fetchAdvertiseData()
    this.setDays()
  }

  fetchData() {

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const campaignId = this.props.match.params.id;

    console.log("campaignId",campaignId)

    fetch('https://beacon-appl.herokuapp.com/campaignDetails', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      id: id,
      token: token,
      campaignId: campaignId
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("edit campaign Response",responseJson)

      if(responseJson.success === true){

        console.log(responseJson)
        var days = responseJson.data[0].schedule.daysOfWeek
        console.log("days",days)

        for(var i=0;i<days.length;i++) {
  				if(days[i] === "monday"){
  					this.setState({monday: true})
  				}
  				else if(days[i] === "tuesday"){
  					this.setState({tuesday: true})
  				}
  				else if(days[i] === "wednesday"){
  					this.setState({wednesday: true})
  				}
  				else if(days[i] === "thursday"){
  					this.setState({thursday: true})
  				}
  				else if(days[i] === "friday"){
  					this.setState({friday: true})
  				}
  				else if(days[i] === "saturday"){
  					this.setState({saturday: true})
  				}
  				else{
  					this.setState({sunday: true})
  				}
				}

        this.setState({
         
          startTime: moment(responseJson.data[0].schedule.startTime).format('HH:mm').toString(),
          endTime: moment(responseJson.data[0].schedule.endTime).format('HH:mm').toString(),
          startDate: moment(responseJson.data[0].schedule.startDate).format('YYYY-MM-DD').toString(),
          endDate: moment(responseJson.data[0].schedule.endDate).format('YYYY-MM-DD').toString(),

          minAge:responseJson.data[0].targetAge.minage,
          maxAge:responseJson.data[0].targetAge.maxage,
          campaignTitle:responseJson.data[0].campaignTitle,
          gender:responseJson.data[0].gender
        });

      }
      else{
        alert("edit campaign not done..")
      }
    })
    .catch((error) => {
      alert("Internal server error fetch..")
    });

  }

  fetchAdvertiseData(){
		const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");

		// axios.get('https://jsonplaceholder.typicode.com/posts')

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
		  	advertiseData: responseJson.data
		  })

		  }
		  else{
				alert("Advertisement data not found")
		  }
		})
		.catch((error) => {
			console.error(error)
		  alert("Internal server error..")
		});
	}

	setDays(){
		console.log("weekdays in setDays",this.state.weekDays)
	}

handleChange(event){

		const {name, value, type, checked} = event.target

    type === "checkbox" ? this.setState({ [name]: checked , checkedName: name }) : this.setState({ [name]: value.toString()})

	}

	handleSubmit(e){
		console.log("e",e)
		e.preventDefault();
		console.log("clicked")
		console.log("value",this.state)
		console.log("id",this.state.advertiseId);
		const {campaignTitle,advertiseId,startDate,endDate,startTime,endTime,gender,minAge,maxAge,checkedName} = this.state
		const {allDays,monday,tuesday,wednesday,thursday,friday,saturday,sunday} = this.state
		const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");
		const campaignId = this.props.match.params.id;

		var sDate = moment(startDate).format('DD-MM-YYYY').toString()
		var eDate = moment(endDate).format('DD-MM-YYYY').toString()

		var weekDays = []

		if(allDays===true){
			weekDays.push("alldays")
		}
		if(monday===true){
			weekDays.push("monday")
		}
		if(tuesday===true){
			weekDays.push("tuesday")
		}
		if(wednesday===true){
			weekDays.push("wednesday")
		}
		if(thursday===true){
			weekDays.push("thursday")
		}
		if(friday===true){
			weekDays.push("friday")
		}
		if(saturday===true){
			weekDays.push("saturday")
		}
		if(sunday===true){
			weekDays.push("sunday")
		}

		console.log("id",id)
		console.log("token",token)
		console.log("weekDays",weekDays)
		console.log("campaignTitle",campaignTitle)
		console.log("advertiseId",advertiseId)
		console.log("startDate",sDate)
		console.log("endDate",eDate)
		console.log("startTime",startTime)
		console.log("endTime",endTime)
		console.log("gender",gender)
		console.log("minAge",minAge)
		console.log("maxAge",maxAge)
		console.log("checkedName",checkedName)


		if (gender === "") {

				alert("something missing...")
				
		}
		else{
			console.log("ready for api call")

			fetch('https://beacon-appl.herokuapp.com/update_campaign', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id:id,
					advertisementId: advertiseId,
					campaignId:campaignId,
					campaignTitle: campaignTitle,
					startTime: startTime,
					endTime: endTime,
					startDate:sDate,
					endDate:eDate,
					daysOfWeek:weekDays,
					gender:gender,
					minage:minAge,
					maxage:maxAge,
					status:"",
					beaconId:"",
					token:token
				}),
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson)	
				if(responseJson.success === true){
					alert("Campaign Updated..")
					// this.props.history.push('/dashboard/campaigns/campaignsList')
				}

			})
			.catch((error) => {
			console.error("Error=",error)
		  alert("Internal server error..")
			});

		}
	}

  render() {

  	console.log("Edit campaign Data",this.state)
  	const { advertiseData } = this.state

		console.log("in render",advertiseData)

		const advertises = advertiseData.map(item => <Option key={item.advertisementId} item={item} />)

  

    return (

      <div>
				<div className="navigation"><h4>Update Campaign</h4></div><br/><br/>
				<div className="row">
					<div className="col-3"></div>
					<div className="col-md-6">

						<form>

							<div className="form-group">
						    <label className="font-weight-bold">Campaign Title:</label>
						    <input type="text" className="form-control"
						      name="campaignTitle" onChange={this.handleChange} value={this.state.campaignTitle} required/>
						  </div>

							<div className="form-group">
						    <label className="font-weight-bold">Advertisment Title:</label>
						    <div>
						       <select 
								  	className="advertiseSelectDecor"
                    value={this.state.advertiseId}
                    onChange={this.handleChange}
                    name="advertiseId">
                    <option value="">select Advertise...</option>

                		{advertises}

                	</select>	

						    </div>
						  </div>

						  <div className="form-group">
						    <label className="font-weight-bold">Schedule Date:</label>
						    <div className="form-inline">
						      <input type="date" className="form-control"
						      name="startDate" onChange={this.handleChange} value={this.state.startDate} required/>
						       <label className="labelDecor font-weight-bold ">to</label>
						      <input type="date" className="form-control"
						      name="endDate" onChange={this.handleChange} value={this.state.endDate} required/>
						    </div>
						  </div>

						 	<div className="form-group">
						    <label className="font-weight-bold">Schedule Time:</label>
						    <div className="form-inline">
						      <input type="time" className="form-control"
						      name="startTime" onChange={this.handleChange} value={this.state.startTime} required/>
						      <label className="labelDecor font-weight-bold">to</label>
						      <input type="time" className="form-control"
						      name="endTime" onChange={this.handleChange} value={this.state.endTime} required/>
						    </div>
						  </div>

							<div className="form-group">
						    <label className="font-weight-bold" htmlFor="schedule-days">Schedule Days:</label>
						    <div className="col-sm-10 form-inline">

						      <input type="checkbox"
						      name="allDays" onChange={this.handleChange} checked={this.state.allDays}/>
						      <label className="labelDecor">All Days</label>

						      <input type="checkbox"
						      name="monday" onChange={this.handleChange} 
						      checked={this.state.allDays ? false : this.state.monday}
						      disabled={this.state.allDays ? true : false}
						      />
						      <label className="labelDecor">Mo</label>

						      <input type="checkbox"
						      name="tuesday" onChange={this.handleChange}
						      checked={this.state.allDays ? false : this.state.tuesday}
						      disabled={this.state.allDays ? true : false}/>
						      <label className="labelDecor">Tu</label>

						      <input type="checkbox" 
						      name="wednesday" onChange={this.handleChange} 
						      checked={this.state.allDays ? false : this.state.wednesday}
						      disabled={this.state.allDays ? true : false}/>
						      <label className="labelDecor">We</label>

						      <input type="checkbox"
						      name="thursday" onChange={this.handleChange} 
						      checked={this.state.allDays ? false : this.state.thursday}
						      disabled={this.state.allDays ? true : false} />
						      <label className="labelDecor">Th</label>

						      <input type="checkbox" 
						      name="friday" onChange={this.handleChange} 
						      checked={this.state.allDays ? false : this.state.friday} 
						      disabled={this.state.allDays ? true : false}/>
						      <label className="labelDecor">Fr</label>

						      <input type="checkbox"
						      name="saturday" onChange={this.handleChange} 
						      checked={this.state.allDays ? false : this.state.saturday}  
						      disabled={this.state.allDays ? true : false}/>
						      <label className="labelDecor">Sa</label>

						      <input type="checkbox" 
						      name="sunday" onChange={this.handleChange} 
						      checked={this.state.allDays ? false : this.state.sunday} 
						      disabled={this.state.allDays ? true : false}/>
						      <label className="labelDecor">Su</label>


						    </div>
						  </div>

						  <div className="form-group">
						    <label className="font-weight-bold">Gender:</label>
						    <div className="col-sm-10 form-inline">

						      <input type="radio"
						       name="gender" onChange={this.handleChange} value="any"
						       checked={this.state.gender === "any"} />
						      <label className="labelDecor">Any</label>

						      <input type="radio"
						       name="gender" onChange={this.handleChange} value="male"
						       checked={this.state.gender === "male"} />
						      <label className="labelDecor">Male</label>

						      <input type="radio"
						       name="gender" onChange={this.handleChange} value="female"
						       checked={this.state.gender === "female"} />
						      <label className="labelDecor">Female</label>

						    </div>
						  </div>

							<div className="form-group">
						    <label className="font-weight-bold" htmlFor="schedule-time">Age Group:</label>
						    <div className="col-sm-10 form-inline">
						      <input type="number" className="form-control"
						      name="minAge" onChange={this.handleChange} value={this.state.minAge} required/>
						      <label className="labelDecor font-weight-bold">to</label>
						      <input type="number" className="form-control"
						      name="maxAge" onChange={this.handleChange} value={this.state.maxAge} required/>
						    </div>
						  </div>
						  <br/><br/>
						  <div className="form-group"> 
						    <div className="col-sm-offset-2 col-sm-10">
						      <button type="submit" onClick={(e) => this.handleSubmit(e)} className="btn btn-primary btn-decor">Update</button>
						    </div>
						  </div>
						</form>
								
					</div>
					<div className="col-md-3"></div>
				</div>

			</div>	
          
    );
  }
}



export default EditCampaign;
