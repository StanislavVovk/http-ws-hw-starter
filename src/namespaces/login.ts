export default io => {
    io.on("connection", socket => {
        console.log(`${socket.username as string} connected`)
        })
    }