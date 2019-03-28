import React from "react"

function Option(props) {

    return (
        /*{<ListGroup.Item action href="#link1"
                    onClick={ () => props.handleClick(props.item._id)}
                    >{props.item.advertisementName}</ListGroup.Item>} */
            <option value={props.item.advertisementId}>
              {props.item.advertisementTitle}
            </option>

    )
}

export default Option