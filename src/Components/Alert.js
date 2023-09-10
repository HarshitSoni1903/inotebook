import React from 'react'

const Alert = (props) => {
    return (
        <div>
            {props.alert&&<div className= {`alert text-capitalize alert-dismissible fade show alert-${props.alert.type}`} role="alert">
                <strong>{props.alert.type==="danger"?"Error":props.alert.type}  </strong>
                {props.alert.msg.toLowerCase()}
            </div>}
        </div>
    )
}

export default Alert