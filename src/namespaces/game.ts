import {Socket} from "socket.io";

const rooms_names = new Map<string, any>();

const ROOM_EXIST = "Room with this name exist"

export default io => {
    io.on("connection", (socket:Socket) => {
        socket.emit("SET_ROOMS", [...rooms_names]);
        console.log(socket.handshake.query.username)
        socket.on("ADD_ROOM", (data) => {
                if (rooms_names.has(data.room)) {
                    socket.emit("roomname exist", ROOM_EXIST)
                } else {
                    rooms_names.set(data.room, [])
                    io.emit("ADD_ROOM", {room: data.room})
                }
            }
        )
        socket.on("room join", (data) => {
            socket.join(data.room)
            rooms_names.get(data.room).push({username:data.user, status: false})
            io.emit("room join", {user: data.user, status: false})

        })
    })
}
