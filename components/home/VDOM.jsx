import React, { useState } from 'react';
import styles from '../../styles/Home.module.css'


import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';

export default function VDOM({ roomIdProps, passcodeProps, requests }) {

    const [value, setValue] = useState(0)

    return (
        <div className={styles.home}>
            <Box sx={{ width: '320px', border: '1px solid black', bgcolor: '#fff', flexShrink: 0 }} >
                <Tabs value={value} onChange={(e, value) => setValue(value)} variant="fullWidth">
                    <Tab label="CREATE" />
                    <Tab label="JOIN" />
                </Tabs>
                <Box sx={{ mx: 6, pb: 6 }} >
                    <Typography variant="h5" sx={{ mt: 3, textAlign: 'center' }} >
                        {
                            value === 0 ? "Create A Room " : "Join A Room"
                        }
                    </Typography>
                    <InputField marginTop={4} label="Enter Room ID" icon={<HomeIcon />} {...roomIdProps} />
                    <InputField marginTop={3} label="Enter Passcode" icon={<KeyIcon />} {...passcodeProps} />
                    <Button
                        sx={{ mt: 4 }}
                        fullWidth
                        variant="contained"
                        onClick={value === 0 ? requests.create : requests.join}
                    >
                        {
                            value === 0 ? "CREATE" : "JOIN"
                        }
                    </Button>
                </Box>
            </Box>
        </div >
    )
}

function InputField({ marginTop, label, icon, helperText, error, value, onChange }) {

    return (
        <Box sx={{ height: 71, mt: marginTop }}>
            <TextField
                fullWidth
                variant="standard"
                value={value}
                onChange={onChange}
                label={label}
                helperText={helperText}
                error={error}
                InputProps={{ startAdornment: <InputAdornment position="start" >{icon}</InputAdornment> }}
                inputProps={{ maxLength: '10', autoComplete: 'off' }}
            />
        </Box>
    )
}


