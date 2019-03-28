import React from 'react'
import BeaconList from './components/BeaconsList'
import AddBeacon from './components/AddBeacon'
import {Route , Switch} from 'react-router-dom'

const Beacons = () => {
  return(
  	<Switch>
  		<Route path="/dashboard/beacons/beaconsList" component={BeaconList} />
			<Route path="/dashboard/beacons/addBeacon" component={AddBeacon} />
		</Switch>	
  	)
}
export default Beacons;