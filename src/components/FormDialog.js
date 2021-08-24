import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Fab,
  Button,
  TextField,
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  textField: {
    margin: "1rem 0",
  },
  dialogActions: {
    marginBottom: "1.5rem",
  },
}));

const FormDialog = ({ onSubmit }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(note.title, note.description);
    setNote({
      title: "",
      description: "",
    });
    setOpen(false);
  };

  return (
    <>
      <Fab
        color="secondary"
        className={classes.addButton}
        onClick={handleClickOpen}
      >
        <Add />
      </Fab>
      <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            variant="outlined"
            autoFocus
            fullWidth
            className={classes.textField}
            label="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <TextField
            variant="outlined"
            fullWidth
            className={classes.textField}
            multiline
            rows={4}
            label="Description"
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClose={handleClose}
                size="large"
                onClick={handleSubmit}
              >
                Save Note
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
