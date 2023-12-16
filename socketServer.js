let users = []

function SocketServer(socket){
    socket.on('joinUser', user => {
        users.push({id: user._id, socketId: socket.id});
    })

    socket.on('disconnect', () => {
        users = users.filter(user => (user.socketId !== socket.id))
        console.log({users})
    })

    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id) )
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id) )
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })

    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id) )
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('updateComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id) )
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('updateCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id) )
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })

    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)

    })

    socket.on('unFollow', newUser => {
        const user = users.find(user => user.id === newUser._id);
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })

    //THÔNG BÁO
    socket.on('createNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id));
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg);
    })

    socket.on('removeNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id));
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
    })

    socket.on('addMessage', (msg) => {
        const user = users.find(user => user.id === msg.recipient);
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
        // console.log(user)
    })
}

module.exports = SocketServer