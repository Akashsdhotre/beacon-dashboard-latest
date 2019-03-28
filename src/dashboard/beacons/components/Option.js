import React from "react"


function Option(props) {

    return (
        /*{<ListGroup.Item action href="#link1"
                    onClick={ () => props.handleClick(props.item._id)}
                    >{props.item.advertisementName}</ListGroup.Item>} */
            <option value={props.item.campaignId}>
              {props.item.campaignTitle}
            </option>

    )
}

export default Option