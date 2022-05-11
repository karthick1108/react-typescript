import React from 'react'
import { Typography, TextField, Stack, Button, Modal, Box } from '@mui/material'
import Table from './Table'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };

const Home = () => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        // 
        handleClose();
    }

    const handleChangeText = (evt: any) => {
        setData(evt.target.value)
    }

return(
    <div>
        <Typography style={{ textAlign:"center"}}> Hello mate!</Typography>
        <TextField id="outlined-basic" label="Search ..." variant="outlined" fullWidth />
        <br />
        <br />
        <br />
        <Stack spacing={2} direction="row">
            <Button
            variant="outlined"
            onClick={handleOpen}
            >
                Create New Folder
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                   New Folder
                </Typography>
                <br/>
                <TextField 
                    size="small"
                    label="Folder Name"
                    variant="outlined" 
                    onChange={handleChangeText}
                />
                <br />
                <br />
                <Button
                    variant="contained"
                    onClick={handleSave}
                 >
               Save
                </Button>
            </Box>
        </Modal>
        </Stack>
        {/* <Table data={data}/> */}
    </div>
   
)
}

export default Home;