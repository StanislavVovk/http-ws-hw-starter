import {Server} from 'socket.io';
import * as config from './config';
import game from "../namespaces/game";
import login from '../namespaces/login';

export default (io: Server) => {
    login(io.of("/login"))
    game(io.of("/game"))

    io.on("disconnect", socket => {
        const username = socket.handshake.query.username as string;
        console.log(username)
    })
};



