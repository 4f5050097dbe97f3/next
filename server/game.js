const Room = require('./model');


async function handleConnect(socket) {
    const io = this
    const roomId = socket.handshake.query.roomId
    socket.join(roomId)

    let room = await Room.findOne({ roomId })

    if (room.headcount === 1) {
        room.game = ['', '', '', '', '', '', '', '', '',]
        room.status = ['not started yet', 'waiting for your counter party']
        await room.save()

        socket.emit('headcount_1', room)
    }

    if (room.headcount === 2) {
        room.status = ['playing', 'O']
        await room.save()

        io.in(roomId).emit('headcount_2', room)
    }

    socket.on('move', async ({ game, status }) => {
        room = await Room.findOne({ roomId })
        room.game = game
        const result = judge(game)
        if (result[0] === 'over') {
            room.status = result
            await room.save()

            io.in(roomId).emit('next', room)
        }
        if (result[0] === 'playing') {
            if (status[1] === 'O') room.status = ['playing', 'X']
            if (status[1] === 'X') room.status = ['playing', 'O']

            await room.save()

            io.in(roomId).emit('next', room)
        }
    })

    socket.on('play again', async () => {
        room = await Room.findOne({ roomId })
        room.game = ['', '', '', '', '', '', '', '', '',]
        room.status = ['playing', 'O']

        await room.save()
        io.in(roomId).emit('next', room)
    })

    socket.on('disconnect', async () => {
        room = await Room.findOne({ roomId })

        if (room === null) return
        room.roomId = `${room._id} - ${room.roomId} - over`
        room.headcount = 0
        room.status[1] = 'disconnected'

        await room.save()
        io.in(roomId).emit('next', room)
    })

}


function judge(game) {
    const [

        a, b, c,
        d, e, f,
        g, h, i

    ] = game

    const reg = /OOO|XXX/

    // horizontal
    if (reg.test(a + b + c)) return ['over', a]
    if (reg.test(d + e + f)) return ['over', d]
    if (reg.test(g + h + i)) return ['over', g]

    // vertical
    if (reg.test(a + d + g)) return ['over', a]
    if (reg.test(b + e + h)) return ['over', b]
    if (reg.test(c + f + i)) return ['over', c]

    // diagonal
    if (reg.test(a + e + i)) return ['over', a]
    if (reg.test(c + e + g)) return ['over', c]


    // draw
    if (game.join('').length === 9) return ['over', 'draw']

    // unsettled
    return ['playing', '']

}

module.exports = handleConnect
