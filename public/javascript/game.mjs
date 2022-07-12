import {showInputModal, showMessageModal} from "./views/modal.mjs";
import {appendRoomElement} from "./views/room.mjs";
import {appendUserElement} from "./views/user.mjs";

const username = sessionStorage.getItem('username');

if (!username) {
    window.location.replace('/login');
}

const socket = io('/game', {query: {username}});


const room = document.querySelector("#add-room-btn")
room.addEventListener("click", () => {
    showInputModal({title: "Input room name", onSubmit: check_room_name})
})


function check_room_name() {
    const room_name = document.querySelector(".modal-input").value;
    socket.emit("ADD_ROOM", {room: room_name})

}

socket.on("ADD_ROOM", (data) => {
    appendRoomElement({name: data.room, numberOfUsers: 0})
})

socket.on("SET_ROOMS", (rooms_names) => {
    if (rooms_names) {
        rooms_names.forEach((room) => {
            appendRoomElement({name: room[0], numberOfUsers: 0})
        })
    }
})

const rooms_wrapper = document.querySelector("#rooms-wrapper")
rooms_wrapper.addEventListener("click", (e) => {
    if (e.target.className === "join-btn") {
        const room_name = e.target.getAttribute("data-room-name")
        const page = document.querySelector("#game-page")
        const rooms_page = document.querySelector("#rooms-page")
        rooms_page.classList.add("display-none")
        page.classList.remove("display-none")
        socket.emit("room join", {user: username, room: room_name})
    }
})
socket.on("roomname exist", (data) => {
    showMessageModal({message: data})
})

socket.on("room join", (data) => {
    appendUserElement({username: data.user, ready: data.status})
    console.log(data)
})
socket.on("update users", (data) => {
    appendUserElement({username: data.user, ready: data.status})
})