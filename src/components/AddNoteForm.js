import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  Grid,
  DialogActions,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "1rem 0",
  },
  dialogActions: {
    marginBottom: "1.5rem",
  },
}));

const AddNoteForm = ({ open, handleClose, noteTitle, noteDescription }) => {
  const classes = useStyles();

  const [title, setTitle] = useState(noteTitle || "");
  const [description, setDescription] = useState(noteDescription || "");

  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const handleClick = () => {
    const note = {
      id: uuidv4(),
      title,
      description,
    };

    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes));

    setTitle("");
    setDescription("");

    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            className={classes.textField}
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            className={classes.textField}
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                onClick={handleClick}
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

export default AddNoteForm;
