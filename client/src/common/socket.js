import { io } from 'socket.io-client';


export const initSocket = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transport: ['websocket']
    }
    return io('http://localhost:5000',options)
}


