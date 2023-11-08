import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCar(props) {

const [car, setCar] = useState({brand: '', model: ''});
const [open, setOpen] = useState(false);

// functions
const handleClose = (event, reason) => {
    if (reason != 'backdropClick')
    setOpen(false);

}

const handleInputChange = (event) => {
    setCar ({...car, [event.target.name]: event.target.value});
}

const handleSave = () => {
    props.addCar(car);
    setOpen(false);
}


// return
    return (
        <>
        <Button
        onClick={() => setOpen(true)}>New car</Button>
        <Dialog
        open={open}
           onClose={handleClose} >
            <DialogTitle>New car</DialogTitle>
            <DialogContent>
                <TextField
                    label='Brand'
                    name='brand'
                    value={car.brand}
                    onChange={handleInputChange}
                >
                </TextField>
                <TextField
                    label='Model'
                    name='model'
                    value={car.model}
                    onChange={handleInputChange}
                >
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}