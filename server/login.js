const express = require('express');
const Room = require('./model');

const router = express.Router();


router.post('/create', async (req, res) => {
    const { roomId, passcode } = req.body

    let room = await Room.findOne({ roomId })

    if (room !== null) return res.status(400).json({ message: "This room already exists", field: "roomId" })

    room = await Room.create({
        roomId,
        passcode,
        headcount: 1,
    })

    res.json({ message: "success" })

})

router.post('/join', async (req, res) => {
    const { roomId, passcode } = req.body

    const room = await Room.findOne({ roomId })

    if (room === null) return res.status(400).json({ message: "This room does not exist", field: "roomId" })
    if (room.headcount === 2) return res.status(400).json({ message: "This room is full", field: "roomId" })
    if (room.passcode !== passcode) return res.status(400).json({ message: "wrong passcode", field: "passcode" })

    room.headcount = 2

    await room.save()

    res.json({ message: "success" })

})


module.exports = router
