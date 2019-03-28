import React from 'react'
import AdvertisesList from './components/AdvertisesList'
import AddAdvertise from './components/AddAdvertise'
import EditAdvertise from './components/EditAdvertise'
import {Route , Switch} from 'react-router-dom'

const Advertises = () => {
  return(
  	<Switch>
  		<Route path="/dashboard/advertises/advertisesList" component={AdvertisesList} />
			<Route path="/dashboard/advertises/addAdvertise" component={AddAdvertise} />
			<Route path="/dashboard/advertises/editAdvertise/:id" component={EditAdvertise} />
		</Switch>	
  	)
}
export default Advertises;