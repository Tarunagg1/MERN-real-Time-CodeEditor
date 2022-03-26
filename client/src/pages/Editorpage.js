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
    const [clients, setclients] = useState([]);
    const codeRef = useRef(null);


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
                socketRef.current.emit(ACTIONS.SYNC_CODE,{code:codeRef.current,socketId})
            });

            // listning on disconnecting
            socketRef.current.on(ACTIONS.DISCONNECT, ({ socketId, username }) => {
                console.log('disconnect ui');
                toast.success(`${username} disconnected from the room.`);
                setclients((prev) => {
                    prev.filter((ele) => ele.socketId !== socketId)
                });
            })
        }
        init();

        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
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
                    <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => codeRef.current = code}/>
                </div>
            </div>
        </Fragment>
    )
}
