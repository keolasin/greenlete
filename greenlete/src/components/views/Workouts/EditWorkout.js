import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EditWorkout(props) {
  // set workout from props
  let workout = props.workoutData;

  // set state for editing workout
  const [open, setOpen] = useState(false);
  const [workoutType, setWorkoutType] = useState(workout.workoutType);
  const [distance, setDistance] = useState(workout.distance);
  const [duration, setDuration] = useState(workout.duration);
  const [litterCount, setLitterCount] = useState(workout.litterCount);

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
      url: `/api/users/${props.userData}/workouts/${workout.id}/update`,
      data: {
        distance: distance,
        duration: duration,
        litterCount: litterCount,
        workoutType: workoutType
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Workout updated!");
        }
      })
      .catch(error => {
        console.log(error);
      });
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Edit {workout.workoutType} on {workout.createdAt}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Need to update your workout? Make your changes below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              className="text-field"
              id="name"
              label="Activity"
              onChange={event => setWorkoutType(event.target.value)}
              value={workoutType}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Distance"
              type="number"
              onChange={event => setDistance(event.target.value)}
              value={distance}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Duration"
              onChange={event => setDuration(event.target.value)}
              value={duration}
              type="number"
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Litter"
              onChange={event => setLitterCount(event.target.value)}
              value={litterCount}
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
