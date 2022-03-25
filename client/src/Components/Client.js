import React, { Fragment, useEffect, useRef } from 'react'
import Avatar from 'react-avatar';

export default function Client({ ele }) {

    return (
        <Fragment>
            <div className="client">
                <Avatar name={ele.username} size={50} round='40px' />
                <span className="userName">{ele.username}</span>
            </div>
        </Fragment>
    )
}
