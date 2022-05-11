import React from 'react'
import { Typography, TextField, Stack, Button, Modal, Box,
        Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

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


const Home: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [errorText, setErrorText] = React.useState<string>('');

    // const [fileModalOpen, setFileModalOpen] = React.useState(false);


    const [data, setData] = React.useState<string[]>([]);
    const [text, setText] = React.useState<string>('');
    // const [description, setDescription] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const handleFileModalOpen = () => setFileModalOpen(true);
    // const handleFileModalClose = () => setFileModalOpen(false);

    const handleSave = () => {
        setData([ ...data, text ]); 
        handleClose();
      };

    const handleChangeText = (evt: any) => {
        const {value} = evt.target;
        if(!value){
            setErrorText('Required');
        }
        setText(evt.target.value)
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
                    // TODO validation
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



         <Button
            variant="outlined"
            // onClick={handleFileModalOpen}
            >
                Create New File
            </Button>

        </Stack>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Folder</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
               <TableRow>
              <TableCell>{row}</TableCell>
              <TableCell>Not Available</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
   
)
}

export default Home;