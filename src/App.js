import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Fab, Container, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import AddNoteForm from "./components/AddNoteForm";
import NoteCard from "./components/NoteCard";

const useStyles = makeStyles((theme) => ({
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  addButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  noteCardContainer: {},
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setNotesData = () => {
    const notesData = JSON.parse(localStorage.getItem("notes"));

    if (notesData) {
      setNotes(notesData);
    }
  };

  useEffect(() => {
    setNotesData();
  }, []);

  return (
    <>
      <Fab
        color="secondary"
        className={classes.addButton}
        onClick={handleClickOpen}
      >
        <Add />
      </Fab>
      <AddNoteForm open={open} handleClose={handleClose} />
      {notes.length <= 0 ? (
        <Typography variant="h4" color="textSecondary" className={classes.text}>
          No Notes Available
        </Typography>
      ) : (
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {notes.map(({ title, description }, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <NoteCard title={title} description={description} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default App;
