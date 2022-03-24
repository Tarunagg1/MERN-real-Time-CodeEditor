import React, { Fragment, useState } from 'react'
import Client from '../Components/Client'
import Editor from '../Components/Editor'

export default function Editorpage() {
    const [clients, setclients] = useState([{
        socketId: "1",
        username: "tarun"
    }, {
        socketId: "2",
        username: "John doe"
    }, {
        socketId: "2",
        username: "John doe"
    }, {
        socketId: "2",
        username: "John doe"
    }])

    return (
        <Fragment>
            <div className="mainWrapper">
                <div className="aside">
                    <div className="asideInner">
                        <div className="logo">
                            <img src="/code-sync.png" alt="logo" srcset="" />
                        </div>
                        <h3>Connected</h3>
                        <div className="clientsLists">
                            {
                                clients.map((ele, index) => (
                                    <Client ele={ele} key={index} />
                                ))
                            }
                        </div>
                    </div>
                    <button className="btn copybtn">Copy ROOM ID</button>
                    <button className="btn leavebtn">LEAVE</button>
                </div>
                <div className="editorWrappper">
                    <Editor />
                </div>
            </div>
        </Fragment>
    )
}
