import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteWorkout(props) {
  // set workout from props
  let workout = props.workoutData;

  // set state for editing workout
  const [open, setOpen] = useState(false);

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
    axios({
      method: "post",
      url: `/api/users/${props.userData}/workouts/${workout.id}/destroy`
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Workout destroyed!");
        }
      })
      .catch(error => {
        console.log(error);
      });
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Delete {workout.workoutType}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm delete if you're sure you want to remove this workout!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
