import React, { Fragment, useEffect, useRef, useState } from 'react'
import Client from '../Components/Client'
import Editor from '../Components/Editor'
import toast from 'react-hot-toast';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';
import { initSocket } from '../common/socket';
import ACTIONS from '../config/action';


export default function Editorpage() {
    const [clients, setclients] = useState([])


    const socketRef = useRef();
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { roomId } = useParams();


    const handleErrors = (e) => {
        console.log("socket error", e);
        toast.eror("Socket coonnection error try again")
        reactNavigator('/');
    }


    useEffect(() => {
        const init = async () => {
            socketRef.current = initSocket();

            socketRef.current.on('connect_error', err => handleErrors(err))
            socketRef.current.on('connect_failed', err => handleErrors(err))
            socketRef.current.on('disconnect', err => handleErrors(err))

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                userName: location.state?.userName
            });

            // listen for joined

            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state.userName) {
                    toast.success(`${username} joined the room.`);
                }
                setclients(clients);
            })
        }
        init();
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }


    function leaveRoom() {
        reactNavigator('/');
    }


    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <Fragment>
            <div className="mainWrapper">
                <div className="aside">
                    <div className="asideInner">
                        <div className="logo">
                            <img src="/code-sync.png" alt="logo" srcSet="" />
                        </div>
                        <h3>Connected</h3>
                        <div className="clientsLists">
                            {
                                clients.length > 0 && clients.map((ele, index) => (
                                    <Client ele={ele} key={index} />
                                ))
                            }
                        </div>
                    </div>
                    <button className="btn copybtn" onClick={copyRoomId}>Copy ROOM ID</button>
                    <button className="btn leavebtn" onClick={leaveRoom}>LEAVE</button>
                </div>
                <div className="editorWrappper">
                    <Editor />
                </div>
            </div>
        </Fragment>
    )
}
