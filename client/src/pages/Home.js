import React, { Fragment, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const [roomId, serRoomId] = useState('');
    const [userName, setuserName] = useState('')

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        serRoomId(id);
        toast.success("New Room created successfully");
    }

    const joinnBtn = () => {
        if (!roomId || !userName) {
            toast.error("Please enter roomid and username");
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: {
                userName
            }
        })
    }


    const handelEnter = (e) => {
        if (e.code === 'Enter') {
            joinnBtn();
        }
    }

    return (
        <Fragment>
            <div className="homepageWrapper">
                <div className="formWrapper">
                    <img src="/code-sync.png" className="hoomepageLogo" alt="logo" srcSet="" />
                    <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                    <div className="inputGroup">
                        <input type="text" onKeyUp={handelEnter} value={roomId} onChange={(e) => serRoomId(e.target.value)} className="inputBox" placeholder="ROMM ID" />
                        <input type="text" onKeyUp={handelEnter} value={userName} onChange={(e) => setuserName(e.target.value)} className="inputBox" placeholder="Username" />
                        <button className="btn joinBtn" onClick={joinnBtn}>Join</button>

                        <div className="createInfo">
                            if you don't have a invite then create &nbsp;
                            <a href="" onClick={createNewRoom} className="createnewBtn">new room</a>
                        </div>
                    </div>
                </div>

                <footer>
                    <h4>Build By {' '} <a href="https://github.com/Tarunagg1/MERN-real-Time-CodeEditor">Tarun Aggarwal</a></h4>
                </footer>
            </div>
        </Fragment>
    )
}
