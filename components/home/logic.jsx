import axios from 'axios';


/*

roomId: {value: String, error: 'Boolean', helperText: String}
setRoomId: React set state method

*/

const create = (roomId, setRoomId, passcode, setPasscode, state, dispatch) => {

    return async () => {
        if (validator(roomId, setRoomId, passcode, setPasscode) !== true) return

        try {
            const { data } = await axios.post('/login/create', {
                roomId: roomId.value,
                passcode: passcode.value
            })

            if (data.message === 'success') dispatch({ type: 'log', payload: roomId.value })

        } catch (e) {
            if (e.response) {
                const { data } = e.response
                switch (data.field) {
                    case 'roomId':
                        setRoomId(prev => ({ ...prev, error: true, helperText: data.message }))
                        return
                    case 'passcode':
                        setPasscode(prev => ({ ...prev, error: true, helperText: data.message }))
                        return
                    default:
                        return
                }
            }

            setRoomId(prev => ({ ...prev, error: true, helperText: 'something went wrong' }))

            return console.error(e)

        }
    }
}

const join = (roomId, setRoomId, passcode, setPasscode, state, dispatch) => {

    return async () => {
        if (validator(roomId, setRoomId, passcode, setPasscode) !== true) return

        try {
            const { data } = await axios.post('/login/join', {
                roomId: roomId.value,
                passcode: passcode.value
            })

            if (data.message === 'success') dispatch({ type: 'log', payload: roomId.value })

        } catch (e) {
            if (e.response) {
                const { data } = e.response
                switch (data.field) {
                    case 'roomId':
                        setRoomId(prev => ({ ...prev, error: true, helperText: data.message }))
                        return
                    case 'passcode':
                        setPasscode(prev => ({ ...prev, error: true, helperText: data.message }))
                        return
                    default:
                        return
                }
            }

            setRoomId(prev => ({ ...prev, error: true, helperText: 'something went wrong' }))

            return console.error(e)

        }
    }
}

const validator = (roomId, setRoomId, passcode, setPasscode) => {
    if (roomId.value === '') {
        setRoomId({ value: '', error: true, helperText: 'Room ID is empty' })
        return
    }
    if (passcode.value === '') {
        setPasscode({ value: '', error: true, helperText: 'Passcode is empty' })
        return
    }

    return true
}

export { create, join }

