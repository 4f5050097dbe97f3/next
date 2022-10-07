import React, { useState } from 'react';

import useGlobalState from '../../store';
import Redirect from '../redirect';

import { create, join } from './logic';
import VDOM from './VDOM';


export default function Home() {

  const [state, dispatch] = useGlobalState()

  const [roomId, setRoomId] = useState({ value: '', error: false, helperText: ' ' })
  const [passcode, setPasscode] = useState({ value: '', error: false, helperText: ' ' })


  const roomIdProps = {
    ...roomId,
    onChange: (e) => setRoomId({ value: e.target.value, error: false, helperText: ' ' })
  }

  const passcodeProps = {
    ...passcode,
    onChange: (e) => setPasscode({ value: e.target.value, error: false, helperText: ' ' })
  }

  const requests = {
    create: create(roomId, setRoomId, passcode, setPasscode, state, dispatch),
    join: join(roomId, setRoomId, passcode, setPasscode, state, dispatch),
  }


  if (state.isLogged === true) return <Redirect path="/game" />

  return (
    <React.Fragment>
      <VDOM roomIdProps={roomIdProps} passcodeProps={passcodeProps} requests={requests} />
    </React.Fragment>
  )
}
