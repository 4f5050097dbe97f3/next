import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";

import useGlobalState from '../../store';
import styles from '../../styles/Game.module.css';
import Redirect from '../redirect';

import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';



export default function Game() {

    const [{ isLogged, roomId }, dispatch] = useGlobalState()

    const [chess, setChess] = useState('')
    const [game, setGame] = useState(null)
    const [status, setStatus] = useState(null)
    const [socket, setSocket] = useState(null)

    const ref = useRef()

    useEffect(() => {
        if (roomId === null) return

        const socket = io({ query: { roomId } })
        socket.on('connect', () => setSocket(socket))

        socket.on('headcount_1', (room) => {
            setGame(room.game)
            setStatus(room.status)
            setChess('O')
            ref.current = 'done'
        })

        socket.on('headcount_2', (room) => {
            setGame(room.game)
            setStatus(room.status)

            if (ref.current === 'done') return
            setChess('X')
        })

        socket.on('next', (room) => {
            setGame(room.game)
            setStatus(room.status)
        })

    }, [])


    const handleClick = (e, index) => {
        if (e.target.innerText !== '') return
        if (status[0] !== 'playing') return
        if (status[1] !== chess) return

        game[index] = chess

        socket.emit('move', { game, status })
    }

    if (isLogged === false) return <Redirect path="/" />
    if (game === null || status === null) return <Backdrop open={true} sx={{ color: '#fff', }} ><CircularProgress color='inherit' /></Backdrop>

    return (
        <React.Fragment>
            <div className={styles.game} >
                <div className={styles.tic}>
                    {
                        game.map((item, index) => (
                            <button key={index} onClick={e => handleClick(e, index)}>{item}</button>
                        ))
                    }
                </div>
                <Typography variant="h6" sx={{ my: 3, fontSize: { sm: '1.5rem' } }}>{getYourStatus(status, chess)}</Typography>
                {
                    status[0] === 'over'
                    &&
                    <Button
                        disabled={status[1] === 'disconnected'}
                        onClick={() => socket.emit('play again')}
                    >
                        play again
                    </Button>
                }
            </div>
        </React.Fragment>
    )
}

function getYourStatus(status, chess) {
    switch (status[0]) {
        case 'not started yet':
            return 'Waiting for your counterparty'
        case 'playing':
            if (status[1] === chess) return 'your turn'
            if (status[1] === 'disconnected') return "your counterparty disconnected"
            return "your counterparty's turn"
        case 'over':
            if (status[1] === chess) return 'you won'
            if (status[1] === 'disconnected') return "your counterparty disconnected"
            if (status[1] === 'draw') return 'draw'
            return "your counterparty won"
        default:
            return
    }
}


