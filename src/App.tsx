import React from 'react'
import {
    Typography,
    TextField,
    Stack,
    Button,
} 
    from '@mui/material'


const App = () => {
    return (
        <div>
            <Typography style={{ textAlign:"center"}}> Hello mate!</Typography>
            <TextField id="outlined-basic" label="Search ..." variant="outlined" fullWidth />
            <br />
            <br />
            <br />
            <Stack spacing={2} direction="row">
                <Button variant="outlined">Create New Folder</Button>
                <Button variant="outlined">Create New File</Button>
            </Stack>
        </div>
    )
}

export default App;