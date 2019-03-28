import React from 'react'
import CampaignsList from './components/CampaignsList'
import AddCampaign from './components/AddCampaign'
import EditCampaign from './components/EditCampaign'
import {Route , Switch} from 'react-router-dom'


const Campaigns = () => {
  return(
  	<Switch>
  		<Route path="/dashboard/campaigns/campaignsList" component={CampaignsList} />
			<Route path="/dashboard/campaigns/addCampaign" component={AddCampaign} />
			<Route path="/dashboard/campaigns/editCampaign/:id" component={EditCampaign} />
		</Switch>	
  	)
}
export default Campaigns;