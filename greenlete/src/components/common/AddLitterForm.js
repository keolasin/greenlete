import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddLitterForm(props) {
  // set state for adding litter
  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);
  const [quantity, setQuantity] = useState(0);

  // handlers
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // submitting update
  function handleSubmit(event) {
    event.preventDefault();
    console.log(quantity, latitude, longitude);
    axios({
      method: "post",
      url: `/api/users/${props.userData}/litter/create`,
      data: {
        latitude: latitude,
        longitude: longitude,
        quantity: quantity
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Litter added!");
        }
      })
      .catch(error => {
        console.log(error);
      });
    setOpen(false);
  }
  console.log(props.latitude, props.longitude);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Litter
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Add litter at the location you pinned!
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Pieces of litter found"
              onChange={event => setQuantity(event.target.value)}
              value={quantity}
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
